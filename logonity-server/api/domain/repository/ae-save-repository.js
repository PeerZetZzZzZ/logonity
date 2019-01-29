const db = require('../../application/db/db');

exports.saveKeyBlock = (networkId, aeKeyBlockObject, onSucceedCallback) => {
  db.pool.query('INSERT INTO KEY_BLOCK(HASH, HEIGHT, MINER, NONCE, PREV_HASH, PREV_KEY_HASH, STATE_HASH, TARGET, BENEFICIARY, TIME, VERSION, NETWORK_ID) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ON CONFLICT DO NOTHING',
    [aeKeyBlockObject.hash,
      aeKeyBlockObject.height,
      aeKeyBlockObject.miner,
      aeKeyBlockObject.nonce,
      aeKeyBlockObject.prevHash,
      aeKeyBlockObject.prevKeyHash,
      aeKeyBlockObject.stateHash,
      aeKeyBlockObject.target,
      aeKeyBlockObject.beneficiary,
      new Date(aeKeyBlockObject.time),
      aeKeyBlockObject.version,
      networkId],
    (err) => {
      if (err) {
        console.log(`Failed to insert key block with number ${aeKeyBlockObject.height}!`, err);
      } else {
        console.log(`[${networkId}] Inserted (if not yet existed) new save key block with number ${aeKeyBlockObject.height}`);
        onSucceedCallback();
      }
    }
  )
};

exports.saveMicroBlock = (networkId, aeMicroBlockObject, keyBlockHash, onSucceedCallback) => {
  db.pool.query('INSERT INTO MICRO_BLOCK(HASH, KEY_BLOCK_HASH, HEIGHT, POF_HASH, PREV_HASH, PREV_KEY_HASH, SIGNATURE, TXS_HASH, TIME, VERSION, NETWORK_ID) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ON CONFLICT DO NOTHING',
    [aeMicroBlockObject.hash,
      keyBlockHash,
      aeMicroBlockObject.height,
      aeMicroBlockObject.pofHash,
      aeMicroBlockObject.prevHash,
      aeMicroBlockObject.prevKeyHash,
      aeMicroBlockObject.signature,
      aeMicroBlockObject.txsHash,
      new Date(aeMicroBlockObject.time),
      aeMicroBlockObject.version,
      networkId],
    (err) => {
      if (err) {
        console.log(`Failed to insert micro block with number ${aeMicroBlockObject.height}!`, err);
      } else {
        onSucceedCallback();
        console.log(`[${networkId}] Inserted (if not yet existed) new save micro block with number ${aeMicroBlockObject.height}`);
      }
    }
  )
};

exports.saveMicroBlockTransaction = (networkId, aeTransactionObject, microBlockHash) => {
  db.pool.query(`INSERT INTO AE_TRANSACTION(HASH, MICRO_BLOCK_HASH, BLOCK_HEIGHT, AMOUNT, DEPOSIT, CALL_DATA, CALLER_ID, OWNER_ID, CONTRACT_ID, CODE, SENDER_ID, RECIPIENT_ID, FEE, GAS, GAS_PRICE, TYPE, VERSION, NONCE, VM_VERSION, NETWORK_ID) 
              VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) ON CONFLICT DO NOTHING`,
    [aeTransactionObject.hash,
      microBlockHash,
      aeTransactionObject.blockHeight,
      aeTransactionObject.tx.amount,
      aeTransactionObject.tx.deposit,
      aeTransactionObject.tx.callData !== undefined ? aeTransactionObject.tx.callData : null,
      aeTransactionObject.tx.callerId !== undefined ? aeTransactionObject.tx.callerId : null,
      aeTransactionObject.tx.ownerId !== undefined ? aeTransactionObject.tx.ownerId : null,
      aeTransactionObject.tx.contractId !== undefined ? aeTransactionObject.tx.contractId : null,
      aeTransactionObject.tx.code !== undefined ? aeTransactionObject.tx.code : null,
      aeTransactionObject.tx.senderId !== undefined ? aeTransactionObject.tx.senderId : null,
      aeTransactionObject.tx.recipientId !== undefined ? aeTransactionObject.tx.recipientId : null,
      aeTransactionObject.tx.fee,
      aeTransactionObject.tx.gas,
      aeTransactionObject.tx.gasPrice,
      aeTransactionObject.tx.type,
      aeTransactionObject.tx.version,
      aeTransactionObject.tx.nonce,
      aeTransactionObject.tx.vmVersion,
      networkId],
    (err) => {
      if (err) {
        console.log(`Failed to insert transaction with hash ${aeTransactionObject.hash}!`, err);
      } else {
        console.log(`[${networkId}] Inserted (if not yet existed) new transaction with hash ${aeTransactionObject.hash}`);
      }
    }
  )
};