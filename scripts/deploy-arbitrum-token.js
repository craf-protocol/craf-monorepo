// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const ArbitrumToken = await ethers.getContractFactory("ArbitrumToken");
  const token = await ArbitrumToken.deploy("10000000000000000000000");
  await token.deployed();

  console.log("Token address:", token.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(token);
}

function saveFrontendFiles(token) {
  const fs = require("fs");
  const contractsDir = path.join(
    __dirname,
    "..",
    "frontend",
    "utils",
    "contracts"
  );

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  const contractAddressFilepath = path.join(
    contractsDir,
    "contract-address.json"
  );
  if (fs.existsSync(contractAddressFilepath)) {
    const contractAddress = fs.readFileSync(contractAddressFilepath);
    fs.writeFileSync(
      contractAddressFilepath,
      JSON.stringify(
        { ...JSON.parse(contractAddress), token: token.address },
        undefined,
        2
      )
    );
  } else {
    fs.writeFileSync(
      path.join(contractsDir, "contract-address.json"),
      JSON.stringify({ token: token.address }, undefined, 2)
    );
  }

  const ArbitrumTokenArtifact = artifacts.readArtifactSync("ArbitrumToken");

  fs.writeFileSync(
    path.join(contractsDir, "Token.json"),
    JSON.stringify(ArbitrumTokenArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
