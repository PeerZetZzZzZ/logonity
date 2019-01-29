<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import GlobalMixin from './mixins/global-mixin'

export default {
  mixins: [GlobalMixin],
  name: 'App'
}
</script>

<style>
</style>
