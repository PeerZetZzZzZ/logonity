<template>
  <q-page>
    <div class="row justify-center items-end">
      <div class="column">
        <img src="../assets/activeLogoCommissions2.png">
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-list highlight color="primary" separator v-show="activeCommissions.length !== 0">
          <q-item v-for="activeCommission in activeCommissions"
                  :key="activeCommission.id"
                  :to="{ path: `/logoInfo/${activeCommission.id}`}">
            <q-item-main class="primaryColor">
              <q-item-tile>
                <span class="secondaryColor">
                  <b>Commission description: </b>
                </span>
                <span class="primaryColor">
                  <b>{{activeCommission.logo_description}}</b>
                </span>
              </q-item-tile>
              <br>
              <q-chip icon="access_time" color="primary" small square>
                Created: {{formatDate(activeCommission.creation_time)}}
              </q-chip>
            </q-item-main>
            <q-chip icon-right="attach_money" color="primary" small>
              Reward: {{activeCommission.reward}} Ae
            </q-chip>
          </q-item>
        </q-list>
      </div>
    </div>
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
import * as Crypto from '@aeternity/aepp-sdk/es/utils/crypto' // or any other flavor


import Mixin from '../mixins/global-mixin'
export default {
  name: 'PageIndex',
  mixins: [Mixin],
  data() {
    return {
      activeCommissions: [],
    };
  },
  methods: {
    goToSubmitLogo(contractAddress) {
      this.$router.push(`/submitNewLogo/${contractAddress}`);
    },
    chooseLogo(contractAddress) {
      Ae({
        debug: true,
        url: 'https://sdk-testnet.aepps.com',
        internalUrl: 'https://sdk-testnet.aepps.com',
        accounts: [
          MemoryAccount({
            keypair: {
              publicKey: 'ak_2igXQ7pQgH5YDv4zP9ciq1R3qW8pNaGgywqYnwRPrBhKhYxgeG',
              secretKey: '02a9f1e976b83b5cdf34279e9068fc7f352a5b49144fd96e7546390ff20a7a14e256c3ecea141842c37f9686fa0558faf71388dc473f5d69891d9ea2ee2cb671'
            }
          })
        ],
      }).then(ae => {
        ae.contractCall(contractAddress, 'sophia-address', contractAddress, 'chooseWonLogo', {args: '("asdf")'})
          .then(result => {
            console.log('udalo sie', result);
          });
      });
    },
  },
  mounted() {
    this.get('/api/activeCommissions').subscribe((res) => {
      this.getAe(null, (ae) => {
        res.data.forEach(activeCommission => {
          ae.contractCallStatic(activeCommission.contract_address, 'sophia-address', 'getReward')
            .then(result => {
              ae.contractDecodeData('int', result.result).then(res => {
                console.log(activeCommission.logo_description, this.toAeFromAettos(res.value));
                activeCommission.reward = this.toAeFromAettos(res.value);
                this.activeCommissions.push(activeCommission);
              });
            });
        });
      });
    });

  }
}
</script>
