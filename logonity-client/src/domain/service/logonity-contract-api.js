/*eslint-disable*/
export const getReward = async (ae, contractAddress, callback) => {
  const rewardResult = await ae.contractCallStatic(contractAddress, 'sophia-address', 'getReward');
  const decodeResult = await ae.contractDecodeData('int', rewardResult.result);
  callback(decodeResult.value);
};

export const submitProposal = (ae, contractAddress, logoUuidHash, callback, failureCallback) => {
  ae.contractCall(contractAddress, 'sophia-address', contractAddress, 'submitProposal', {args: `("${logoUuidHash}")`})
    .then(result => {
      console.log('Submit proposal uploaded', result);
      callback();
    }, err => {
      failureCallback(err);
    });
};


export const chooseLogo = (ae, contractAddress, logoProposalUuidHash, callback, failureCallback) => {
  ae.contractCall(contractAddress, 'sophia-address', contractAddress, 'chooseWonLogo', {args: `("${logoProposalUuidHash}")`})
    .then(result => {
      console.log('Logo chosen!', result);
      callback();
    }, err => {
      failureCallback(err);
    });
};
