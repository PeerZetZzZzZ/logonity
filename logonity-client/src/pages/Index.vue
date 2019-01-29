<template>
  <q-page>
    <div class="row justify-center items-end">
      <div class="column">
        <img src="../assets/activeLogoCommissions2.png">
      </div>
    </div>
    <q-list highlight color="primary" separator v-show="activeCommissions.length !== 0">
      <q-list-header class="secondaryColor">Current logo commissions</q-list-header>
        <q-item v-for="activeCommission in activeCommissions" :key="activeCommission.id">
          <q-item-main class="primaryColor">
            <q-item-tile><span class="secondaryColor"><b>Commission description: </b></span> <span class="primaryColor"><b>{{activeCommission.logo_description}}</b></span></q-item-tile> <br>
            <span class="secondaryColor">Contract address: </span> <span class="primaryColor">{{activeCommission.contract_address}}</span><br>
            <span class="secondaryColor">Creation date: </span> <span class="primaryColor">{{activeCommission.creation_time}}</span> <br>
            <span class="secondaryColor">Transaction: </span> <span class="primaryColor">{{activeCommission.transaction_hash}}</span> <br>
            <span class="secondaryColor">Reward: </span> <span class="primaryColor">{{toAeFromAettos(activeCommission.reward)}} Ae</span>
          </q-item-main>
          <q-btn color="primary" label="Submit logo" to="/submitNewLogo"></q-btn>
        </q-item>
    </q-list>
    <div class="row justify-center" v-show="activeCommissions.length === 0">
      <div class="column">
        <q-spinner-audio color="secondary" :size="76"/>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
/*eslint-disable */
import MemoryAccount from '@aeternity/aepp-sdk/es/account/memory'
import Ae from '@aeternity/aepp-sdk/es/ae/universal' // or any other flavor

import Mixin from '../mixins/global-mixin'
export default {
  name: 'PageIndex',
  mixins: [Mixin],
  data() {
    return {
      activeCommissions: [],
    };
  },
  mounted() {
    this.get('/api/activeCommissions').subscribe((res) => {
      Ae({
        debug: true,
        url: 'https://sdk-testnet.aepps.com',
        internalUrl: 'https://sdk-testnet.aepps.com',
      }).then(ae => {
        res.data.forEach(activeCommission => {
          ae.contractCallStatic(activeCommission.contract_address, 'sophia-address', 'getReward')
            .then(result => {
              ae.contractDecodeData('int', result.result).then(res => {
                activeCommission.reward = res.value;
                this.activeCommissions.push(activeCommission);
              });
            });
        });
        // const result = await ae.contractCallStatic(activeCommission.contract_address, 'sophia-address', 'getReward');
        // console.log('Mam ten result: ', ae.contractDecodeData('string', result.result).then(res => console.log('Tadam:', res)));
        // getting the balance of a public address
        // ae.balance(this.pubKey).then(balance => {
        //   // logs current balance of "A_PUB_ADDRESS"
        //   console.log('balance', balance)
        // }).catch(e => {
        //   // logs error
        //   console.log(e)
        // })
      });
    });

  }
}
</script>
