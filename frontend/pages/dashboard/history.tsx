import { SideNavigationLayout } from "../../components/SideNavigationLayout";
import {ProposalListItem} from "../../components/ProposalListItem";

const proposals = [
    {
        contractAddress: "0x6FC94ba120E9AFeA1cC369f13721e995860cDf99",
        deployedDate: '2020-01-07',
        title: 'BattleFly v1',
        description: 'The BattleFly Founders NFTs represent ownership of the BattleFly Game.',
        amount: '8000',
        recipient: '0x3863e428E7Cb0C28623fEcE9Ff0e16b74e96E13d',
        imageUrl: 'https://trove.treasure.lol/images/fetch/f_auto,c_limit,w_828,q_auto/https://djmahssgw62sw.cloudfront.net/0/Thumbnail-BF-Founder1.jpg',
        URL: 'https://trove.treasure.lol/collection/battlefly-v1-founders-nft',
    },
    {
        contractAddress: "0x83aAc1CE9979F85C899C83FB76fb0e94CF0AcEb5",
        deployedDate: '2020-01-07',
        title: 'Realm - Monuments',
        description: 'The Ancients left behind their legacy through Ancient Ruins and Artifacts. The Particle that floats in the air reminds us of their great work.\n' +
            '\n' +
            'Through Monuments, you honor that legacy and tune into their Ancient ways. As you build these Monuments, your land will gain Inheritance. It will uncover the spirit and essence of what they left behind.\n' +
            '\n' +
            'Monument is the main way to increase your Realm\'s Inheritance.',
        amount: '15000',
        recipient: '0x3863e428E7Cb0C28623fEcE9Ff0e16b74e96E13d',
        imageUrl: 'https://trove.treasure.lol/images/fetch/f_auto,c_limit,w_828,q_auto/https://djmahssgw62sw.cloudfront.net/0/RealmMonuments.jpg',
        URL: 'https://trove.treasure.lol/collection/realm-monuments',
    },
    {
        contractAddress: "0x4A87dbdE7481091135442518fFa81676ab806790",
        deployedDate: '2020-01-07',
        title: 'Smol Brains',
        description: 'The Smol Brains are a dynamic PFP of a monkey whose head gets bigger the larger its IQ becomes.',
        amount: '10000',
        recipient: '0x3863e428E7Cb0C28623fEcE9Ff0e16b74e96E13d',
        imageUrl: 'https://trove.treasure.lol/images/fetch/f_auto,c_limit,w_828,q_auto/https://djmahssgw62sw.cloudfront.net/0/SmolBrains.png',
        URL: 'https://trove.treasure.lol/collection/smol-brains',
    },
]

function HistoryList() {
    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {proposals.map((proposal) => (
                    <ProposalListItem
                        key={proposal.contractAddress}
                        contractAddress={proposal.contractAddress}
                        title={proposal.title}
                        description={proposal.description}
                        amount={proposal.amount}
                        recipient={proposal.recipient}
                        imageUrl={proposal.imageUrl}
                        URL={proposal.URL}
                        deployedDate={proposal.deployedDate} />
                ))}
            </ul>
        </div>
    )
}

const History = () => {
  return (
    <SideNavigationLayout>
        <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">History</h1>
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <HistoryList />
            </div>
        </div>
    </SideNavigationLayout>
  );
};

export default History;
