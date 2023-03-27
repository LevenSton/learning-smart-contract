// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract CrowdFunding {

    struct CrowdFund {
        address payable receiver;
        uint256 fundingGoal;
        uint256 fundNumers;
        uint256 totalAmounts;
    }
    struct Funder {
        address addr;
        uint256 amount;
    }

    uint256 public s_CrowdFundId;
    mapping(uint256 => CrowdFund) s_CrowdFundMap;
    mapping(uint256 => Funder[]) s_FundersMap;

    mapping(uint256 => mapping(address => bool)) s_IsParticipate;

    event NewCrowdFunding(address creator, address receiver, uint256 goal);
    event Funding(address funder, uint256 amount);
    event Withdraw(address caller, uint256 crowdFundingId, address receiver);

    modifier checkIfParticipate(uint256 crowdFunding) {
        require(!s_IsParticipate[crowdFunding][msg.sender], "Every account only can paticipate one time...");
        _;
    }

    function newCrowdFunding(address payable receiver, uint256 goal) external returns (uint256 newCrowdFundingId) {
        newCrowdFundingId = s_CrowdFundId++;
        CrowdFund storage newCrowdFund = s_CrowdFundMap[newCrowdFundingId];
        newCrowdFund.receiver = receiver;
        newCrowdFund.fundingGoal = goal;
        emit NewCrowdFunding(msg.sender, receiver, goal);
    } 

    function funding(uint256 crowdFundingId) external payable checkIfParticipate(crowdFundingId) {
        require(msg.value > 0, "msg.value need large than zero...");
        require(crowdFundingId <= s_CrowdFundId, "invaild crowdFunding id...");
        s_CrowdFundMap[crowdFundingId].fundNumers++;
        s_CrowdFundMap[crowdFundingId].totalAmounts += msg.value;
        s_IsParticipate[crowdFundingId][msg.sender] = true;
        s_FundersMap[crowdFundingId].push(Funder({
            addr: msg.sender,
            amount: msg.value
        }));
        emit Funding(msg.sender, msg.value);
    } 

    function getCrowdFundInfoById(uint256 crowdFundingId) public view returns (CrowdFund memory info) {
        info = s_CrowdFundMap[crowdFundingId];
    }

    function isParticipate(uint256 crowdFundingId, address funder) public view returns (bool) {
        return s_IsParticipate[crowdFundingId][funder];
    }

    function withdrawFunding(uint256 crowdFundngId) external returns (bool success) {
        CrowdFund storage c = s_CrowdFundMap[crowdFundngId];
        uint256 amount = c.totalAmounts;
        require(
            amount >= c.fundingGoal,
            "Can not withdraw caz not hit the Goal..."
        );
        c.totalAmounts = 0;
        c.receiver.transfer(amount);
        emit Withdraw(msg.sender, amount, c.receiver);
        success = true;
    }
}