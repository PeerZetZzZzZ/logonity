const db = require('../../application/db/db');

exports.getAllActiveCommissions = (onSucceedCallback) => {
  db.pool.query('SELECT * FROM LOGO_COMMISSION WHERE ACTIVE = TRUE ORDER BY CREATION_TIME DESC',
    (err, res) => {
      if (err) {
        console.log('Getting last key blocks transactions failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    });
};
