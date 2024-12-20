import { ethers } from 'ethers';

export class WalletConnector {
  provider: ethers.BrowserProvider | null = null;

  async connectWallet(): Promise<string | null> {
    if (!window.ethereum) {
      console.error('No wallet provider found');
      return null;
    }

    this.provider = new ethers.BrowserProvider(window.ethereum);
    await this.provider.send('eth_requestAccounts', []);
    const signer = this.provider.getSigner();
    return await (await signer).getAddress();
  }
}