//const web3 = new Web3('http://127.0.0.1:9545');
const contractArtifact = require("../build/contracts/Payroll.json"); //produced by Truffle compile
const contract = require("@truffle/contract");
const Web3 = require("web3");
const { subscribe } = require("../routes");
const web3 = new Web3(
  new Web3.providers.HttpProvider("http://127.0.0.1:9545/")
);
const Payroll = contract(contractArtifact);
const zkBob = require("./zkBob");
const config = require("../confg/config").config;

Payroll.setProvider(web3.currentProvider);

let instance, defaultAcc;
const init = async () => {
  let address = await web3.eth.getAccounts();
  defaultAcc = address[0];
  instance = await Payroll.deployed();
};

init();

module.exports = {
  getInfo: async (req, res) => {
    try {
      console.log("test");
      const address = await instance.address;
      const zkBobAccountInf = await zkBob.getAccountInfo(config.accountId1);
      res.status(200).send({
        payrollContractAddress: address,
        zkBobAccountInformation: zkBobAccountInf,
      });
      return;
    } catch (error) {
      console.log(error.message);
    }
  },

  subscribeToPayroll: async (req, res) => {
    try {
      const txHash = await instance.subscribeToPayroll(
        web3.utils.sha3(req.body.address),
        web3.utils.sha3(req.body.cycle),
        {
          from: defaultAcc,
        }
      );
      res.status(200).send({
        txHash: txHash,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({
        error: error.message,
      });
    }
  },

  getSubscriberInfo: async (req, res) => {
    try {
      const info = await instance.getUserPayrollInformation(
        web3.utils.sha3(req.body.address),
        web3.utils.sha3(req.body.cycle),
        {
          from: defaultAcc,
        }
      );
      let respData = {
        Basic: info.Basic.toNumber(),
        Tax: info.Tax.toNumber(),
        Pension: info.Pension.toNumber(),
        Others: info.Others.toNumber(),
        Id: info.Id.toNumber(),
        TxHash: info.txHash,
        Misc: info.Misc,
      };
      res.status(200).send({
        subscriberInfo: respData,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({
        error: error.message,
      });
    }
  },

  getAllActiveSubscribers: async (req, res) => {
    try {
      const info = await instance.getSubscribedPayrollAddress();
      res.status(200).send({
        activesubscriber: info,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({
        error: error.message,
      });
    }
  },
  payToSubscriber: async (req, res) => {
    try {
      let invoiceMemo = {
        date: "Paid for December",
      };
      const txHash = await instance.payToSubscriber(
        web3.utils.sha3(req.body.address),
        web3.utils.sha3(req.body.cycle),
        60,
        15,
        20,
        Math.floor(Math.random() * 1000),
        req.body.txHash,
        5,
        JSON.stringify(invoiceMemo),
        {
          from: defaultAcc,
        }
      );
      res.status(200).send({
        txHash: txHash,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({
        error: error.message,
      });
    }
  },
};
