<template>
  <div class="row justify-center">
    <div class="column">
      <h3>{{text}}</h3>
    </div>
  </div>
</template>
<script>
export default {
  name: 'info',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
