module.exports ={
    config : {
        "protocol": "https",
        "hostname": "cloud-mvp.zkbob.com",
        "base_link": "{{ _.protocol }}://{{ _.hostname }}",
        "accountId1": "14d50eeb-2c46-4202-be39-ecdb1887d15e",
        "accountId2" : "aa2dce51-b855-411f-bd9d-14ff1c58f1ab",
        "baseURL" : "https://cloud-mvp.zkbob.com/",
        "urlOfAccount" : "account?id=",
        "urlOfShieldedAddress" : "generateAddress?id=",
        "urlOfTxHistory" : "history?id=",
        "urlOfShieldedTransfer" : "transfer",
        "urlOfTxStatus" : "transactionStatus?requestId="
    }
}