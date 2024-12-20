export interface OwnershipCheckRequest {
    accountAddress: string;
    contractAddress: string;
}

export interface OwnershipCheckResponse {
    owned: boolean,
    amountOwned: number,
}