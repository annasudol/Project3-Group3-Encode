import { ethers } from "hardhat";

async function main() {
  const Vote = await ethers.getContractFactory("Vote");
  const contract = await Vote.deploy();
  await contract.deployed();
  console.log(`Vote with 1 deployed to ${contract.address}`);

  const [a0, a1] = await ethers.getSigners();
  const tx_mint_0 = await contract.mint(a0.address, 1000);
  tx_mint_0.wait();
  let vote_power_a0 = await contract.getVotes(a0.address);
  console.log(`Voting power of account ${a0.address} is ${vote_power_a0}`);
  const tx_delegate_0 = await contract.delegate(a1.address);
  tx_delegate_0.wait();
  vote_power_a0 = await contract.getVotes(a0.address);
  let vote_power_a1 = await contract.getVotes(a1.address);
  console.log(`Voting power of account after delegate ${a0.address} is ${vote_power_a0}, ${a1.address} is ${vote_power_a1}`);

  // const tx_mint_1 = await contract.mint(a0.address, 100);
  // tx_mint_1.wait();

  // const tx_delegate_1 = await contract.delegate(a0.address);
  // tx_delegate_1.wait();
  // vote_power_a0 = await contract.getVotes(a0.address);
  // console.log(`Voting power of account after delegate ${a0.address} is ${vote_power_a0}`);

  // const tx_mint_2 = await contract.mint(a0.address, 100);
  // tx_mint_2.wait();
  // const tx_delegate_2 = await contract.delegate(a1.address);
  // tx_delegate_2.wait();
  // vote_power_a1 = await contract.getVotes(a1.address);
  // console.log(`Voting power of account after delegate ${a1.address} is ${vote_power_a1}`);

  // const tx_mint_3 = await contract.mint(a0.address, 100);
  // tx_mint_3.wait();
  // const tx_delegate_3 = await contract.delegate(a0.address);
  // tx_delegate_3.wait();
  // vote_power_a0 = await contract.getVotes(a0.address);
  // console.log(`Voting power of account after delegate ${a0.address} is ${vote_power_a0}`);

  const latestBlock = await ethers.provider.getBlock("latest")
  console.log(`Latest block number is ${latestBlock.number}`);
};
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
