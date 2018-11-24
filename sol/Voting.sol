pragma solidity ^0.4.22;

contract Voting{
    //constructor to initialize candidates
    //vote for candidates
    //get count of votes for each candidates
    
    bytes32[] public candidateList;
    mapping (bytes32 => uint8) votesReceived;
    function Voting (bytes32[] candidateNames) public {
        candidateList = candidateNames;
    }
    
    function voteForCandidate(bytes32 candidate) public {
        //if not, then the contraction fails.
        require(validCandidate(candidate));
        votesReceived[candidate] += 1;
    }
    
    function totalVotesFor(bytes32 candidate) public returns (uint8){
        //if not, then the contraction fails.
        require(validCandidate(candidate));
        return votesReceived[candidate];
    }
    
    //to check whether the candidate is valid
    function validCandidate(bytes32 candidate) public returns(bool){
        for(uint i=0; i<candidateList.length; i++){
            if(candidateList[i] == candidate){
                return true;
            }
            return false;
        }
    }
    
}