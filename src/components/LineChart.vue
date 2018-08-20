<script>
import { Bar,mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  extends: Bar,
  props: ['chartData','options'],
  mixins:[reactiveProp],
  mounted () {
    this.renderChart(this.chartData, this.options)
  },  
  watch: {
    'options': {
      handler (newOption, oldOption) {
        this._chart.destroy()
        this.renderChart(this.chartData, this.options)
      },
      deep: true
    }
  },
};
</script>
