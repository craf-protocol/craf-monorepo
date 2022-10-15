import { SideNavigationLayout } from "../../components/SideNavigationLayout";

const people = [
    { address: '0x3863e428E7Cb0C28623fEcE9Ff0e16b74e96E13d', amount: '259138' },
    { address: '0x29d7d1dd5b6f9c864d9db560d72a247c178ae86b', amount: '139138' },
    { address: '0x6FC94ba120E9AFeA1cC369f13721e995860cDf99', amount: '74837' },
    { address: '0x18c12F28050316cC3d79F58F152eB61BCC151D5d', amount: '37134' },
    { address: '0x74031c82790945AB18413cBaB7a61d562c1e9ca9', amount: '9313' },
    { address: '0x83aAc1CE9979F85C899C83FB76fb0e94CF0AcEb5', amount: '4138' },
    { address: '0x712234F9aEaEAE2fB3E91A2DAbeDfFedaaeBD4a7', amount: '1391' },
    { address: '0x4A87dbdE7481091135442518fFa81676ab806790', amount: '464' },
]

function LeaderboardList() {
    return (
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Wallet Address
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Amount
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {people.map((person) => (
                                    <tr key={person.address}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {person.address}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {person.amount}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
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
                    <h1 className="text-2xl font-semibold text-gray-900">Leaderboard</h1>
                </div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                    <LeaderboardList />
                </div>
            </div>
        </main>
    </SideNavigationLayout>
  );
};

export default Leaderboard;
