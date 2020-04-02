import { makeClient } from '../ipc/ipc';

export const clientStub = ipcRendererInjector => makeClient(ipcRendererInjector, 'Wallet', [
  'start',
  'getWalletInfo',
  'getAccountInfo',
  'getCoin',
  'getNames',
  'createNewWallet',
  'importSeed',
  'generateReceivingAddress',
  'getAuctionInfo',
  'getTransactionHistory',
  'getPendingTransactions',
  'getBids',
  'getMasterHDKey',
  'setPassphrase',
  'revealSeed',
  'estimateTxFee',
  'estimateMaxSend',
  'sendOpen',
  'sendBid',
  'sendUpdate',
  'sendReveal',
  'sendRedeem',
  'sendRenewal',
  'send',
  'lock',
  'unlock',
  'isLocked',
  'getNonce',
  'importNonce',
  'zap',
]);
