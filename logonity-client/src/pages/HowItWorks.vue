<template>
  <q-page padding>
    <q-card>
      <q-card-main>
        <div class="row justify-center">
          <div class="column">
            <div :class="$q.platform.is.mobile ?
            'q-display-1 text-center': 'q-display-4 text-center'">
              How it works?
            </div>
            <div class="q-subheading text-center">
              Logonity is decentralised application based on Aeternity blockchain.<br>
              Everyone can create commission for logo creation. <br>
              Everyone can design logo proposals for the commissions <br>
              and win the rewards provided by the commission principals (in Ae tokens). <br>
              Reward mechanism is based on <a href="https://pthomann.pl/1-week-aepp-challange-day-3-sophia-smart-contract/">smart contract.</a> <br>
              <a href="https://pthomann.pl/1-week-aepp-challenge-day-1-idea-and-concept/"><b>Learn more about Logonity.</b></a>
            </div>
          </div>
        </div>
        <br>
        <q-item-separator></q-item-separator>
        <br>
        <br>
        <div class="row justify-center">
          <div class="column">
            <div :class="$q.platform.is.mobile ?
            'q-display-1 text-center': 'q-display-2 text-center'">
              <q-icon name="done_outline"/>
              Add the logo commission
            </div>
            <br>
            <div :class="$q.platform.is.mobile ?
            'q-subheading text-center': 'q-display-1 text-center text-weight-light'">
              Provide the description
              of the logo you would like to be created <br>
              and the appropriate reward for the creation in Ae tokens.
            </div>
          </div>
        </div>
        <br>
        <br>
        <br>
        <div class="row justify-center">
          <div class="column">
            <div :class="$q.platform.is.mobile ?
            'q-display-1 text-center': 'q-display-2 text-center'">
              <q-icon name="add"/>
              Submit logo proposal
            </div>
            <br>
            <div :class="$q.platform.is.mobile ?
            'q-subheading text-center': 'q-display-1 text-center text-weight-light'">
              Are you designer and want to take part in the commission? <br>
              Upload logo proposals for the selected commissions. <br>
              Win the reward if your logo will be chosen by the
              commission principal!
            </div>
          </div>
        </div>
        <br>
        <br>
        <br>
        <div class="row justify-center">
          <div class="column">
            <div :class="$q.platform.is.mobile ?
            'q-display-1 text-center': 'q-display-2 text-center'" >
              <q-icon name="playlist_add_check"/>
              Choose the won logo
            </div>
            <br>
            <div :class="$q.platform.is.mobile ?
            'q-subheading text-center': 'q-display-1 text-center text-weight-light'">
              Choose the won logo of your commission. <br>
              Author of the logo will get reward. <br>
              You as the commission principal will be able
              to download the logo file.
            </div>
          </div>
        </div>
      </q-card-main>
    </q-card>
  </q-page>
</template>
<script>
export default {
  name: 'how-it-works',
};
</script>
