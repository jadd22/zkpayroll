const zkBob = require("../../../../services/zkBob");
const config = require("../../../../confg/config").config;
//const payroll = require("../../../../services/payroll");

module.exports = {
  payToSubscriber: async () => {
    const receiverAddress = config.accountId2;
    const senderAddress = config.accountId1;

    const respShieldedAddress = await zkBob.generateSheildedAddress(
      receiverAddress
    );
    const shieldAddress = respShieldedAddress;
    var transferPayload = JSON.stringify({
      accountId: senderAddress,
      amount: 1,
      to: shieldAddress,
    });
    const resp = await zkBob.shieldedTransfer(transferPayload);
    console.log(resp);
    return resp;
  },

  txHistory: async () => {
    const receiverAddress = config.accountId2;
    const senderAddress = config.accountId1;

    const respData = await zkBob.getTxHistoryOfAccount();
    let lastTxInfo = respData[respData.length - 1];
    return lastTxInfo;
  },

  payToSubscriberReceipt : async (data) => {
    const receiverAddress = config.accountId2;
    const senderAddress = config.accountId1;
    let url = "http://localhost:3001/payToSubscriber"

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
        let body =             
        JSON.stringify({
            address: "aa2dce51-b855-411f-bd9d-14ff1c58f1ab",
            cycle: "12012022",
            txHash : data
          });
    var requestOptions = {
        method: "POST",
        //mode: 'no-cors',
        redirect: "follow",
        headers: myHeaders,
        body: body,
      };
    const respData = await fetch(url,requestOptions);
    const result = await respData.json();
    return result.txHash.tx;
  }
//   getSubscriberInfo: async () => {
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     let body = {
//       address: "14d50eeb-2c46-4202-be39-ecdb1887d15e",
//       cycle: "12012022",
//     };
//     var requestOptions = {
//       method: "GET",
//       redirect: "follow",
//       headers: myHeaders,
//       body: body,
//     };

//     let url = "http://localhost:3001/getSubscriberInfo";

//     const respData = await fetch(url, requestOptions);

//     return respData;
//   },
};
