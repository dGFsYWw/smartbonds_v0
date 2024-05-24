document.getElementById('tokenForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const tokenName = document.getElementById('name').value;
    const tokenSymbol = document.getElementById('symbol').value;
    const initialSupply = document.getElementById('supply').value;

    const status = document.getElementById('status');

    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();

        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        /* Add the ABI of the ERC20Token contract here */
        const contractABI = [/* Add the ABI of the ERC20Token contract here */];
        /* Add the compiled bytecode of the ERC20Token contract here */
        const contractBytecode = '/* Add the compiled bytecode of the ERC20Token contract here */';

        const contract = new web3.eth.Contract(contractABI);

        contract.deploy({
            data: contractBytecode,
            arguments: [tokenName, tokenSymbol, initialSupply]
        }).send({
            from: account,
            gas: 1500000,
            gasPrice: '30000000000'
        }).on('receipt', (receipt) => {
            status.textContent = `Token deployed at address: ${receipt.contractAddress}`;
        }).on('error', (error) => {
            status.textContent = `Error: ${error.message}`;
        });
    } else {
        status.textContent = 'Please install MetaMask!';
    }
});
