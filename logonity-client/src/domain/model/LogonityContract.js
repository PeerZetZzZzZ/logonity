export default 'contract Logonity =\n' +
'  record logoProposal = {\n' +
'     author: address,\n' +
'     logoUuidHash: string }\n' +
'     \n' +
'  record state = {\n' +
'    commissionUuidHash: string,\n' +
'    principal: address,\n' +
'    logoDescription: string,\n' +
'    submittedProposals: list(logoProposal) }\n' +
'\n' +
'  public function init(commissionUuidHash: string, logoDescription: string) : state = \n' +
'    { commissionUuidHash = commissionUuidHash,\n' +
'      principal = Call.caller,\n' +
'      logoDescription = logoDescription,\n' +
'      submittedProposals = [] }\n' +
'    \n' +
'  public stateful function submitProposal(logoUuidHash: string) =\n' +
'    put(state{submittedProposals = {author = Call.caller, logoUuidHash = logoUuidHash}::state.submittedProposals})\n' +
'  \n' +
'  public stateful function chooseWinningLogo(winningLogoUuidHash:string) =\n' +
'    if (Call.caller == state.principal)\n' +
'      switch(findTheLogo(state.submittedProposals, winningLogoUuidHash))\n' +
'        [] => sendReward(state.principal)\n' +
'        head::tail => sendReward(head.author)\n' +
'    else\n' +
'      abort("Only principal can choose the winning logo!")\n' +
'      \n' +
'  private function findTheLogo(submittedProposals: list(logoProposal), winningLogoUuidHash: string) :list(logoProposal) =\n' +
'     switch(submittedProposals)\n' +
'       [] => []\n' +
'       head::tail =>\n' +
'         if(head.logoUuidHash == winningLogoUuidHash)\n' +
'           head::[]\n' +
'         else\n' +
'           findTheLogo(tail, winningLogoUuidHash)\n' +
'  \n' +
'  private function sendReward(recipient:address) =\n' +
'    Chain.spend(state.principal, Contract.balance)\n' +
'    \n' +
'  public function getPrincipalAddress(): address = state.principal\n' +
'  public function getLogoDescription(): string = state.logoDescription\n' +
'  public function getSubmittedProposals(): list(logoProposal) = state.submittedProposals\n' +
'  public function getState() = state\n' +
'  public function getReward(): int = Contract.balance\n'
