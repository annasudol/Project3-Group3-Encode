import { ethers } from "hardhat";

import * as dotenv from "dotenv";
dotenv.config();
const VOTE_CONTRACT = process.env.VOTE_CONTRACT || '';
const lastBlockNumber = 8019583;
async function main() {
    const proposals = ['voting 1', 'voting 2', 'voting 3'];

    console.log("Deploying TokenizedBallot contract");
    const TokenizedBallot = await ethers.getContractFactory("TokenizedBallot");
    const ballotContract = await TokenizedBallot.deploy();

    console.log("Deploying TokenizedBallot contract");
    await ballotContract.deployed();
    console.log(
        `The TokenizedBallot contract was deployed at the address ${ballotContract.address}`
    );
    // const [a0, a1, a2] = await ethers.getSigners();
    // //vote proposal 1
    // const v_0 = await ballotContract.vote(1, 1);
    // v_0.wait();
    // //vote proposal 1
    // const v_1 = await ballotContract.connect(a1).vote(1, 1);
    // v_1.wait();

    // //give voting power
    // const gvp = await ballotContract.giveVotingPower(a2.address);
    // gvp.wait();

    // //vote proposal 2
    // const v_2 = await ballotContract.connect(a2).vote(2, 1);
    // v_2.wait();
    // console.log(a0.address, "xp")

    // const winner = await ballotContract.winnerName();
    // console.log(
    //     `The winner is ${winner}`
    // );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});