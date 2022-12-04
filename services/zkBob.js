const config = require("../confg/config").config;
module.exports = {
  getAccountInfo:async (account) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    let url = config.baseURL+config.urlOfAccount+ account;
    
    const resp = await fetch(url,requestOptions);
    const data = await resp.json();
    return data;
  },

  generateSheildedAddress : async(account) => {
    console.log("sdasf");
    var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      let url = config.baseURL+config.urlOfShieldedAddress+ account;
      
      const resp = await fetch(url,requestOptions);
      const data = await resp.json();
      return data.address;
  },

  getTxHistoryOfAccount : async(account) => {
    var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      let url = config.baseURL+config.urlOfTxHistory+ account;
      
      const resp = await fetch(url,requestOptions);
      const respdata = await resp.json();
      return respdata;    
  },

  shieldedTransfer : async(data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "POST",
        redirect: "follow",
        headers: myHeaders,
        body: data,
      };
      console.log(requestOptions);
      console.log(data);
      let url = config.baseURL+config.urlOfShieldedTransfer;
      
      const resp = await fetch(url,requestOptions);
      const respdata = await resp.json();
      return respdata;  
  }


};
