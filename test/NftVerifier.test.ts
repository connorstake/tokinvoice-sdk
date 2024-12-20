import { NftVerifier } from '../src/sdk/NftVerifier';

describe('NftVerifier', () => {
  let nftVerifier: NftVerifier;

  beforeEach(() => {
    nftVerifier = new NftVerifier('https://api.example.com');
    // Mock the global fetch function
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should verify ownership successfully', async () => {
    // Mock a successful response
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ owned: true }),
    });

    const result = await nftVerifier.verifyOwnership({
      accountAddress: '0x1234567890abcdef',
      contractAddress: '0xabcdefabcdefabcdef',
    });

    expect(result).toBe(true);
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/owner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountAddress: '0x1234567890abcdef',
        contractAddress: '0xabcdefabcdefabcdef',
      }),
    });
  });

  it('should handle API errors gracefully', async () => {
    // Mock a failed response
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Internal Server Error' }),
    });

    const result = await nftVerifier.verifyOwnership({
      accountAddress: '0x1234567890abcdef',
      contractAddress: '0xabcdefabcdefabcdef',
    });

    expect(result).toBe(false);
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/owner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountAddress: '0x1234567890abcdef',
        contractAddress: '0xabcdefabcdefabcdef',
      }),
    });
  });
});