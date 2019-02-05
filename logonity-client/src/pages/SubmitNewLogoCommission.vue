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
    <q-card v-if="!lockButton">
      <q-card-main>
        <proividing-keys-is-safe-message></proividing-keys-is-safe-message>

        <div class="row justify-end">
          <div class="column">
            <q-chip icon-right="attach_money" color="primary" small>
              Available balance: {{availableBalance}} Ae
            </q-chip>
            <q-chip icon-right="attach_money" color="secondary" small>
              Balance after: {{balanceAfter.toFixed(1)}} Ae
            </q-chip>
          </div>
        </div>
        <div class="row justify-center">
          <div class="col-12">
            <q-field
              label="Pub key*"
              helper="Your Aeternity public key.">
              <q-input v-model="pubKey"/>
            </q-field>
            <q-item-separator></q-item-separator>
            <q-field
              label="Private key*"
              helper="Your Aeternity account private key -
          don't worry this information will not leave outside your browser.">
              <q-input type="password" v-model="privKey"/>
            </q-field>
            <q-item-separator></q-item-separator>
            <q-field
              label="The logo description*"
              helper="Logo description"
              error-label="We need a valid email"
              :count="300">
              <q-input v-model="logoDescription"/>
            </q-field>
            <q-item-separator v-show="availableBalance !== null"></q-item-separator>
            <q-field
              v-show="availableBalance !== null"
              error-label="The value is too big or is not integer."
              :error="balanceAfter < 0 || !Number.isInteger(Number(reward))"
              label="Reward (Ae tokens)*"
              helper="Reward for the logo creation. Must be integer Ae tokens number.">
              <q-input suffix="Ae tokens" v-model="reward"/>
            </q-field>
            <q-item-separator></q-item-separator>
          </div>
        </div>
        <q-item-separator></q-item-separator>
        <span style="color: var(--colorPrimary)">* - required</span>
        <div class="row justify-center">
          <div class="column">
            <q-btn :disabled="
              balanceAfter <= 0 ||
              (!Number.isInteger(Number(reward)) || reward === null) ||
              logoDescription.trim() === '' ||
              lockButton"
              @click="createCommission"
              label="Upload commission"
              color="primary"/>
          </div>
        </div>
      </q-card-main>
    </q-card>
    <loading v-else></loading>
  </q-page>
</template>

<script>
/* eslint-disable */
import LogonityContractCode from '../domain/model/LogonityContract';
import Mixin from '../mixins/global-mixin';
import Loading from '../components/common/Loading';
import ProividingKeysIsSafeMessage from '../components/ProvidingKeysIsSafeMessage';

export default {
  name: 'SubmitNewLogoCommission',
  components: {ProividingKeysIsSafeMessage, Loading},
  data() {
    return {
      logoDescription: '',
      pubKey: '',
      privKey: '',
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
    createCommission() {
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
