<template>
  <q-page padding>
    <div class="row justify-center items-center">
      <div class="column">
          <img style="margin: 0 auto;" src="../assets/activeLogoCommissions2.png"
             :style="$q.platform.is.mobile ? 'width: 50%;': ''">
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-list highlight color="primary" separator
                v-show="activeCommissions.length !== 0 && !noCommissionsAtAll">
          <q-item v-for="activeCommission in activeCommissions"
                  :key="activeCommission.id"
                  :to="{ path: `/logoInfo/${activeCommission.id}`}">
            <q-item-main class="primaryColor">
              <q-item-tile>
                <span class="secondaryColor">
                  <b>Commission description</b>
                </span><br>
                <span class="primaryColor">
                  {{activeCommission.logo_description}}
                </span>
              </q-item-tile>
              <br>
              <span class="float-left">Created:
                {{formatDate(activeCommission.creation_time)}}</span>
            </q-item-main>
            <q-chip icon-right="attach_money" color="primary" small>
              Reward: {{activeCommission.reward}} Ae
            </q-chip>
          </q-item>
        </q-list>
      </div>
    </div>
    <loading v-show="activeCommissions.length === 0 && !noCommissionsAtAll"></loading>
    <info text="No commissions. Create first!" v-if="noCommissionsAtAll"></info>
  </q-page>
</template>

<style>
</style>

<script>
/*eslint-disable */
import Mixin from '../mixins/global-mixin'
import { getReward } from '../domain/service/logonity-contract-api';
import Loading from '../components/common/Loading';
import Info from '../components/common/Info';

export default {
  name: 'PageIndex',
  components: {Info, Loading},
  mixins: [Mixin],
  data() {
    return {
      activeCommissions: [],
      noCommissionsAtAll: false,
    };
  },
  mounted() {
    this.get('/api/activeCommissions').subscribe((res) => {
      if (res.data.length === 0) {
        this.noCommissionsAtAll = true;
      } else {
        this.getAe(null, (ae) => {
          res.data.forEach(activeCommission => {
            getReward(ae, activeCommission.contract_address, (reward) => {
              activeCommission.reward = this.toAeFromAettos(reward);
              this.activeCommissions.push(activeCommission);
            });
          });
        });
      }
    });

  }
}
</script>
