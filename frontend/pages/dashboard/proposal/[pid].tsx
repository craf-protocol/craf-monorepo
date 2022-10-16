import { SideNavigationLayout } from "../../../components/SideNavigationLayout";
import { PaperClipIcon } from '@heroicons/react/20/solid'

const proposal = {
    contractAddress: "0x6FC94ba120E9AFeA1cC369f13721e995860cDf99",
    deployedDate: '2020-01-07',
    title: 'BattleFly v1',
    description: 'The BattleFly Founders NFTs represent ownership of the BattleFly Game.',
    amount: '8000',
    recipient: '0x3863e428E7Cb0C28623fEcE9Ff0e16b74e96E13d',
    imageUrl: 'https://trove.treasure.lol/images/fetch/f_auto,c_limit,w_828,q_auto/https://djmahssgw62sw.cloudfront.net/0/Thumbnail-BF-Founder1.jpg',
    URL: 'https://trove.treasure.lol/collection/battlefly-v1-founders-nft',
}

function InfoCard() {
    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">{proposal.title}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{proposal.contractAddress}</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Description</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {proposal.description}
                        </dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Amount</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{proposal.amount}</dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Deployed on</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{proposal.deployedDate}</dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Recipient</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{proposal.recipient}</dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">URL</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <a href={proposal.URL} target="_blank" className="no-underline hover:underline">{proposal.URL}</a>

                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

const Leaderboard = () => {
    return (
        <SideNavigationLayout>
            <main className="flex-1">
                <div className="py-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                        <InfoCard />
                    </div>
                </div>
            </main>
        </SideNavigationLayout>
    );
};

export default Leaderboard;
