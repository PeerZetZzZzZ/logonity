const db = require('../../application/db/db');

exports.updateTokenExchangeEntry = (entry) => {
  db.pool.query('UPDATE TOKEN_EXCHANGE SET VOLUME_24 = $1, PRICE = $2, UPDATE_DATE = current_timestamp WHERE EXCHANGE_NAME = $3',
    [entry.volume24, entry.price, entry.exchangeName],
    (err) => {
      if (err) {
        console.log(`Failed to update token exchange entry !`, entry, err);
      } else {
        console.log(`Updated token exchange entry for exchange ${entry.exchangeName}`);
      }
    }
  )
};

exports.getTokenExchangeEntries = (onSucceedCallback) => {
  db.pool.query('SELECT * FROM TOKEN_EXCHANGE',
    (err, res) => {
      if (err) {
        console.log(`Failed to get token exchange entries!`, err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    }
  )
};