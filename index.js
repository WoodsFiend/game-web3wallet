import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi'
import { reconnect } from '@wagmi/core'

import { getAccount } from '@wagmi/core'
import { signMessage } from '@wagmi/core'
import { sendTransaction } from '@wagmi/core'
import { switchChain } from '@wagmi/core'
import { mainnet, polygon } from '@wagmi/core/chains'
import { parseEther } from 'viem';

const chains = [mainnet, polygon]
const projectId = '8cb9d988c38d5dafd5fbe1f639fd6ff7'
const path = window.location.href.split('?')[0];
const metadata = {
    name: 'Yunipal Islands',
    description: 'Login to Yunipal Islands',
    url: path, // origin must match your domain & subdomain.
    icons: [path + 'logo.png']
  }
export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
})
//reconnect(config)
// 3. Create modal
const web3modal = createWeb3Modal({
    wagmiConfig: config,
    projectId,
    themeMode: 'dark'
})

document.addEventListener("DOMContentLoaded", loadApp());

async function loadApp() {
    await reconnect(config);

    const account = await getAccount(config);
    //web3modal.subscribeModal(() => processAction())
    web3modal.subscribeEvents(modalEvent => handleEvents(modalEvent.data.event));
    
    //This is not working to catch account already connected
    if(account.isConnected){
        processAction();
    }
    else{
        await web3modal.open();
        //wait for connection
    }
}

async function handleEvents(modalEvent){
    const CONNECTED = "CONNECT_SUCCESS";
    const DISCONNECTED = "DISCONNECT_SUCCESS";
    console.log("HandleEvent: " + modalEvent);
    if(modalEvent == CONNECTED){
        processAction();
    }
    else if (modalEvent == DISCONNECTED){
        const responseText = document.getElementById("response-text");
        responseText.innerHTML = "";
        responseText.className = "";
        const responseButton = document.getElementById("response-button");
        responseButton.className = "";
        responseButton.innerHTML = "Copy";
    }
}

async function processAction() {
  const account = getAccount(config);
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
    let account = getAccount(config);
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
    const account = getAccount(config); 
    if (account.chainId !== chainId) {
      await switchChain(config, {
          chainId: `0x${parseInt(chainId, 10).toString(16)}`
      });
    }

    const from = getAccount(config);
    const tx = await sendTransaction(config, {
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
      const signature = await signMessage(config, {message:message});
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
    const signature = await signMessage(config, {message:message});
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