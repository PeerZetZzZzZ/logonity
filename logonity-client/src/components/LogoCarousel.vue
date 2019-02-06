<template>
  <q-card>
    <q-card-main>
      <q-carousel color="white" arrows height="100%" autoplay v-if="logoProposals.length > 0">
        <q-carousel-slide style="margin: 0; padding: 0"
                          v-for="logoProposal in logoProposals"
                          :key="logoProposal.id">
          <div class="row justify-center items-end">
            <div class="column">
              <q-card-media>
                <div class="outerImageContainer" >
                  <div class="innerImageContainer">
                    <img :src="logoProposal.imageSrc"
                         v-if="logoProposal.imageSrc !== undefined"
                         class="innerImage">
                  </div>
                </div>
              </q-card-media>
            </div>
          </div>
          <div class="row">
            <div class="column">
                <div class="q-headline-3"><b>{{logoProposal.logo_comment}}</b></div>
                <br>
                <q-btn
                  icon="playlist_add_check"
                  :to="{ path: `/chooseLogo/${logoProposal.id}`}"
                  size="sm"
                  label="Choose logo *"
                  color="primary">
                </q-btn>
                <p>*if you are logo commission author</p>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
      <info text="Empty. Submit your proposal as first." v-else></info>
    </q-card-main>
  </q-card>
</template>
<script>
import Loading from './common/Loading';
import Info from './common/Info';

export default {
  name: 'logo-carousel',
  components: { Info, Loading },
  props: {
    logoProposals: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.logoProposals.forEach((logoProposal) => {
      this.get(`/api/picture64/${logoProposal.picture_name}`).subscribe((res) => {
        console.log('mam');
        logoProposal.imageSrc = `data:image/png;base64, ${res.data}`;
        this.$forceUpdate();
      });
    });
  },
};
</script>
<style scoped>
  .outerImageContainer {
    height: 350px;
    width: 350px;
    display: table;
  }

  .innerImageContainer {
    width: 100%;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
  }

  .innerImage {
    max-width: 100%;
    height: auto;
    left: 50%;
  }
</style>
