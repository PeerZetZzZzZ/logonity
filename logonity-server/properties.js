global.properties = {
  aeMonitorServerPort: 6790,

  // aeNodeUrl: 'https://sdk-testnet.aepps.com',
  networks: [
    {
      networkId: 'MAINNET',
      aeNodeUrl: 'https://roma-net.aepps.com',
      aeNodePort: 443,
      checkBlockchainIntervalMillisecs: 20000, //every 20 seconds,
    },
    {
      networkId: 'TESTNET',
      aeNodeUrl: 'https://sdk-testnet.aepps.com',
      aeNodePort: 443,
      checkBlockchainIntervalMillisecs: 20000, //every 20 seconds,
    }
  ],
  //Database postgres settings
  postgresUser: 'postgres',
  postgresHost: 'localhost',
  postgresDatabase: 'mobycrypt',
  postgresPassword: 'mobycrypt',
  postgresPort: 5432,

  //AEMonitor specific settings
  checkExchangesIntervalMillisecs: 20000, //every 20 seconds,
  lastTransactionsCount: 20,
  lastKeyBlocksCount: 20,
  fetchWholeBlockchainOnStartWhenEmptyDb: false,
};