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

  const CRAFGovernance = await ethers.getContractFactory("CRAFGovernor");
  const tokenAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
  const gov = await CRAFGovernance.deploy(tokenAddress);
  await gov.deployed();

  console.log("Governance address:", gov.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(gov);
}

function saveFrontendFiles(gov) {
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
        { ...JSON.parse(contractAddress), governance: gov.address },
        undefined,
        2
      )
    );
  } else {
    fs.writeFileSync(
      path.join(contractsDir, "contract-address.json"),
      JSON.stringify({ governance: gov.address }, undefined, 2)
    );
  }

  const CRAFGovernorArtifact = artifacts.readArtifactSync("CRAFGovernor");

  fs.writeFileSync(
    path.join(contractsDir, "CRAFGovernor.json"),
    JSON.stringify(CRAFGovernorArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
