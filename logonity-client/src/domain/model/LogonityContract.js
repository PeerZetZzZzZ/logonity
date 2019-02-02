/*eslint-disable*/
export default 'contract Logonity =  \n' +
'  record logoProposal = {  \n' +
'     author: address,  \n' +
'     logoUuidHash: string }  \n' +
'       \n' +
'  record state = {  \n' +
'    commissionUuidHash: string,  \n' +
'    principal: address,  \n' +
'    logoDescription: string,  \n' +
'    submittedProposals: list(logoProposal), \n' +
'    wonLogoUuid: string}  \n' +
'  \n' +
'  public function init(commissionUuidHash: string, logoDescription: string) : state =   \n' +
'    { commissionUuidHash = commissionUuidHash,  \n' +
'      principal = Call.origin,  \n' +
'      logoDescription = logoDescription,  \n' +
'      submittedProposals = [], \n' +
'      wonLogoUuid = ""}  \n' +
'      \n' +
'  public stateful function submitProposal(logoUuidHash2: string) =  \n' +
'    put(state{submittedProposals = {author = Call.origin, logoUuidHash = logoUuidHash2}::state.submittedProposals})  \n' +
'    \n' +
'  public stateful function chooseWonLogo(wonLogoUuidHash:string) =  \n' +
'    if (Call.origin == state.principal) \n' +
'      chooseLogoFromSubmittedOrSendRewardBackToPrincipal(wonLogoUuidHash) \n' +
'    else  \n' +
'      abort("Only principal can choose the won logo!")  \n' +
'   \n' +
'  private stateful function chooseLogoFromSubmittedOrSendRewardBackToPrincipal(wonLogoUuidHash: string) = \n' +
'    if (length(state.submittedProposals) == 0)  \n' +
'      sendReward(state.principal) \n' +
'    else \n' +
'       switch(findTheLogo(state.submittedProposals, wonLogoUuidHash)) \n' +
'        [] => \n' +
'          sendRewardToFirstSubmittedProposal() \n' +
'        head::tail => \n' +
'          put(state{wonLogoUuid = wonLogoUuidHash})  \n' +
'          sendReward(head.author) \n' +
'   \n' +
'  private stateful function sendRewardToFirstSubmittedProposal() = \n' +
'    switch (state.submittedProposals) \n' +
'      [] => () \n' +
'      head::tail => \n' +
'        put(state{wonLogoUuid = head.logoUuidHash})\n' +
'        sendReward(head.author) \n' +
'   \n' +
'  private function findTheLogo(submittedProposals: list(logoProposal), wonLogoUuidHash: string) :list(logoProposal) =  \n' +
'     switch(submittedProposals)  \n' +
'       [] => []  \n' +
'       head::tail =>  \n' +
'         if(head.logoUuidHash == wonLogoUuidHash)  \n' +
'           head::[]  \n' +
'         else  \n' +
'           findTheLogo(tail, wonLogoUuidHash)  \n' +
'    \n' +
'  private function sendReward(recipient:address) =  \n' +
'    Chain.spend(recipient, Contract.balance)  \n' +
'   \n' +
'  private function length(l : list(\'a)) : int = length\'(l, 0) \n' +
' \n' +
'  private function length\'(l : list(\'a), x : int) : int = \n' +
'      switch(l) \n' +
'         [] => x \n' +
'         head::tail => length\'(tail, x + 1) \n' +
'   \n' +
'  public function getPrincipalAddress(): address = state.principal  \n' +
'  public function getLogoDescription(): string = state.logoDescription  \n' +
'  public function getSubmittedProposals(): int = length(state.submittedProposals)  \n' +
'  public function getState() = state  \n' +
'  public function getReward(): int = Contract.balance\n'
