import contracts from "../utils/contracts/contract-address.json"
import abi from "../utils/contracts/CRAFGovernor.json"


function Funding() {

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log('You clicked submit.');
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
                        <option>AET</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                      onClick={handleSubmit}
                      className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default Funding;
