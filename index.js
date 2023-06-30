import { EthereumClient } from '@web3modal/ethereum'
import { w3mConnectors } from '@web3modal/ethereum'
import { w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import { configureChains } from '@wagmi/core'
import { createConfig } from '@wagmi/core'
import { getAccount } from '@wagmi/core'
import { getNetwork } from '@wagmi/core'
import { signMessage } from '@wagmi/core'
import { sendTransaction } from '@wagmi/core'
import { switchNetwork } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { polygon } from '@wagmi/core/chains'
import { parseEther } from 'viem';

const chains = [mainnet, polygon]
const projectId = '8cb9d988c38d5dafd5fbe1f639fd6ff7'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)
const web3modal = new Web3Modal({ projectId }, ethereumClient)

document.addEventListener("DOMContentLoaded", loadApp());

async function loadApp() {
    const account = getAccount();
    //web3modal.subscribeModal(() => processAction())
    web3modal.subscribeEvents(modalEvent => handleEvents(modalEvent));
    if(account.isConnected){
        processAction();
    }
    else{
        await web3modal.openModal();
        //wait for connection
    }
}

async function handleEvents(modalEvent){
    const CONNECTED = "ACCOUNT_CONNECTED";
    const DISCONNECTED = "ACCOUNT_DISCONNECTED";
    if(modalEvent.name == CONNECTED){
        processAction();
    }
    else if (modalEvent.name == DISCONNECTED){
        const responseText = document.getElementById("response-text");
        responseText.innerHTML = "";
        responseText.className = "";
        const responseButton = document.getElementById("response-button");
        responseButton.className = "";
        responseButton.innerHTML = "Copy";
    }
}

async function processAction() {
  const account = getAccount();
  //Don't process if no account is connected
  if(!account.isConnected || account.isConnecting) return;
  const urlParams = new URLSearchParams(window.location.search);
  const action = urlParams.get("action");
  const message = urlParams.get("message");
  const chainId = urlParams.get("chainId") || 1;
  const to = urlParams.get("to");
  const value = urlParams.get("value");
  const data = urlParams.get("data") || "";
  const gasLimit = urlParams.get("gasLimit") || undefined;
  const gasPrice = urlParams.get("gasPrice") || undefined;

  if (action === "sign" && message) {
    return signWagmiMessage(message);
  }

  if (action === "send" && to && value) {
    return sendWagmiTransaction(chainId, to, value, gasLimit, gasPrice, data);
  }

  if(action === "auth" && message) {
    let account = getAccount();
    //get the signing message using the message
    let response = await fetch(message + '/functions/requestMessage?address=' + account.address + '&chain=001',
        {
            method:'POST'
        }
    );
    let jsonData = await response.json();
    console.log(jsonData.result.message);
    return authSignMessage(jsonData.result.message);
  }

  displayResponse("Invalid URL");
}

async function sendWagmiTransaction(chainId, to, value, gasLimit, gasPrice, data) {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const network = await getNetwork();

    if (network.chainId !== chainId) {
      await switchNetwork({
          chainId: `0x${parseInt(chainId, 10).toString(16)}`
      });
    }

    const from = getAccount();
    const tx = await sendTransaction({
      account: from,
      to: to,
      value: parseEther(value),
    });
    console.log({
      tx
    });
    displayResponse("Transaction sent.<br><br>Copy to clipboard then continue to App", tx.hash);
  } catch (error) {
    copyToClipboard("error");
    displayResponse("Transaction Denied");
  }
}

async function authSignMessage(message) {
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const signature = await signMessage({message:message});
      console.log({
        signature
      });
      const response = {signature, message};
      displayResponse("Signature complete.<br><br>Copy to clipboard then continue to App", JSON.stringify(response));
    } catch (error) {
      copyToClipboard("error");
      displayResponse("Signature Denied");
    }
  }

async function signWagmiMessage(message) {
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const signature = await signMessage({message:message});
    console.log({
      signature
    });
    displayResponse("Signature complete.<br><br>Copy to clipboard then continue to App", signature);
  } catch (error) {
    copyToClipboard("error");
    displayResponse("Signature Denied");
  }
}

async function copyToClipboard(response) {
  try {
    // focus from metamask back to browser
    window.focus(); // wait to finish focus

    await new Promise(resolve => setTimeout(resolve, 500)); // copy tx hash to clipboard

    await navigator.clipboard.writeText(response);
    document.getElementById("response-button").innerHTML = "Copied";
  } catch {
    // for metamask mobile android
    const input = document.createElement("input");
    input.type = "text";
    input.value = response;
    document.body.appendChild(input);
    input.select();
    document.execCommand("Copy");
    input.style = "visibility: hidden";
    document.getElementById("response-button").innerHTML = "Copied";
  }
}

function displayResponse(text, response) {
  // display error or response
  const responseText = document.getElementById("response-text");
  responseText.innerHTML = text;
  responseText.className = "active";

  if (response) {
    // display button to copy tx.hash or signature
    const responseButton = document.getElementById("response-button");
    responseButton.className = "active";

    responseButton.onclick = () => copyToClipboard(response);
  }
}