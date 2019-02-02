<template>
  <q-page padding>
    <div class="row justify-center items-end">
      <div class="column">
        <div class="q-display-3 text-center">
          Submit your logo
        </div>
      </div>
    </div>
    <br>
    <div class="row justify-center items-end">
      <div class="col-6">
        <commission-info-card :commission-id="$route.params.commissionId"></commission-info-card>
      </div>
      <div class="col-6">
        <div class="q-display-1 text-center">
          Upload the logo file (allowed formats <b>.jpg, .jpeg, .png</b>).
        </div>
        <upload-logo-form></upload-logo-form>
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
import Mixin from '../mixins/global-mixin';
import CommissionInfoCard from '../components/CommissionInfoCard';
import UploadLogoForm from '../components/UploadLogoForm';

export default {
  name: 'SubmitNewLogo',
  components: {UploadLogoForm, CommissionInfoCard},
  data() {
    return {
      logoDescription: '',
      pubKey: 'ak_2igXQ7pQgH5YDv4zP9ciq1R3qW8pNaGgywqYnwRPrBhKhYxgeG',
      privKey: '02a9f1e976b83b5cdf34279e9068fc7f352a5b49144fd96e7546390ff20a7a14e256c3ecea141842c37f9686fa0558faf71388dc473f5d69891d9ea2ee2cb671',
    }
  },
  mixins: [Mixin],

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
      //     MemoryAccount({
      //       keypair: {
      //         publicKey: 'ak_2paxkmqp5wgAc76oxsR6UDLwk4tscTSfMpoNtYyGMZrkX74bdC',
      //         secretKey: '79b92dc302df1ab4d394573d9dc26b01f49391d0580eff3b54f61dac7b14c6c7efbeb0b66ed5bc063b20ed3fdac729a4d9569aef7b55cfe923588e93fa34a5d9'
      //       }
      //     })
      //   ],
      // }).then(ae => {
      //   ae.contractCall(this.$route.params.commissionId, 'sophia-address', this.$route.params.commissionId, 'submitProposal', {args: '("asdf")'})
      //     .then(result => {
      //       console.log('udalo sie', result);
      //     });
      // });
    }
  }
}
</script>

<style>
</style>
