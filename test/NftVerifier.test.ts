import { NftVerifier } from '../src/sdk/NftVerifier';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('NftVerifier', () => {
  let mock: InstanceType<typeof MockAdapter>;;
  let nftVerifier: NftVerifier;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    nftVerifier = new NftVerifier('https://api.example.com');
  });

  afterEach(() => {
    mock.restore();
  });

  it('should verify ownership successfully', async () => {
    mock.onPost('/owner').reply(200, { owned: true });

    const result = await nftVerifier.verifyOwnership({
      accountAddress: '0x1234567890abcdef',
      contractAddress: '0xabcdefabcdefabcdef',
    });

    expect(result).toBe(true);
  });

  it('should handle API errors gracefully', async () => {
    mock.onPost('/owner').reply(500);

    const result = await nftVerifier.verifyOwnership({
      accountAddress: '0x1234567890abcdef',
      contractAddress: '0xabcdefabcdefabcdef',
    });

    expect(result).toBe(false);
  });
});