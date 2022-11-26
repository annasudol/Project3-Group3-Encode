import { ethers } from "hardhat";

import * as dotenv from "dotenv";
dotenv.config();
const VOTE_CONTRACT = '0x0131bB54fB52A2eF0ba27411aF3e9AC87105b2e6';
const lastBlockNumber = 8026377;
async function main() {
    const proposals = ['voting 1', 'voting 2', 'voting 3'];

    const TokenizedBallot = await ethers.getContractFactory("TokenizedBallot");
    const ballotContract = await TokenizedBallot.deploy(proposals.map(prop => ethers.utils.formatBytes32String(prop)), VOTE_CONTRACT, lastBlockNumber);

    console.log("Deploying TokenizedBallot contract");
    await ballotContract.deployed();
    console.log(
        `The TokenizedBallot contract was deployed at the address ${ballotContract.address}`
    );
    const [a0, _a1, a2] = await ethers.getSigners();
    //vote proposal 1
    const v_0 = await ballotContract.vote(1, 1);
    v_0.wait();
    // //vote proposal 1

    //give voting power
    // const gvp = await ballotContract.giveVotingPower(a2.address);
    // gvp.wait();

    // //vote proposal 2
    // const v_2 = await ballotContract.connect(a2).vote(2, 1);
    // v_2.wait();
    // console.log(a0.address, "xp")

    const winner = await ballotContract.winnerName();
    console.log(
        `The winner is ${winner}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});