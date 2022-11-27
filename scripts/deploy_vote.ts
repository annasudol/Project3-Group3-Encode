import { ethers } from "hardhat";
import { MyToken, MyToken__factory } from "../typechain-types";
const TEST_TOKENS = ethers.utils.parseEther('10');
async function main() {
  const [a0, a1] = await ethers.getSigners();

  const tokenContractFactory = new MyToken__factory(a0);
  const tokenContract = await tokenContractFactory.deploy() as MyToken;
  await tokenContract.deployed();
  let balanceBN = await tokenContract.balanceOf(a0.address)
  console.log(
    `The token contract was deployed at the address ${tokenContract.address}, balance of the deployer is ${balanceBN}`
  );

  const mintTx = await tokenContract.mint(a0.address, TEST_TOKENS);
  mintTx.wait();
  balanceBN = await tokenContract.balanceOf(a0.address)
  console.log(
    `After minting balance of the deployer is ${balanceBN}`
  );

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
