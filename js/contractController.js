// Init Setting
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://40.87.49.249:8123'));

// Accounts
var accounts = web3.eth.accounts;

console.log(accounts);