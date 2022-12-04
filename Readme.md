# zkPayroll

zkPayroll is dApp built on top zkBob stable coin. It facilates DAO, Corportation, Individual to generate invoice and salary payment.

## Polygon Mumbai Deployed Contract Details

https://mumbai.polygonscan.com/address/0x7899da421b09e91ef9d407f5a0ae349e694ab5c9

## Features
- Provides Subscription feature to enable recurring payments.
- Allows users to set payroll deduction like tax, investment, allowances, memos and anything.
- Stores and Manages Payroll transaction meta data on chain while hiding actual transaction amount.
- Smart contract functionality are readily available in REST API.
- Enrolled Administration can perform payment, view current subscriber details and generate invoice through UI.

## Technology

zkPayroll is built using many open source technology 

- [React] - HTML enhanced for web apps!
- [Solidity] - for smart contract development.
- [Node.JS] - Markdown parser done right. Fast and easy to extend.
- [REST API] - great UI boilerplate for modern web apps
- [Express] - fast node.js network app framework 
- [zkBob] - for privacy enabled payment.
- [Insomania] - For testing REST API endpoints.
- [Ganache] - For quick MVP development I have used ganache-cli.

## Installation

zkPayroll requires Nodejs to run

Install the dependencies and devDependencies and start the server.

For running smart contract development

CMD 1 - Start local Blockchain network

```sh
cd tidebringer
ganache-cli -p 9545
```

CMD 2 - Deploy smart contract

```sh
cd tidebringer
truffle migrate --reset
```

For running Reactjs based Web UI

CMD 3 - Start UI

```sh
cd frontend\client
npm i
npm start
```

REST API ENDPOINT 

http://localhost:3001

WEB UI

http://localhost:3000


