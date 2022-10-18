# CRAF Monorepo

CRAF is a dapp that facilitates continuous retroactive public goods funding for projects.for your Ethereum project. Donate to the treasury, submit a proposal, and vote on which proposals you think deserve funding
for the impact they’ve made on the specific ecosystem.

## Governance

CRAF leverages the OpenZeppelin Governance framework to conduct the proposing, voting and execution of retroactive funding. On-chain governance is pivotal to conduct a fair and trusty retroactive funding process. By using OpenZeppelin Governance, assuming a proposals succeeds and meets quorum, the execution is atomically done such that the funds transfer without the intervention of a centralized authority.

### What is the OZ Governor Framework?

As stated by their [docs](https://docs.openzeppelin.com/contracts/4.x/governance) —

> This governance protocol is generally implemented in a special-purpose contract called “Governor”. The GovernorAlpha and GovernorBravo contracts designed by Compound have been very successful and popular so far, with the downside that projects with different requirements have had to fork the code to customize it for their needs, which can pose a high risk of introducing security issues.

ADD OZ GOV DIAGRAM IMAGE HERE!

For interactive contract wizard go here — https://wizard.openzeppelin.com/#governor

Some notable DAOs that are current using OZ Governor are ENS, Euler Finance, FEI (RIP), Silo Finance and many more.

## Treasury

Funds for retroactive funding reside inside a Treasury contract to ensure that they are not to be tampered with. The Treasury contract is constructed such that only through Governance proposals can funds be accessed.

_Note: right now the Treasury only supports ERC20 tokens but can ben extended for native ETH or even ERC721 tokens._

In order to fund the treasury and receive an NFT, the funder must approve the transfer and call the `fundTreasury()` function. This is abstracted away and a feature in the current UI implementation.

## Try CRAF for Yourself!

1. Deploy a Governance token (optional)
   i. Can use an existing token if one already exists. Token is required for on-chain governance.
2. Deploy an instance of the CRAF Governance contract with the above token assigned as the voting token (constructor)
3. Deploy an instance of the CRAF Treasury contract with the above GOvernance contract assigned as the owner (constructor)
4. Fund the CRAF Treasury so that public goods can be retroactively funded
5. Sit back and let the community propose, vote and execute retroactive funding of public goods!
