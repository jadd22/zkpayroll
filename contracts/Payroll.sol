// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Payroll {

    struct DeductionDetails {
        uint256 basic;
        uint256 tax;
        uint256 pension;
        uint256 id; //invoice id
        string country;
        uint256 others;
        string misc;
    }

    mapping(bytes32 => mapping(bytes32 => DeductionDetails)) Details;
    mapping(bytes32 => bool) Subscription;
    mapping(bytes32 => uint256) AddressIndexInSubscription;


    bytes32[] activeSubscriptionAddress;

    function subscribeToPayroll(bytes32 _addr, bytes32 _data) external returns(bool) {
        Subscription[_addr] = true;
        DeductionDetails storage details = Details[_data][_addr];
        details.basic = 60;
        details.others = 15;
        details.tax = 20;
        details.pension = 5;
        activeSubscriptionAddress.push(_addr);
        AddressIndexInSubscription[_addr] = activeSubscriptionAddress.length;
        return true;
    }

    function payToSubscriber(
        bytes32 _addr, 
        bytes32 _data,
        uint256 _basic,
        uint256 _tax,
        uint256 _pension,
        uint256 _id,
        string calldata _country,
        uint256 _others,
        string calldata _misc
        ) external returns(bool) {
        DeductionDetails storage details = Details[_data][_addr];
        details.basic = _basic;
        details.others = _others;
        details.tax = _tax;
        details.pension = _pension;
        details.id =_id;
        details.country =_country;
        details.misc = _misc;
        return true;

    }

    function updateSubscription(bytes32 _addr, bool _status) external returns(bool) {
        Subscription[_addr] = _status ;
        if(_status) {
            uint256 index = AddressIndexInSubscription[_addr];
            activeSubscriptionAddress[index-1] = bytes32(0);
            AddressIndexInSubscription[_addr] = 0;
        } else {
            activeSubscriptionAddress.push(_addr);
            AddressIndexInSubscription[_addr] = activeSubscriptionAddress.length;
        }
        return true;
    }

    function updateBasicSalaryPercent(bytes32 _addr, uint256 _amount,bytes32 _data) external returns(bool) {
        Details[_data][_addr].basic = _amount;
        return true;
    }

    function updateTaxSalaryPercent(bytes32 _addr, uint256 _amount,bytes32 _data) external returns(bool) {
        Details[_data][_addr].tax = _amount;
        return true;
    }    

    function updatePensionSalaryPercent(bytes32 _addr, uint256 _amount,bytes32 _data) external returns(bool) {
        Details[_data][_addr].pension = _amount;
        return true;
    }

    function updateOthersSalaryPercent(bytes32 _addr, uint256 _amount,bytes32 _data) external returns(bool) {
        Details[_data][_addr].others = _amount;
        return true;
    }

    function getUserPayrollInformation(bytes32 _addr,
        bytes32 _data) 
        external view returns(
            uint256 Basic, 
            uint256 Tax, 
            uint256 Pension, 
            uint256 Others,
            uint256 Id,
            string memory Country,
            string memory Misc) {
        DeductionDetails memory details = Details[_data][_addr];
        return(
            details.basic,
            details.tax,
            details.pension,
            details.others,
            details.id,
            details.country,
            details.misc
        );
    }

    function getSubscribedPayrollAddress() external view returns(bytes32[] memory ActiveSubscriberList) {
        return activeSubscriptionAddress;
    }
}
