import { ethers } from "hardhat";

async function main() {
    const TokenizedBallot = await ethers.getContractFactory("TokenizedBallot");
    const contract = await TokenizedBallot.deploy(['0x7465737432000000000000000000000000000000000000000000000000000000'], '0x5D2207Ef9DaAE1ad7781D4F126f7F8BE29A9bBd5', 10);
    await contract.deployed();
    console.log(`TokenizedBallot with 1 deployed to ${contract.address}`);
    const [account0, account1] = await ethers.getSigners();

    // const vp = await contract.vote(1, 1);
    console.log(contract)
};
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
