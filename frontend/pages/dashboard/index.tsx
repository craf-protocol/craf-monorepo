import { useMemo } from "react";
import { SideNavigationLayout } from "../../components/SideNavigationLayout";
import Link from "next/link";
import { ProposalListItem } from "../../components/ProposalListItem";
import { useContractRead, useContractReads } from "wagmi";
import contracts from "../../utils/contracts/contract-address.json";
import governor from "../../utils/contracts/CRAFGovernor.json";

const govContract = {
  address: contracts.governance,
  abi: governor.abi,
};

const Dashboard = () => {
  const {
    data: proposalCountBigNum,
    isLoading: isProposalCountLoading,
    error: proposalCountError,
    isSuccess: isProposalCountSuccess,
  } = useContractRead({
    ...govContract,
    functionName: "numberOfProposals",
  });
  const proposalCount = proposalCountBigNum?.toNumber() ?? 0;

  const proposalDescriptionFnCalls = useMemo(() => {
    const proposalDescriptionFnCalls = [];
    for (let i = 0; i < proposalCount; i++) {
      proposalDescriptionFnCalls.push({
        ...govContract,
        functionName: "getDescription",
        args: [i],
      });
    }
    return proposalDescriptionFnCalls;
  }, [proposalCount]);

  const {
    data: proposalDescriptionsJSONs,
    isLoading: isProposalDescriptionsLoading,
    error: proposalDescriptionsError,
  } = useContractReads({
    contracts: proposalDescriptionFnCalls,
  });
  const proposalDescriptionCount = proposalDescriptionsJSONs?.length ?? 0;

  return (
    <SideNavigationLayout>
      <main className="flex-1">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 md:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                Proposals
              </h1>
              {isProposalCountSuccess && (
                <span className="pl-3">({proposalCount})</span>
              )}
            </div>
            <Link key="new-proposal" href="/dashboard/proposal/new">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create New Proposal
              </button>
            </Link>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="overflow-hidden bg-white shadow sm:rounded-md">
              {proposalDescriptionCount > 0 ? (
                <ul role="list" className="divide-y divide-gray-200">
                  {proposalDescriptionsJSONs.map((p, i) => {
                    const proposal = JSON.parse(p);
                    return (
                      <ProposalListItem
                        key={proposal.contractAddress}
                        index={i}
                        title={proposal.title}
                        description={proposal.description}
                        amount={proposal.amount}
                        recipient={proposal.recipient}
                        imageUrl={proposal.imageUrl}
                        URL={proposal.URL}
                        deployedDate={proposal.deployedDate}
                      />
                    );
                  })}
                </ul>
              ) : (
                <div>No Proposals</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </SideNavigationLayout>
  );
};

export default Dashboard;
