<template>
  <q-page padding>
    <q-tabs>
      <!-- Tabs - notice slot="title" -->
      <q-tab slot="title" icon="keyboard_backspace" label="Back"
             @click="$router.push('/')"/>
      <q-tab default slot="title" name="tab-1" icon="info" label="Commission info"/>
      <q-tab count="5" slot="title" name="tab-2" icon="account_box" label="Current proposals"/>
      <q-tab slot="title" name="tab-3" icon="add" label="Submit logo" />

      <!-- Targets -->
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
              :commissionId="$route.params.commissionId">
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
            <logo-carousel></logo-carousel>
          </div>
        </div>
      </q-tab-pane>
      <q-tab-pane name="tab-3">
        <div class="row justify-center items-end">
          <div class="col-12">
            <div class="q-display-3 text-center">
              Upload logo
            </div>
          </div>
        </div>
        <div class="row justify-center items-end">
          <div class="col-12">
            <upload-logo-form></upload-logo-form>
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

export default {
  name: 'logo-info',
  components: { UploadLogoForm, LogoCarousel, CommissionInfoCard },
  mixins: [Mixin],
};
</script>

<style>
</style>
