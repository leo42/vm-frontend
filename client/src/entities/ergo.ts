export enum WalletName {
  nautilus = "nautilus",
}

export interface ErgoWalletApi {
  auth: Function;
  constructor: Function;
  get_balance: Function;
  get_change_address: Function;
  get_unused_addresses: Function;
  get_used_addresses: Function;
  get_utxos: Function;
  sign_data: Function;
  sign_tx: Function;
  sign_tx_input: Function;
  submit_tx: Function;
}

export type NautilusErgoWalletApi = ErgoWalletApi;
