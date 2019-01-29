const db = require('../../application/db/db');

exports.getLastKeyBlocks = (networkId, number, onSucceedCallback) => {
  db.pool.query('SELECT * FROM KEY_BLOCK WHERE NETWORK_ID = $1 GROUP BY HASH ORDER BY MAX(TIME) DESC limit $2', [networkId, number],
    (err, res) => {
      if (err) {
        console.log('Getting last key blocks transactions failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    });
};

exports.getMicroBlocksCountForGivenBlocksHashArray = (networkId, keyBlocksHashArray, onSucceedCallback) => {
  db.pool.query('SELECT KB.HASH, COUNT(*) FROM MICRO_BLOCK MB JOIN KEY_BLOCK KB ON MB.KEY_BLOCK_HASH = KB.HASH WHERE KB.HASH = ANY ($1) AND KB.NETWORK_ID = ($2) GROUP BY KB.HASH',
    [keyBlocksHashArray, networkId],
    (err, res) => {
      if (err) {
        console.log('Getting last micro blocks transactions failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    });
};

exports.getBlocksMinedByMinersWithinLast24hOrderedDesc = (networkId, onSucceedCallback) => {
  db.pool.query('SELECT BENEFICIARY, COUNT(*) FROM KEY_BLOCK WHERE NETWORK_ID = $1 AND time >= NOW() - \'1 day\'::INTERVAL GROUP BY BENEFICIARY ORDER BY COUNT(*) DESC',
    [networkId],
    (err, res) => {
      if (err) {
        console.log('Getting blocks mined by miners within last 24h ordered desc failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    });
};


exports.getTransactionsCountOfGivenBlocksHeight = (networkId, keyBlocksHeightArray, onSucceedCallback) => {
  db.pool.query('SELECT AET.BLOCK_HEIGHT, COUNT(*) FROM AE_TRANSACTION AET WHERE AET.NETWORK_ID = ($1) AND AET.BLOCK_HEIGHT = ANY($2) GROUP BY AET.BLOCK_HEIGHT',
    [networkId, keyBlocksHeightArray],
    (err, res) => {
      if (err) {
        console.log('Getting transactions count of given micro blocks hashes array failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    });
};

exports.getTransactionsTimesOfBlocksFromLast24hOrderedDesc = (networkId, onSucceedCallback, timeFrameUnit, timeFrameUnitQuantity) => {
  let timeFrame = `'${timeFrameUnitQuantity} ${timeFrameUnit}'`;
  db.pool.query(`SELECT KB.TIME FROM AE_TRANSACTION AET JOIN MICRO_BLOCK MB ON MB.HASH = AET.MICRO_BLOCK_HASH JOIN KEY_BLOCK KB ON MB.KEY_BLOCK_HASH = KB.HASH WHERE KB.NETWORK_ID = $1 AND KB.time >= NOW() - ${timeFrame}::INTERVAL`,
    [networkId],
    (err, res) => {
      if (err) {
        console.log('Getting transactions block times from last 24h ordered desc failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    });
};

exports.getCountKeyBlocksFromLastHour = (networkId, onSucceedCallback) => {
  db.pool.query('SELECT COUNT(*) FROM KEY_BLOCK KB WHERE KB.NETWORK_ID = $1 AND KB.time >= NOW() - \'1 hour\'::INTERVAL',
    [networkId],
    (err, res) => {
      if (err) {
        console.log('Getting count key blocks from last hour failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    })
};

exports.getLastTransactions = (networkId, number, onSucceedCallback) => {
  db.pool.query('SELECT AET.HASH, AET.BLOCK_HEIGHT, AET.AMOUNT, AET.TYPE, AET.FEE FROM AE_TRANSACTION AET JOIN MICRO_BLOCK MB ON MB.HASH = AET.MICRO_BLOCK_HASH JOIN KEY_BLOCK KB ON MB.KEY_BLOCK_HASH = KB.HASH WHERE KB.NETWORK_ID = $1 ORDER BY (KB.TIME) DESC LIMIT $2',
    [networkId, number], (err, res) => {
      if (err) {
        console.log('Getting last transactions failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    });
};


exports.getGroupedTransactionsPerTypeQuantityFromLastTimeFrame = (networkId, onSucceedCallback, timeFrameUnit, timeFrameUnitQuantity) => {
  let timeFrame = `'${timeFrameUnitQuantity} ${timeFrameUnit}'`;
  db.pool.query(`SELECT AET.TYPE, COUNT(*) FROM AE_TRANSACTION AET JOIN MICRO_BLOCK MB ON MB.HASH = AET.MICRO_BLOCK_HASH JOIN KEY_BLOCK KB ON MB.KEY_BLOCK_HASH = KB.HASH WHERE KB.NETWORK_ID = $1 AND KB.time >= NOW() - ${timeFrame}::INTERVAL GROUP BY AET.TYPE`,
    [networkId], (err, res) => {
      if (err) {
        console.log('Getting grouped transactions per type quantity from last 24h failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    });
};

exports.getAvgTransactionsFeeFromLast24h = (networkId, onSucceedCallback, timeFrameUnit, timeFrameUnitQuantity) => {
  let timeFrame = `'${timeFrameUnitQuantity} ${timeFrameUnit}'`;
  db.pool.query(`SELECT AVG(AET.FEE) FROM AE_TRANSACTION AET JOIN MICRO_BLOCK MB ON MB.HASH = AET.MICRO_BLOCK_HASH JOIN KEY_BLOCK KB ON MB.KEY_BLOCK_HASH = KB.HASH WHERE KB.NETWORK_ID = $1 AND KB.time >= NOW() - ${timeFrame}::INTERVAL`,
    [networkId], (err, res) => {
      if (err) {
        console.log('Getting last 24h avg transactions fee failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    });
};

exports.getMaxSavedKeyBlockHeight = (networkId, onSucceedCallback) => {
  db.pool.query('SELECT MAX(HEIGHT) FROM KEY_BLOCK WHERE NETWORK_ID = $1',
    [networkId],
    (err, res) => {
      if (err) {
        console.log('Getting last saved key block height failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    }
  );
};

exports.getGroupedTransactionsPerKeyBlockFromLast24h = (networkId, onSucceedCallback, timeFrameUnit, timeFrameUnitQuantity) => {
  let timeFrame = `'${timeFrameUnitQuantity} ${timeFrameUnit}'`;
  db.pool.query(`SELECT KB.HEIGHT, COUNT (AET) FROM KEY_BLOCK KB LEFT JOIN MICRO_BLOCK MB ON MB.KEY_BLOCK_HASH = KB.HASH LEFT JOIN AE_TRANSACTION AET ON AET.MICRO_BLOCK_HASH = MB.HASH WHERE KB.NETWORK_ID = $1 AND KB.time >= NOW() - ${timeFrame}::INTERVAL GROUP BY KB.HEIGHT`,
    [networkId], (err, res) => {
      if (err) {
        console.log('Getting grouped transactions per key block from last 24h failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    });
};