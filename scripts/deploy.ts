import { ethers } from "hardhat";

async function main() {
  const Vote = await ethers.getContractFactory("Vote");
  const contract = await Vote.deploy();
  await contract.deployed();
  console.log(`Vote with 1 deployed to ${contract.address}`);
};
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
