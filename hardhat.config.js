require("@nomicfoundation/hardhat-toolbox");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");
require("dotenv").config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    goerli: {
      url: `https://arb-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
    etherscan: {
      apiKey: {
        goerli: ETHERSCAN_API_KEY,
      },
      customChains: [
        {
          network: "goerli",
          chainId: 421613,
          urls: {
            apiURL: "https://api.arbiscan.io/api",
            browserURL: "https://goerli.arbiscan.io/",
          },
        },
      ],
      url: "https://goerli.arbiscan.io/", // Hack -- why required?
    },
    hardhat: {
      chainId: 1337, // We set 1337 to make interacting with MetaMask simpler
      allowUnlimitedContractSize: true,
      blockGasLimit: 0x1fffffffffffff,
      gas: 12000000,
    },
  },
};
