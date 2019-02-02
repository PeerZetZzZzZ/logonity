<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu"/>
        </q-btn>

          <img class="cursorPointer" src="../assets/logonityLogo.png" @click="$router.push('/')">
        <q-toolbar-title>
          <div slot="subtitle">
            Logonity - decentralized logo marketplace built on Aeternity blockchain.
          </div>
        </q-toolbar-title>
        <q-btn to="/submitNewLogoCommission"
               label="Add commission" color="secondary" @click="leftSide = !leftSide"/>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen" content-class="sideBarBody">
      <q-list no-border link inset-delimiter>
        <q-list-header class="secondaryColor">About</q-list-header>
        <q-item @click.native="openURL('http://quasar-framework.org')" class="secondaryColor">
          <q-item-side class="secondaryColor" icon="school"/>
          <q-item-main class="secondaryColor" label="How it works"/>
        </q-item>
        <q-item @click.native="openURL('https://pthomann.pl')" class="secondaryColor">
          <q-item-side class="secondaryColor" icon="code"/>
          <q-item-main label="Author" sublabel="https://pthomann.pl"/>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';

export default {
  name: 'MyLayout',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
    };
  },
  methods: {
    openURL,
  },
};
</script>

<style>
  .cursorPointer:hover {
    cursor: pointer;
  }

  .sideBarBody {
    background-color: #311B58;
  }

  .primaryColor {
    color: #311B58;
  }

  .secondaryColor {
    color: #F7296E;
  }
</style>
