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
    <q-card>
      <q-card-main>

    <div class="row justify-end">
      <div class="column">
        <q-chip icon-right="attach_money" color="primary" small>
          Available balance: {{availableBalance}} Ae
        </q-chip>
        <q-chip icon-right="attach_money" color="secondary" small>
          Balance after: {{balanceAfter}} Ae
        </q-chip>
      </div>
    </div>
    <div class="row justify-center" v-if="!lockButton">
      <div class="col-12">
        <q-field
          label="Pub key"
          helper="Your Aeternity public key.">
          <q-input v-model="pubKey" />
        </q-field>
        <q-item-separator></q-item-separator>
        <q-field
          label="Private key"
          helper="Your Aeternity account private key -
          don't worry this information will not leave outside your browser.">
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
    <loading v-else></loading>
    <br>
    <div class="row justify-center">
      <div class="column">
        <q-btn
          :disabled="
          balanceAfter <= 0 ||
          (!Number.isInteger(Number(reward)) || reward === null) ||
          logoDescription.trim() === '' ||
          lockButton"
          @click="createSubmission"
          label="Upload submission"
          color="primary"/>
      </div>
    </div>
      </q-card-main>
    </q-card>
  </q-page>
</template>

<script>
/* eslint-disable */
import LogonityContractCode from '../domain/model/LogonityContract';
import Mixin from '../mixins/global-mixin';
import Loading from '../components/common/Loading';

export default {
  name: 'SubmitNewLogoCommission',
  components: {Loading},
  data() {
    return {
      logoDescription: '',
        pubKey: 'ak_2igXQ7pQgH5YDv4zP9ciq1R3qW8pNaGgywqYnwRPrBhKhYxgeG',
      privKey: '02a9f1e976b83b5cdf34279e9068fc7f352a5b49144fd96e7546390ff20a7a14e256c3ecea141842c37f9686fa0558faf71388dc473f5d69891d9ea2ee2cb671',
      reward: null,
      availableBalance: 0,
      lockButton: false,
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
      if (this.pubKey !== null && this.pubKey !== '') {
        this.get(`https://sdk-testnet.aepps.com/v2/accounts/${this.pubKey}`).subscribe((res) => {
          this.availableBalance = this.toAeFromAettos(res.data.balance);
        })
      }
    },
  },
  methods: {
    showCommissionCreatedDialog(contractAddress) {
      this.showMessageDialog('Commission created!',
        `Your commission has been uploaded to the network. Contract address: ${contractAddress}`);
    },
    showCommissionFailedDialog() {
      this.showMessageDialog('Commission creation failed!',
        `Error occurred during commission creation.`);
    },
    showIsNotIntegerDialog(value) {
      this.showMessageDialog('Given reward is not integer value!',
        `The reward ${value} Ae must be integer. Please fix it.`);
    },
    createSubmission() {
      this.lockButton = true;
      if (!Number.isInteger(Number(this.reward))) {
        this.showIsNotIntegerDialog(this.reward);
      } else {
        this.get('/api/createCommission').subscribe((res) => {
          this.getAePromise({secretKey: this.privKey, publicKey: this.pubKey}).then((ae) => {
            return ae.contractCompile(LogonityContractCode);
          }).then(bytecode => {
            return bytecode.deploy({
              initState: `("${res.data.id}", "${this.logoDescription}")`,
              options: {amount: this.toAeInt(this.reward)}
            });
          }).then(deployed => {
            this.post('/api/updateCreatedCommission', {
              contractAddress: deployed.address,
              logoDescription: this.logoDescription,
              transactionHash: deployed.transaction,
              id: res.data.id
            }).subscribe((res2) => {
              this.showCommissionCreatedDialog(deployed.address);
              this.$router.push(`/logoInfo/${res.data.id}`);
            }, (err) => {
              this.showCommissionFailedDialog(deployed.address);
            });
            console.log(`Contract deployed at ${JSON.stringify(deployed)}`);
          });
        });
      }
    }
  }
}
</script>

<style>
</style>
