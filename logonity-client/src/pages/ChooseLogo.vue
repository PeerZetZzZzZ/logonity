<template>
  <q-page padding>
    <div class="row justify-center items-end">
      <div class="column">
        <div class="q-display-3 text-center">
          Choose logo
        </div>
        <div class="q-display-1 text-center">
          Close the commission and download the logo.
        </div>
      </div>
    </div>
    <br>
    <br>
    <q-card>
      <q-card-main v-if="proposalInfo !== null && commissionInfo !== null">
        <div class="row justify-end items-end">
          <div class="col-12">
            <q-carousel color="white" height="100%">
              <q-carousel-slide style="margin: 0;padding: 0">
                <div class="row justify-center items-end">
                  <div class="column">
                    <q-card-media>
                      <img :src="imageSrc"
                           v-if="imageSrc !== null"
                           style="height: 250px; width: 250px;">
                    </q-card-media>
                  </div>
                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </div>
        <br>
        <q-item-separator></q-item-separator>
        <br>
        <div class="row justify-end items-end">
          <div class="col-12">
            <q-field
              label="Logo proposal comment">
              <q-input readonly v-model="this.proposalInfo.logo_comment"/>
            </q-field>
            <q-item-separator></q-item-separator>
            <q-field
              label="Commission description">
              <q-input readonly v-model="commissionInfo.logo_description"/>
            </q-field>
            <q-item-separator></q-item-separator>
            <q-field
              label="Contract address">
              <q-input readonly v-model="commissionInfo.contract_address"/>
            </q-field>
            <q-item-separator></q-item-separator>
            <q-field
              label="Pub key"
              helper="Your Aeternity account public key.">
              <q-input v-model="pubKey"/>
            </q-field>
            <q-item-separator></q-item-separator>
            <q-field
              label="Private key"
              helper="Your Aeternity account private key - don't worry
          this information will not leave outside your browser.">
              <q-input type="password" v-model="privKey"/>
            </q-field>
          </div>
        </div>
        <br>
        <div class="row justify-center items-end">
          <div class="column">
            <q-btn
              @click="chooseLogo"
              label="Submit"
              color="primary"
              :disabled="buttonLocked"
            />
          </div>
        </div>
      </q-card-main>
    </q-card>
  </q-page>
</template>
<script>

import { chooseLogo } from '../domain/service/logonity-contract-api';

export default {
  name: 'choose-logo',
  data() {
    return {
      buttonLocked: false,
      proposalInfo: null,
      commissionInfo: null,
      imageSrc: null,
      pubKey: '',
      privKey: '',
    };
  },
  mounted() {
    this.get(`/api/getProposalInfo/${this.$route.params.proposalId}`).subscribe((res) => {
      this.proposalInfo = res.data;
      this.get(`/api/getCommissionInfo/${res.data.logo_commission_id}`).subscribe((res2) => {
        this.commissionInfo = res2.data;
      });
      this.get(`/api/picture64/${res.data.picture_name}`).subscribe((res3) => {
        this.imageSrc = `data:image/png;base64, ${res3.data}`;
      });
    });
  },
  methods: {
    chooseLogo() {
      this.buttonLocked = true;
      this.getAe({ publicKey: this.pubKey, secretKey: this.privKey }, (ae) => {
        chooseLogo(ae, this.commissionInfo.contract_address, this.$route.params.proposalId, () => {
          this.get(`/api/deactivateCommission/${this.commissionInfo.id}/${this.$route.params.proposalId}`).subscribe((res) => {
            this.get(`/api/picture/${res.data.picture_name}`);
            this.showChoosenLogoDialog();
          }, (err) => {
            console.log(err);
            this.showChoosingLogoFailedDialog();
          });
        }, (err) => {
          console.log(err);
          this.showChoosingLogoFailedDialog();
        });
      });
    },
    showChoosenLogoDialog() {
      this.showMessageDialog('Logo has been chosen!',
        'The chosen logo has been downloaded. Closing the commission.');
    },
    showChoosingLogoFailedDialog() {
      this.showMessageDialog('Choosing logo failed!',
        'Error occurred during choosing logo.');
    },
  },
};
</script>
