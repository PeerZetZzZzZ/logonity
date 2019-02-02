<template>
  <q-card>
    <q-card-title>
      Commission
    </q-card-title>
    <q-card-separator />
    <q-card-main>
      <q-field
        helper="Commission ID">
        <q-input readonly v-model="this.$route.params.commissionId" />
      </q-field>
      <q-field
        helper="Smart contract address">
        <q-input readonly v-model="contractAddress" />
      </q-field>
      <q-field
        helper="Description">
        <q-input readonly v-model="logoDescription" />
      </q-field>
      <q-field
        helper="Reward (Ae)">
        <q-input readonly v-model="logoDescription" />
      </q-field>
      <q-field
        helper="Submitted logo proposals">
        <q-input readonly v-model="submittedLogoProposalsLength" />
      </q-field>
      <q-btn
        icon="add"
        style="margin: 2%"
        :to="{ path: `/submitNewLogo/${$route.params.commissionId}`}"
        label="Submit logo"
        color="primary">
      </q-btn>
    </q-card-main>
  </q-card>
</template>
<script>
export default {
  name: 'commission-info-card',
  props: {
    commissionId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      logoDescription: '',
      contractAddress: '',
      reward: 0,
      submittedLogoProposalsLength: 0,
    };
  },
  mounted() {
    this.get(`/api/getCommissionInfo/${this.$route.params.commissionId}`).subscribe((res) => {
      this.logoDescription = res.data.logo_description;
      this.contractAddress = res.data.contract_address;
      this.submittedLogoProposalsLength = res.data.logoProposals.length;
    });
  },
};
</script>
