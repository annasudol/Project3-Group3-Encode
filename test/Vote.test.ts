import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Vote } from "../typechain-types"
describe("Vote", function () {
    let voteToken: Vote;
    let owner: SignerWithAddress;
    let account1: SignerWithAddress;
    const zero_address = ethers.constants.AddressZero;

    beforeEach(async function () {
        const contract = await ethers.getContractFactory("Vote");
        voteToken = await contract.deploy();
        [owner, account1] = await ethers.getSigners();

    });
    describe('mint', function () {
        it('complete transaction', async function () {
            let voting_balance = await voteToken.getVotes(owner.address);
            expect(voting_balance).to.be.equal(0);
            const minting_val = 100;
            const tx = await voteToken.mint(owner.address, minting_val);

            await expect(tx).to.emit(voteToken, "Transfer").withArgs(zero_address, owner.address, minting_val);
            voting_balance = await voteToken.getVotes(owner.address);
            expect(voting_balance).to.be.equal(0);
        });
    });

    describe('voting power', async function () {
        const minting_val = 100;
        beforeEach(async () => {
            await voteToken.mint(owner.address, minting_val);
        })
        it('change voting power after delegate', async function () {
            const initial_voting_balance = await voteToken.getVotes(owner.address);
            expect(initial_voting_balance).to.be.equal(0);
            await voteToken.delegate(owner.address);
            const voting_balance = await voteToken.getVotes(owner.address);
            console.log(voting_balance, 'voting_balance')
            expect(voting_balance).to.be.equal(minting_val);
        });
        it('change voting power after transfer', async function () {
            await voteToken.delegate(owner.address);

            await voteToken.transfer(account1.address, 10);
            const voting_balance = await voteToken.getVotes(owner.address);
            console.log(voting_balance, 'voting_balance')
            expect(voting_balance).to.be.equal(90);
            let currentBlock = await voteToken.provider.getBlock('latest');
            for (let i = currentBlock.number - 1; i >= 0; i--) {
                let votePower = await voteToken.getPastVotes(owner.address, i);
                // console.log(votePower, i)
            }
        });
    });
});
