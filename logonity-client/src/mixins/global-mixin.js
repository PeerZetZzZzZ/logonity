import { from } from 'rxjs'
import { of } from 'rxjs/observable/of'
import moment from 'moment/min/moment.min'

/*eslint-disable */
export default {
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
      return moment(date).format('HH:mm:ss MM-DD');
    },
    toAeInt(aeIntNumber) {
      return Number(aeIntNumber) * Math.pow(10, 18);
    },
    toAeFromAettos(amount) {
      return (Number(amount) / 1000000000000000000).toFixed(18)
    },
  },
}
