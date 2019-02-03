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
  db.pool.query('SELECT ID, LOGO_COMMENT, PICTURE_NAME FROM LOGO_PROPOSAL WHERE LOGO_COMMISSION_ID = $1', [commissionId],
    (err, res) => {
      if (err) {
        console.log(`Getting logo proposals for commission id ${commissionId} failed!`, err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    });
};

exports.getLogoProposalInfo = (proposalId, onSucceedCallback) => {
  db.pool.query('SELECT ID, LOGO_COMMENT, PICTURE_NAME, LOGO_COMMISSION_ID FROM LOGO_PROPOSAL WHERE ID = $1', [proposalId],
    (err, res) => {
      if (err) {
        console.log(`Getting logo proposal for proposal id ${proposalId} failed!`, err);
        onSucceedCallback(null);
      } else {
        onSucceedCallback(res.rows[0]);
      }
    });
};

exports.getLogoProposalPictureName = (proposalId, onSucceedCallback) => {
  db.pool.query('SELECT PICTURE_NAME FROM LOGO_PROPOSAL WHERE ID = $1', [proposalId],
    (err, res) => {
      if (err) {
        console.log('Getting logo proposal picture name failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows[0]);
      }
    })
};