import React, { useEffect } from 'react';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import { Button } from 'web3uikit';
import taurosABI from './taurosABI.json'
import estatesABI from './estatesABI.json'
import './App.css';

function App() {

  const {authenticate, isAuthenticated, isAuthenticating, user, account, logout} = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  useEffect(() => {
    if (isAuthenticated) {

    }

  }, [isAuthenticated])

  // logs user into wallet if !isAuthenticated
  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({signingMessage: 'Log into Xezom.'})
      .then((user) => {
        console.log(`Logged in as user: ${user}`);
        console.log(user!.get('ethAddress'));        
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
  // disconnects user 
  const logOut = async () => {
    await logout();
    console.log("Logged out.");
    
  }

  
  async function _mintTauros() {
    let options = {
      contractAddress: '0x7ed80F34Bf90Eff85423D88b7B827b75A51B6552',
      functionName: 'mintNFTs',
      abi: taurosABI,
      params: {
        _count: 1,
      }
    }
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        console.log("Mint successful");
      },
      onError: (error) => {
        console.log(error);
      }
    })
  }
  async function _mintEstates() {
    let options = {
      contractAddress: '0x25cff20e9fb576b76768d4ce69c66578b7f7ac5d',
      functionName: 'mintNFTs',
      abi: estatesABI,
      params: {
        _mintAmount: 1,
      }
    }
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        console.log("Mint successful");
      },
      onError: (error) => {
        console.log(error);
      }
    })
  }


  return (
    <div>
      <div>
      <Button onClick={login} text={'Enable MetaMask'} theme={"colored"} />
      <Button onClick={logOut} disabled={isAuthenticating} text={"Logout"} theme={"secondary"} />
    </div>
    <div>
      <Button onClick={() => {
        if (isAuthenticated) {_mintTauros();}
      }} text={"Mint Taurus"} theme={"primary"} />
      <Button onClick={() => {
        if (isAuthenticated) {_mintEstates();}
      }} text={"Mint Estates"} theme={"primary"} />
    </div>
    </div>
  );
}

export default App;
