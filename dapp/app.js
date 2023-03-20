const TemplateABI = [/* Paste the ABI from your compiled Template.sol here */];
const TemplateAddress = "/* Paste your Template contract address here */";
const ipfs = window.IpfsHttpClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

let web3;
let contract;
let account;
let auditLog = [];

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      account = (await web3.eth.getAccounts())[0];
      contract = new web3.eth.Contract(TemplateABI, TemplateAddress);
      document.getElementById('walletAddress').innerText = account;
      document.getElementById('walletInfo').style.display = 'block';
      updateCount();
    } catch (error) {
      console.error("User denied account access");
    }
  } else {
    alert("No Ethereum browser extension detected, please install MetaMask.");
  }
}

async function addUser() {
  try {
    await contract.methods.addUser(100).send({ from: account });
    addToAuditLog('Add User');
  } catch (error) {
    console.error("Error adding user:", error);
  }
}

async function increment() {
  try {
    await contract.methods.increment().send({ from: account });
    updateCount();
    addToAuditLog('Increment');
  } catch (error) {
    console.error("Error incrementing count:", error);
  }
}

async function decrement() {
  try {
    await contract.methods.decrement().send({ from: account });
    updateCount();
    addToAuditLog('Decrement');
  } catch (error) {
    console.error("Error decrementing count:", error);
  }
}

async function updateCount() {
  try {
    const currentCount = await contract.methods.getCount().call({ from: account });
    document.getElementById('count').innerText = currentCount;
  } catch (error) {
    console.error("Error getting count:", error);
  }
}
  
async function addToAuditLog(action) {
  const timestamp = new Date().toISOString();
  auditLog.push({ action, timestamp, account });
  try {
    const { path } = await ipfs.add(JSON.stringify(auditLog));
    const url = `https://ipfs.io/ipfs/${path}`;
    document.getElementById('auditLogLink').href = url;
    document.getElementById('auditLogLink').innerText = url;
  } catch (error) {
    console.error("Error adding audit log to IPFS:", error);
  }
}
  
document.getElementById('connectWallet').addEventListener('click', connectWallet);
document.getElementById('addUser').addEventListener('click', addUser);
document.getElementById('increment').addEventListener('click', increment);
document.getElementById('decrement').addEventListener('click', decrement);
  