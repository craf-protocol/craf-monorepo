
function Footer() {
  return (
      <footer className="bg-gray-900" aria-labelledby="footer-heading">
        <div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
              &copy; 2022 CRAF, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  )
}

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      <main>
        <div className="bg-gray-900 pt-10 sm:pt-16 lg:overflow-hidden lg:pt-8 lg:pb-14">
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
                <div className="lg:py-24">
                  <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                    <span className="block">A better way to</span>
                    <span className="block text-indigo-400">fund public goods</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    CRAF is a dapp that facilitates continuous retroactive public goods funding for projects.
                  </p>
                  <div className="mt-10 sm:mt-12">
                    <form action="#" className="sm:mx-auto sm:max-w-xl lg:mx-0">
                      <p className="mt-3 text-sm text-gray-300 sm:mt-4">
                        Donate to the treasury, submit a proposal, and vote on which proposals YOU think deserve funding
                        for the impact they’ve made on the Arbitrum Ecosystem.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-12 -mb-16 sm:-mb-48 lg:relative lg:m-0">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                  {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                  <img
                    className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                    src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More main page content here... */}
      </main>
      <Footer />
    </div>
  );
}
