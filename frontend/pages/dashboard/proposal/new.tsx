import { SideNavigationLayout } from "../../../components/SideNavigationLayout";
import contracts from "../../../utils/contracts/contract-address.json";
import governor from "../../../utils/contracts/CRAFGovernor.json";
import treasury from "../../../utils/contracts/CRAFTreasury.json";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { useState } from "react";
import { ethers } from "ethers";

function NewProposalForm() {
  const [args, setArgs] = useState<any[]>();

  const { data, write } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: contracts.governance,
    abi: governor.abi,
    functionName: "propose",
    args: args,
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  function createNewProposal(e: any) {
    e.preventDefault();

    const payload = {
      title: e.target.title.value,
      description: e.target.description.value,
      url: e.target.url.value,
      recipient: e.target.recipient.value,
      amount: e.target.amount.value,
      imageUrl: e.target.imageUrl.value,
    };

    // Construct calldata for the proposal
    const iTreasury = new ethers.utils.Interface(treasury.abi);
    const calldata = iTreasury.encodeFunctionData("transferToken", [
      contracts.token, // NOTE: Assuming same governance token + treasury token
      e.target.recipient.value,
      e.target.amount.value,
    ]);

    // Construct arguments being sent to governance propose fn
    const args = [
      [contracts.treasury], // targets
      [Number(e.target.amount.value)], // values
      [calldata], // calldatas
      JSON.stringify(payload), // description
    ];

    setArgs(args);
    if (write) {
      write();
    }
  }

  return (
    <form className="space-y-6" onSubmit={createNewProposal}>
      <div className="bg-white px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              New Proposal
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
          <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                  defaultValue={""}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Brief description for your profile. URLs are hyperlinked.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-gray-700"
                >
                  URL
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="url"
                    id="url"
                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="www.example.com"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image URL
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="www.image.com"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="recipient"
                className="block text-sm font-medium text-gray-700"
              >
                Recipient
              </label>
              <input
                type="text"
                name="recipient"
                id="recipient"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="0x1337"
              />
            </div>
            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="420.69"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={isLoading}
        >
          {isLoading ? `...Submitting...` : "Submit"}
        </button>
      </div>
    </form>
  );
}

const Leaderboard = () => {
  return (
    <SideNavigationLayout>
      <main className="overflow-y-scroll flex-1">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <NewProposalForm />
          </div>
        </div>
      </main>
    </SideNavigationLayout>
  );
};

export default Leaderboard;
