<template>
  <q-page padding>
    <q-tabs>
      <q-tab slot="title" icon="keyboard_backspace" label="Back"
             @click="$router.push('/')"/>
      <q-tab default slot="title" name="tab-1" icon="info" label="Commission info"/>
      <q-tab :count="currentProposals" slot="title" name="tab-2"
             icon="account_box" label="Current proposals"/>
      <q-tab slot="title" name="tab-3" icon="add" label="Submit logo" />
      <q-tab-pane name="tab-1">
        <div class="row justify-center items-end">
          <div class="col-12">
            <div class="q-display-3 text-center">
              Commission info
            </div>
          </div>
        </div>
        <div class="row justify-center items-end">
          <div class="col-12">
            <commission-info-card
              v-if="commissionInfo !== null"
              :reward="reward"
              :commissionInfo="commissionInfo">
            </commission-info-card>
          </div>
        </div>
      </q-tab-pane>
      <q-tab-pane name="tab-2">
        <div class="row justify-center items-end">
          <div class="col-12">
            <div class="q-display-3 text-center">
              Current proposals
            </div>
          </div>
        </div>
        <div class="row justify-center items-end">
          <div class="col-12">
            <logo-carousel v-if="commissionInfo !== null"
                           :logoProposals="commissionInfo.logoProposals">
            </logo-carousel>
          </div>
        </div>
      </q-tab-pane>
      <q-tab-pane name="tab-3">
        <div class="row justify-center items-end">
          <div class="col-12">
            <div class="q-display-3 text-center">
              Upload logo
            </div>
            <div class="q-display-1 text-center">
              Upload the logo file (allowed formats <b>.jpg, .jpeg, .png</b>).
            </div>
          </div>
        </div>
        <div class="row justify-center items-end" v-if="commissionInfo !== null">
          <div class="col-12">
            <upload-logo-form :commission-id="$route.params.commissionId"
                              :contract-address="commissionInfo.contract_address">
            </upload-logo-form>
          </div>
        </div>
      </q-tab-pane>
    </q-tabs>

  </q-page>
</template>

<script>
import Mixin from '../mixins/global-mixin';
import CommissionInfoCard from '../components/CommissionInfoCard';
import LogoCarousel from '../components/LogoCarousel';
import UploadLogoForm from '../components/UploadLogoForm';
import { getReward } from '../domain/service/logonity-contract-api';

export default {
  name: 'logo-info',
  components: { UploadLogoForm, LogoCarousel, CommissionInfoCard },
  mixins: [Mixin],
  data() {
    return {
      commissionInfo: null,
      reward: 'Loading...',
      currentProposals: '0',
    };
  },
  mounted() {
    this.get(`/api/getCommissionInfo/${this.$route.params.commissionId}`).subscribe((res) => {
      this.commissionInfo = res.data;
      this.currentProposals = String(res.data.logoProposals.length);
      console.log(res.data);
      this.getAe(null, (ae) => {
        getReward(ae, this.commissionInfo.contract_address, (reward) => {
          this.reward = this.toAeFromAettos(reward);
        });
      });
    });
  },
};
</script>

<style>
</style>
