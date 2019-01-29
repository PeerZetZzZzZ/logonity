const db = require('../../application/db/db');
const uuidv1 = require('uuid/v1');

exports.saveLogoCommission = (onSucceedCallback, onFailureCallback) => {
  const id = uuidv1();
  db.pool.query('INSERT INTO LOGO_COMMISSION(ID, ACTIVE, CREATION_TIME) VALUES($1, false, current_timestamp) ON CONFLICT DO NOTHING',
    [id],
    (err) => {
      if (err) {
        console.log(`Failed to insert logo commission!`, err);
        onFailureCallback();
      } else {
        console.log(`Inserted new logo commission!`);
        onSucceedCallback(id);
      }
    }
  )
};

exports.updateLogoCommission = (logoCommissionObject, onSucceedCallback, onFailureCallback) => {
  const id = uuidv1();
  db.pool.query('UPDATE LOGO_COMMISSION SET CONTRACT_ADDRESS = $1, LOGO_DESCRIPTION = $2, TRANSACTION_HASH = $3, ACTIVE = TRUE WHERE ID = $4',
    [logoCommissionObject.contractAddress,
      logoCommissionObject.logoDescription,
      logoCommissionObject.transactionHash,
      logoCommissionObject.id,
    ],
    (err) => {
      if (err) {
        console.log(`Failed to insert logo commission!`, err);
        onFailureCallback();
      } else {
        console.log(`Inserted new logo commission!`);
        onSucceedCallback(id);
      }
    }
  )
};