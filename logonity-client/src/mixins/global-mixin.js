import { from } from 'rxjs';
import { of } from 'rxjs/observable/of';
import moment from 'moment/min/moment.min';
import Ae from '@aeternity/aepp-sdk/es/ae/universal';

export default {
  data() {
    return {
      properties: {
        nodeUrl: 'https://sdk-testnet.aepps.com',
      },
    };
  },
  methods: {
    get(url) {
      return from(this.$axios.get(url, {
        withCredentials: true,
      }));
    },
    post(url, data) {
      return of(this.$axios.post(url, data, {
        withCredentials: true,
      }));
    },
    formatDate(date) {
      return moment(date).format('MM-DD HH:mm:ss');
    },
    toAeInt(aeIntNumber) {
      return Number(aeIntNumber) * (10 ** 17);
    },
    toAeFromAettos(amount) {
      return Number(amount) / Number(10 ** 18).toFixed(1);
    },
    getAe(keyPair, callback) {
      Ae({
        url: this.properties.nodeUrl,
        internalUrl: this.properties.nodeUrl,
        keypair: keyPair,
      }).then((ae) => {
        callback(ae);
      });
    },
    showMessageDialog(title, message) {
      this.$q.dialog({
        title,
        message,
      });
    },
  },
};
