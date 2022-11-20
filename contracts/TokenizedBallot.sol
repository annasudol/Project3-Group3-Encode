// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
/// @title Voting with delegation.
import "./Vote.sol";
interface IMyToken {
    function getPastVotes(address account, uint256 blockNumber) external returns(uint256);
    function delegate(address delegatee) external;
}
contract TokenizedBallot {
    IMyToken public voteToken;
    uint256 targetBlockNumber;

    struct Proposal {
        bytes32 name;   // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
    }
    mapping(address => uint256) spentVotePower;

    Proposal[] public proposals;

    constructor(bytes32[] memory proposalNames, address voteTokenAddress, uint256 _targetBlockNumber) {
        targetBlockNumber = _targetBlockNumber;
        voteToken = IMyToken(voteTokenAddress);
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }
    function vote(uint proposal, uint256 amount) external {
        require(votePower(msg.sender) >= amount, "Not enought voting power");
        proposals[proposal].voteCount += amount;
        spentVotePower[msg.sender] += amount;
    }

    function delegateVote(uint256 amount, address to) external {
        require(votePower(msg.sender) >= amount, "Not enought voting power");
        return voteToken.delegate(to);
    }
    function giveVotingPower(address to) external {
        uint256 votingPower = votePower(msg.sender);
        if(votingPower > 0) {
            spentVotePower[to] = spentVotePower[msg.sender];
            return voteToken.delegate(to);
        }
    }

    function winningProposal() public view
            returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function winnerName() external view
            returns (bytes32 winnerName_)
    {
        winnerName_ = proposals[winningProposal()].name;
    }


    function votePower(address account) public returns (uint256) {
        return voteToken.getPastVotes(account, targetBlockNumber) - spentVotePower[msg.sender];
    }

}