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


exports.getCommissionInfo = (id, onSucceedCallback) => {
  db.pool.query('SELECT * FROM LOGO_COMMISSION WHERE ID = $1', [id],
    (err, res) => {
      if (err) {
        console.log('Getting last key blocks transactions failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows[0]);
      }
    });
};

exports.getLogoProposalsInfo = (commissionId, onSucceedCallback) => {
  db.pool.query('SELECT ID, LOGO_COMMENT FROM LOGO_PROPOSAL WHERE LOGO_COMMISSION_ID = $1', [commissionId],
    (err, res) => {
      if (err) {
        console.log(`Getting logo proposals for commission id ${commissionId} failed!`, err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    });
};