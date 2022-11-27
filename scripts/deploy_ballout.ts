import { ethers } from "hardhat";

import * as dotenv from "dotenv";
dotenv.config();
const VOTE_CONTRACT = '0x6E3Ec7bD445F25Bf7Da411BAdd4Dac56A4E4Eaaf';
const lastBlockNumber = 8030034;
async function main() {
    const proposals = ['voting 1', 'voting 2', 'voting 3'];

    const TokenizedBallot = await ethers.getContractFactory("Ballot");
    const ballotContract = await TokenizedBallot.deploy(proposals.map(prop => ethers.utils.formatBytes32String(prop)), VOTE_CONTRACT, lastBlockNumber);

    console.log("Deploying TokenizedBallot contract");
    await ballotContract.deployed();
    console.log(
        `The TokenizedBallot contract was deployed at the address ${ballotContract.address}`
    );
    const [a0, a1, a2] = await ethers.getSigners();
    //vote proposal 1
    const v_0 = await ballotContract.vote(1, 2);
    v_0.wait();


    const v_2 = await ballotContract.connect(a1).vote(2, 1);
    v_2.wait();

    const winner = await ballotContract.winnerName();
    console.log(
        `The winner is ${winner}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});