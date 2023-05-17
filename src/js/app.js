
var web3;
var chainId;

async function connect() {
    if(window.ethereum){
        try{
            await window.ethereum.enable()
        }catch(error){
            console.error("Denied access...")
        }
        web3 = new Web3(window.ethereum)
    }else if(window.web3){
        web3 = new Web3(window.ethereum)
    }else{
        alert("Please install the wallet...")
    }

    chainId = await web3.eth.getChainId();
    var blockNumber = await web3.eth.getBlockNumber();

    document.getElementById("chain_id").innerText = chainId;
    document.getElementById("block_number").innerText = blockNumber;
}