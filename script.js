// Connecting to the contract
const contractAddress = "0x284A057e2fb9a4bb7D1441447a37e3584fe73182"; // Replace it with your contract

// Specifying the ABI (Application Binary Interface) of the contract
const abi = [
	{
		"inputs": [],
		"name": "getNote",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_note",
				"type": "string"
			}
		],
		"name": "setNote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

// Connecting to the web3 provider (metamask)
const provider = new ethers.providers.Web3Provider(window.ethereum, 97);

let signer;
let contract;

// Requesting user accounts and connecting to the first account
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    //Creating a contract object
    contract = new ethers.Contract(contractAddress, abi, signer);
    console.log(contract);
  });
});

// Calling setNote() in the smart contract
async function setNote() {
  const note = document.getElementById("note").value;
  const setNote = await contract.setNote(note);
}

// Calling getNote() in the smart contract and showing it to the user
async function getNote() {
  const note = await contract.getNote();
  console.log(getNote);
  document.getElementById("result").innerText = note;
}
