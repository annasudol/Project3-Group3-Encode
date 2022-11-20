import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { TokenizedBallot } from "../typechain-types"
describe("TokenizedBallot", function () {
    let voteToken: TokenizedBallot;
    let owner: SignerWithAddress;
    let account1: SignerWithAddress;
    let account2: SignerWithAddress;

    const zero_address = ethers.constants.AddressZero;

    beforeEach(async function () {
        const contract = await ethers.getContractFactory("TokenizedBallot");
        voteToken = await contract.deploy([ethers.utils.formatBytes32String('test1')], '0x5D2207Ef9DaAE1ad7781D4F126f7F8BE29A9bBd5', 10);
        [owner, account1] = await ethers.getSigners();


    });
    describe('vote', function () {
        it('complete transaction', async () => {
            const tx = await voteToken.vote(1, 1);
            console.log(tx, "tx")
        });
    });
});
