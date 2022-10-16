import contracts from "../utils/contracts/contract-address.json"
import treasury from "../utils/contracts/CRAFTreasury.json"
import token from '../utils/contracts/Token.json'
import {useState} from "react";
import {BigNumber, utils} from "ethers";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useWaitForTransaction
} from "wagmi";
import toast, { Toaster } from 'react-hot-toast';

function Funding() {
  const { address } = useAccount()
  const [amount, setAmount] = useState('')

  const increaseAllowanceWrite = useContractWrite({
    mode: "recklesslyUnprepared",
    address: contracts.token,
    abi: token.abi,
    functionName: "increaseAllowance",
    args: [address, amount],
  })

  const fundWrite = useContractWrite({
    mode: "recklesslyUnprepared",
    address: contracts.treasury,
    abi: treasury.abi,
    functionName: "fundTreasury",
    args: [contracts.token, amount],
  });

  const increaseAllowanceWait = useWaitForTransaction({
    hash: increaseAllowanceWrite.data?.hash,
    async onSuccess(data) {
      try {
        if (fundWrite.writeAsync) {
          const running = toast.loading("Funding contract")
          await fundWrite.writeAsync()
          toast.dismiss(running)
        }
      } catch {
        toast.dismiss()
        toast.error("Transaction Failed")
      }
    },
  });

  const fundingWait = useWaitForTransaction({
    hash: fundWrite.data?.hash,
    onSuccess(data) {
      toast.success("Account was funded successfully")
    }
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      if (increaseAllowanceWrite.writeAsync) {
        const running = toast.loading("Increasing Allowance")
        await increaseAllowanceWrite.writeAsync()
        toast.dismiss(running);
      }
    } catch {
      toast.dismiss()
      toast.error("Transaction Failed")
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Send funds to CRAF</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                      type="number"
                      name="amount"
                      id="amount"
                      step=".0001"
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full rounded-md border-gray-300 pl-2 pr-16 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="currency" className="sr-only">
                      Currency
                    </label>
                    <select
                        id="currency"
                        name="currency"
                        className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>ARB</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <button
                    onClick={handleSubmit}
                    disabled={!amount}
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {(increaseAllowanceWait.isLoading || fundingWait.isLoading) ? "...Submitting" : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default Funding;
