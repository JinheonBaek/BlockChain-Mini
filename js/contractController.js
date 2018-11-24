// Init Setting
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://40.87.49.249:8123'));

var account;

function createAccount() {
	var password = $("#password").val();
	var newAccount = web3.personal.newAccount(password);
	console.log(newAccount);
}

// Vote for Multiple
var Voting = web3.eth.contract([{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
var votingContract = Voting.at("0x4135ea09f1b8bb96307427e3a098e01fcd3be51f");

// Vote for Once
// var Voting = web3.eth.contract([{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
// var votingContract = Voting.at("0x4D5cbb592993971a3a3cB8F6FBA630e60C66C70B");

var candidates = {"김동원": "candidate-1", "남기춘": "candidate-2", "선경": "candidate-3", "이두희": "candidate-4", "정영환": "candidate-5", "정진택": "candidate-6", "최광식": "candidate-7"};

function voteForCandidate(candidate) {
	// candidateName = $("#candidate").val();
	candidateName = candidate;
	console.log(candidateName)
	
	votingContract.voteForCandidate(candidateName, {from: account, gas: 4700000}, function() {
		let div_id = candidates[candidateName];
		$("#" + div_id).html(votingContract.totalVotesFor.call(candidateName).toString());
		console.log("완료");
	});
}

$(document).ready(function() {
	web3.eth.getAccounts(function(err, accs) {
		if (err != null) {
			alert('There was an error fetching your accounts.');
			return
		}

		if (accs.length === 0) {
			alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
			return
		}

   		account = accs[0];
	});

	candidateNames = Object.keys(candidates);

	for(var i=0; i < candidateNames.length; i++){
		let name = candidateNames[i];
		console.log(name)
		let val = votingContract.totalVotesFor.call(name).toNumber();
		$("#" + candidates[name]).html(val);
	}
});