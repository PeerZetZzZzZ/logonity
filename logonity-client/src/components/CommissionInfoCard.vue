<template>
  <q-card>
    <q-card-title>
      Commission
    </q-card-title>
    <q-card-separator />
    <q-card-main>
      <q-field
        helper="Commission ID">
        <q-input readonly v-model="commissionInfo.id" />
      </q-field>
      <q-field
        helper="Smart contract address">
        <q-input readonly v-model="commissionInfo.contract_address" />
      </q-field>
      <q-field
        helper="Description">
        <q-input readonly v-model="commissionInfo.logo_description" />
      </q-field>
      <q-field
        helper="Reward (Ae)">
        <q-input readonly v-model="reward" />
      </q-field>
      <q-field
        helper="Submitted logo proposals">
        <q-input readonly v-model="commissionInfo.logoProposals.length" />
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
    commissionInfo: {
      type: Object,
      required: true,
    },
    reward: {
      type: String,
      required: true,
    },
  },
};
</script>
