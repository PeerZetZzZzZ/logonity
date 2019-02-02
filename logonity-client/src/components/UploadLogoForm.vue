<template>
  <q-card>
    <q-card-main>

    <q-field label="Logo file">
      <q-uploader
        color="primary"
        name="foo"
        url="/api/upload"
        extensions=".jpg, .jpeg, .png"
        hide-upload-button="true"
        auto-expand="true"
        ref="uploader"
        @uploaded="uploaded"
        :additional-fields="additionalFields"/>
    </q-field>
    <q-item-separator></q-item-separator>
    <q-field
      label="Comment"
      helper="Provide optional comment to the uploaded logo."
      :count="200">
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
      helper="Your Aeternity account private key -
      don't worry this information will not leave outside your browser.">
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
    </q-card-main>
  </q-card>
</template>
<script>
export default {
  name: 'upload-logo-form',
  computed: {
    additionalFields() {
      return [
        {
          name: 'commissionId',
          value: 'Kon rafal wspolbieznia przyjaźni',
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
};
</script>
