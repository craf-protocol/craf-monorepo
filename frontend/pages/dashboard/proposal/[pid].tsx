import { useMemo } from "react";
import { useRouter } from "next/router";
import { useContractRead } from "wagmi";
import { SideNavigationLayout } from "../../../components/SideNavigationLayout";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import contracts from "../../../utils/contracts/contract-address.json";
import governor from "../../../utils/contracts/CRAFGovernor.json";

const govContract = {
  address: contracts.governance,
  abi: governor.abi,
};

function approve(e: any) {
  e.preventDefault();
  console.log("Approve");
}

function abstain(e: any) {
  e.preventDefault();
  console.log("Abstain");
}

function reject(e: any) {
  e.preventDefault();
  console.log("Reject");
}

function ButtonRow() {
  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
      <button
        onClick={approve}
        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        Approve
      </button>
      <button
        onClick={abstain}
        className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        Abstain
      </button>
      <button
        onClick={reject}
        className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        Reject
      </button>
    </span>
  );
}

const Proposal = () => {
  const {
    query: { pid },
  } = useRouter();

  const config = useMemo(
    () => ({
      ...govContract,
      functionName: "getDescription",
      args: [Number(pid)],
    }),
    [pid]
  );

  const {
    data: proposalDescription,
    isSuccess,
    error,
  } = useContractRead(config);
  const proposal = proposalDescription ? JSON.parse(proposalDescription) : null;

  return (
    <SideNavigationLayout>
      <main className="flex-1">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              {isSuccess && !!proposal && (
                <>
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      {proposal.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      {govContract.address}
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Description
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {proposal.description}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Amount
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {proposal.amount}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Proposed on
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {new Date().toDateString()}
                          {/* {proposal.deployedDate} */}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Recipient
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {proposal.recipient}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          URL
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <a
                            href={proposal.url}
                            target="_blank"
                            rel="noreferrer"
                            className="no-underline hover:underline"
                          >
                            {proposal.url}
                          </a>
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <p className="py-4 text-lg font-medium leading-6 text-gray-900">
                          Vote for this proposal
                        </p>
                        <ButtonRow />
                      </div>
                    </dl>
                  </div>
                </>
              )}

              {!!error && <div>{JSON.stringify(error)}</div>}
            </div>
          </div>
        </div>
      </main>
    </SideNavigationLayout>
  );
};

export default Proposal;
