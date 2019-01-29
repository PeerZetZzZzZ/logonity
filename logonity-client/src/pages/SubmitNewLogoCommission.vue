<template>
  <q-page padding>
    <div class="row justify-center items-end">
      <div class="column">
        <div class="q-display-3 text-center">
          Submit logo commission
        </div>
        <div class="q-display-1 text-center">
          Describe desired logo and provide reward.
        </div>
      </div>
    </div>
    <br>
    <br>
    <div class="row justify-end">
      <div class="column">
        <p><b>Available balance: </b>{{availableBalance}} Ae</p>
        <p><b>Balance after: </b>{{balanceAfter}} Ae</p>

      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-field
          label="Pub key"
          helper="Your Aeternity public key.">
          <q-input v-model="pubKey" />
        </q-field>
        <q-item-separator></q-item-separator>
        <q-field
          label="Private key"
          helper="Your Aeternity account private key - don't worry this information will not leave outside your browser.">
          <q-input type="password" v-model="privKey" />
        </q-field>
        <q-item-separator></q-item-separator>
        <q-field
          label="The logo description"
          helper="Logo description"
          error-label="We need a valid email"
          :count="300">
          <q-input v-model="logoDescription" />
        </q-field>
        <q-item-separator v-show="availableBalance !== null"></q-item-separator>
        <q-field
          v-show="availableBalance !== null"
          error-label="The value is too big or is not integer."
          :error="balanceAfter < 0 || !Number.isInteger(Number(reward))"
          label="Reward (Ae tokens)"
          helper="Reward for the logo creation. Must be integer Ae tokens number.">
          <q-input suffix="Ae tokens" v-model="reward" />
        </q-field>
        <q-item-separator></q-item-separator>
      </div>
    </div>
    <br>
    <div class="row justify-center">
      <div class="column">
        <q-btn
          :disabled="
          balanceAfter < 0 ||
          !Number.isInteger(Number(reward)) ||
          logoDescription.trim() === ''"
          @click="createSubmission"
          label="Upload submission"
          color="primary"/>
      </div>
    </div>

  </q-page>
</template>

<script>
/* eslint-disable */
import Ae from '@aeternity/aepp-sdk/es/ae/universal' // or any other flavor
import MemoryAccount from '@aeternity/aepp-sdk/es/account/memory'
import LogonityContractCode from '../domain/model/LogonityContract';
import Mixin from '../mixins/global-mixin';

export default {
  name: 'SubmitNewLogoCommission',
  data() {
    return {
      logoDescription: '',
      pubKey: 'ak_2igXQ7pQgH5YDv4zP9ciq1R3qW8pNaGgywqYnwRPrBhKhYxgeG',
      privKey: '02a9f1e976b83b5cdf34279e9068fc7f352a5b49144fd96e7546390ff20a7a14e256c3ecea141842c37f9686fa0558faf71388dc473f5d69891d9ea2ee2cb671',
      reward: null,
      availableBalance: 0,
      ae: null,
    }
  },
  computed: {
    balanceAfter() {
      return Number(this.availableBalance) - this.reward;
    },
  },
  mixins: [Mixin],
  watch: {
    pubKey() {
      console.log('this', this.pubKey !== null && this.pubKey !== '');
      if (this.pubKey !== null && this.pubKey !== '') {
        this.get(`https://sdk-testnet.aepps.com/v2/accounts/${this.pubKey}`).subscribe((res) => {
          this.availableBalance = this.toAeFromAettos(res.data.balance);
        })
      }
    },
  },
  methods: {
    showCommissionCreatedDialog(contractAddress) {
      this.$q.dialog({
        title: 'Commission created!',
        message: `Your commission has been uploaded to the network. Contract address: ${contractAddress}`
      });
    },
    showCommissionFailedDialog(contractAddress) {
      this.$q.dialog({
        title: 'Commission creation failed!',
        message: `Your commission has been uploaded to the network. Contract address: ${contractAddress}`
      });
    },
    showIsNotIntegerDialog(value) {
      this.$q.dialog({
        title: 'Given reward is not integer value!',
        message: `The reward ${value} Ae must be integer. Please fix it.`
      });
    },
    createSubmission() {
      if (!Number.isInteger(Number(this.reward))) {
        this.showIsNotIntegerDialog(this.reward);
      } else {
        this.get('/api/createCommission').subscribe((res) => {
          Ae({
            debug: true,
            url: 'https://sdk-testnet.aepps.com',
            internalUrl: 'https://sdk-testnet.aepps.com',
            accounts: [
              MemoryAccount({keypair: {secretKey: this.privKey, publicKey: this.pubKey}})
            ],
          }).then(ae => {
            this.ae = ae;
            return ae.contractCompile(LogonityContractCode);
          }).then(bytecode => {
            return bytecode.deploy({initState: `("${res.data.id}", "${this.logoDescription}")`, options: { amount: this.toAeInt(this.reward) }});
          }).then(deployed => {
            this.post('/api/updateCreatedCommission', {
              contractAddress: deployed.address,
              logoDescription: this.logoDescription,
              transactionHash: deployed.transaction,
              id: res.data.id
            }).subscribe((res) => {
              this.showCommissionCreatedDialog(deployed.address);
            }, (err) => {
              this.showCommissionFailedDialog(deployed.address);
            });
            console.log(`Contract deployed at ${JSON.stringify(deployed)}`);

          });
        })
      }
    }
  }
}
</script>

<style>
</style>