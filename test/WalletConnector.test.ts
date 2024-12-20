import { WalletConnector } from '../src/sdk/WalletConnector';

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
    };
  }
}

describe('WalletConnector', () => {
  let walletConnector: WalletConnector;

  beforeEach(() => {
    walletConnector = new WalletConnector();
    window.ethereum = {
      isMetaMask: true,
      request: jest.fn().mockResolvedValue(['0x1234567890AbcdEF1234567890aBcdef12345678']) as unknown as (
        args: { method: string; params?: any[] }
      ) => Promise<any>,
    };
  });

  it('should connect and return the wallet address', async () => {
    const address = await walletConnector.connectWallet();
    expect(address).toBe('0x1234567890AbcdEF1234567890aBcdef12345678');
  });

  it('should return null if no wallet provider is found', async () => {
    window.ethereum = undefined;

    const address = await walletConnector.connectWallet();
    expect(address).toBeNull();
  });
});