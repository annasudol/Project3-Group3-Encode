import { ethers } from "ethers";
import { TokenizedBallot, TokenizedBallot__factory } from "../typechain-types"

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    const provider = ethers.getDefaultProvider("goerli", {
        etherscan: process.env.ETHERSCAN_API_KEY,
        alchemy: process.env.ALCHEMY_API_KEY
    });

    const pKey = process.env.PRIVATE_KEY as string;
    console.log(pKey)
    const wallet = new ethers.Wallet(pKey);

    const signer = wallet.connect(provider);

    const proposals = ['voting 1', 'voting 2'];

    console.log("Deploying TokenizedBallot contract");

    const ballotContractFactory = new TokenizedBallot__factory(signer);
    const ballotContract = await ballotContractFactory.deploy(proposals.map(prop => ethers.utils.formatBytes32String(prop)), '0x5D2207Ef9DaAE1ad7781D4F126f7F8BE29A9bBd5', 10) as TokenizedBallot;
    await ballotContract.deployed();

    console.log(
        `The TokenizedBallot contract was deployed at the address ${ballotContract.address}`
    );
    //     const vp = await ballotContract.votePower(signer.address);
    //     console.log(vp, "xp")
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});