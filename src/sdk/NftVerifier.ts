import { ApiClient } from '../api/ApiClient';
import { OwnershipCheckRequest, OwnershipCheckResponse } from './types';

export class NftVerifier {
  private apiClient: ApiClient;

  constructor(apiBaseUrl: string) {
    this.apiClient = new ApiClient(apiBaseUrl);
  }

  async verifyOwnership(request: OwnershipCheckRequest): Promise<boolean> {
    try {
      const response: OwnershipCheckResponse = await this.apiClient.post('/owner', request);
      return response.owned;
    } catch (error) {
      console.error('Error verifying ownership:', error);
      return false;
    }
  }
}