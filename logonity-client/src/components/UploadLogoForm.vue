<template>
  <q-card>
    <q-card-main v-show="!lockButton && !uploaded">
      <q-field label="Logo file*">
        <q-uploader
          color="primary"
          name="foo"
          url="/api/upload"
          extensions=".jpg, .jpeg, .png"
          hide-upload-button
          auto-expand
          ref="uploader"
          @uploaded="fileUploaded"
          @add="filesAdded"
          :additional-fields="additionalFields"/>
      </q-field>
      <q-item-separator></q-item-separator>
      <q-field
        label="Comment"
        helper="Provide optional comment to the uploaded logo."
        :count="100">
        <q-input maxlength="100" v-model="logoComment"/>
      </q-field>
      <q-item-separator></q-item-separator>
      <q-field
        label="Pub key*"
        helper="Your Aeternity account public key.">
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
      <span style="color: var(--colorPrimary)">* - required</span>
      <div class="row justify-center items-end">
        <div class="column">
          <q-btn
            @click="submitLogo"
            label="Submit"
            color="primary"
            :disabled="
              !fileAdded ||
              lockButton
            "
          />
        </div>
      </div>
    </q-card-main>
    <loading v-show="lockButton && !uploaded"></loading>
    <info v-if="uploaded" text="Your proposal has been uploaded."></info>
  </q-card>
</template>
<script>
/*eslint-disable*/
import { submitProposal } from '../domain/service/logonity-contract-api';
import Loading from './common/Loading';
import Info from './common/Info';

export default {
  name: 'upload-logo-form',
  components: { Info, Loading },
  props: {
    commissionId: {
      type: String,
      required: true,
    },
    contractAddress: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      uploaded: false,
      fileAdded: false,
      lockButton: false,
      logoComment: '',
      pubKey: 'ak_2paxkmqp5wgAc76oxsR6UDLwk4tscTSfMpoNtYyGMZrkX74bdC',
      privKey: '79b92dc302df1ab4d394573d9dc26b01f49391d0580eff3b54f61dac7b14c6c7efbeb0b66ed5bc063b20ed3fdac729a' +
        '4d9569aef7b55cfe923588e93fa34a5d9',
    };
  },
  computed: {
    additionalFields() {
      return [
        {
          name: 'commissionId',
          value: this.commissionId,
        },
        {
          name: 'logoComment',
          value: '',
        },
        {
          name: 'fileName',
          value: '',
        },
      ];
    },
  },
  methods: {
    submitLogo() {
      this.lockButton = true;
      const additionalFieldsLogoComment = this.additionalFields.filter(val => val.name === 'logoComment')[0];
      additionalFieldsLogoComment.value = this.logoComment.trim();
      this.$refs.uploader.upload();
    },
    filesAdded(files) {
      const additionalFieldsLogoComment = this.additionalFields.filter(val => val.name === 'fileName')[0];
      additionalFieldsLogoComment.value = files[0].name;
      this.fileAdded = true;
    },
    fileUploaded(f, res) {
      this.logoProposalIdHash = res.response;
      this.getAe({publicKey: this.pubKey, secretKey: this.privKey}, (ae) => {
        submitProposal(ae, this.contractAddress, this.logoProposalIdHash, () => {
          this.uploaded = true;
          this.showLogoProposalUploaded();
        }, (err) => {
          console.log(err);
          this.showLogoProposalUploadFailed();
        });
      });
    },
    showLogoProposalUploaded() {
      this.showMessageDialog('Logo proposal uploaded!', 'Your logo proposal has been uploaded to the network.');
    },
    showLogoProposalUploadFailed() {
      this.showMessageDialog('Logo proposal upload failed!', 'Error occurred during uploading the logo');
    },
  },
};
</script>
