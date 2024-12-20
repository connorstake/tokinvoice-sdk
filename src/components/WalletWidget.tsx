import React, { useState } from 'react';
import { WalletConnector } from '../sdk/WalletConnector';
import { NftVerifier } from '../sdk/NftVerifier';

export const WalletWidget: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const connectWallet = async () => {
    const walletConnector = new WalletConnector();
    const address = await walletConnector.connectWallet();
    setWalletAddress(address);
  };

  const verifyOwnership = async () => {
    if (!walletAddress) {
      setVerificationResult('Please connect your wallet first.');
      return;
    }

    const contractAddress = '0xYourNFTContractAddressHere'; // Replace with the actual NFT contract address
    const nftVerifier = new NftVerifier('http://localhost:3000');

    setLoading(true);
    const ownsNFT = await nftVerifier.verifyOwnership({ accountAddress: walletAddress, contractAddress });
    setLoading(false);

    setVerificationResult(ownsNFT ? 'You own an NFT from this collection!' : 'No NFT found for this collection.');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>NFT Ownership Verifier</h2>
      <button onClick={connectWallet} disabled={!!walletAddress}>
        {walletAddress ? `Wallet Connected: ${walletAddress}` : 'Connect Wallet'}
      </button>

      <br /><br />

      <button onClick={verifyOwnership} disabled={!walletAddress || loading}>
        {loading ? 'Verifying...' : 'Verify NFT Ownership'}
      </button>

      {verificationResult && <p>{verificationResult}</p>}
    </div>
  );
};