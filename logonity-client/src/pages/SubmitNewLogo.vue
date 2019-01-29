<template>
  <q-page padding>
    <div class="row justify-center items-end">
      <div class="column">
        <div class="q-display-3 text-center">
          Submit your logo
        </div>
        <div class="q-display-1 text-center">
          Upload the logo file (allowed formats <b>.jpg, .jpeg, .png</b>).
        </div>
      </div>
    </div>
    <br>
    <br>
    <q-field label="Logo file">
      <q-uploader color="primary" name="foo" url="/api/upload" extensions=".jpg, .jpeg, .png" hide-upload-button="true" auto-expand="true" ref="uploader" @uploaded="uploaded" :additional-fields="additionalFields"/>
    </q-field>
    <q-item-separator></q-item-separator>
    <q-field
      label="The logo description"
      helper="Logo description"
      error-label="We need a valid email"
      :count="100">
      <q-input v-model="logoDescription" />
    </q-field>
    <q-item-separator></q-item-separator>
    <q-field
      label="Pub key"
      helper="Your Aeternity account public key.">
      <q-input v-model="pubKey" />
    </q-field>
    <q-item-separator></q-item-separator>
    <q-field
      label="Private key"
      helper="Your Aeternity account private key - don't worry this information will not leave outside your browser.">
      <q-input type="password" v-model="privKey" />
    </q-field>
    <q-item-separator></q-item-separator>
    <div class="row justify-center items-end">
      <div class="column">
        <q-btn
          @click="submitLogo"
          label="Submit"
          color="primary"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
/* eslint-disable */
import Contract from '@aeternity/aepp-sdk/es/ae/contract'
import * as Crypto from '@aeternity/aepp-sdk/es/utils/crypto'
import Ae from '@aeternity/aepp-sdk/es/ae/universal' // or any other flavor
import MemoryAccount from '@aeternity/aepp-sdk/es/account/memory'
import LogonityContractCode from '../domain/model/LogonityContract';
import LogonityContractAbi from '../domain/model/LogonityContractAbi';
import Mixin from '../mixins/global-mixin';

export default {
  name: 'SubmitNewLogo',
  data() {
    return {
      logoDescription: '',
      pubKey: 'ak_2igXQ7pQgH5YDv4zP9ciq1R3qW8pNaGgywqYnwRPrBhKhYxgeG',
      privKey: '02a9f1e976b83b5cdf34279e9068fc7f352a5b49144fd96e7546390ff20a7a14e256c3ecea141842c37f9686fa0558faf71388dc473f5d69891d9ea2ee2cb671',
    }
  },
  mixins: [Mixin],
  computed: {
    additionalFields() {
      return [
        {
          name: 'description',
          value: 'Kon rafal wspolbieznia przyjaźni',
        },
        {
          name: 'jazda',
          value: 'prosto w dupe',
        }
      ]
    },
  },
  mounted() {

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
    uploaded(file, xhr) {
      console.log('jasna pinda', file);
    },
    submitLogo() {
      console.log(this.$refs.uploader.upload());
      // Ae({
      //   debug: true,
      //   url: 'https://sdk-testnet.aepps.com',
      //   internalUrl: 'https://sdk-testnet.aepps.com',
      //   accounts: [
      //     MemoryAccount({keypair: {secretKey: this.privKey, publicKey: this.pubKey}})
      //   ],
      // }).then(ae => {
      //   this.ae = ae;
      //   return ae.contractCompile(LogonityContractCode);
      // }).then(bytecode => {
      //   return bytecode.deploy({initState: `("${res.data.id}", "${this.logoDescription}")`, options: { amount: this.toAeInt(this.reward) }});
      // }).then(deployed => {
      //   this.post('/api/updateCreatedCommission', {
      //     contractAddress: deployed.address,
      //     logoDescription: this.logoDescription,
      //     transactionHash: deployed.transaction,
      //     id: res.data.id
      //   }).subscribe((res) => {
      //     this.showCommissionCreatedDialog(deployed.address);
      //   }, (err) => {
      //     this.showCommissionFailedDialog(deployed.address);
      //   });
      //   console.log(`Contract deployed at ${JSON.stringify(deployed)}`);
      //
      // });
    }
  }
}
</script>

<style>
</style>
