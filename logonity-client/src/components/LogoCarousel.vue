<template>
  <q-card>
    <q-card-main>

  <q-carousel color="white" arrows height="100%" autoplay="true">
    <q-carousel-slide style="margin: 0;padding: 0">
      <div class="row justify-center items-end">
        <div class="column">
          <q-card-media>
            <img :src="imageSrc" style="height: 250px; width: 250px;">
          </q-card-media>
        </div>
      </div>
      <div class="absolute-bottom custom-caption">
        <div class="q-display-1">First stop</div>
        <div class="q-headline">Mountains</div>
        <q-btn
          icon="playlist_add_check"
          :to="{ path: `/chooseLogo/sds`}"
          size="sm"
          label="Choose logo *"
          color="primary">
        </q-btn>
        <p>*if you are logo commission author</p>
      </div>

    </q-carousel-slide>
    <q-carousel-slide style="margin: 0;padding: 0">
      <div class="row justify-center items-end">
        <div class="column">
          <q-card-media>
            <img :src="imageSrc" style="height: 250px; width: 250px;">
          </q-card-media>
        </div>
      </div>
      <div class="absolute-bottom custom-caption">
        <div class="q-display-1">First stop</div>
        <div class="q-headline">Mountains</div>
        <q-btn
          icon="playlist_add_check"
          :to="{ path: `/chooseLogo/sds`}"
          size="sm"
          label="Choose logo *"
          color="primary">
        </q-btn>
        <p>*if you are logo commission author</p>
      </div>

    </q-carousel-slide>
  </q-carousel>
    </q-card-main>
  </q-card>
</template>
<script>
export default {
  name: 'logo-carousel',
  data() {
    return {
      imageSrc: '',
    };
  },
  mounted() {
    this.get('/api/picture64/b1db43f1d8a267e821a52de70978ab61').subscribe((res) => {
      this.imageSrc = `data:image/png;base64, ${res.data}`;
    });
  },
};
</script>
<style>
  .custom-caption {
    padding-left: 5%;
  }
</style>
