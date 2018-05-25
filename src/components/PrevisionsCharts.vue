<script>
import { Bar, Line } from 'vue-chartjs'

export default {
  name: 'PrevisionsCharts',
  props: ['data',  'options'],
  extends: Line,
  data () {
    return {
    }
  },
  mounted () {
    let humidity = [];
    let dataLabels = []
    this.data.forEach(i => {
      humidity.push(i.main.humidity)
      dataLabels.push( new Date(i.dt_txt).getDay())
    });

    //console.log(humidity);
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: dataLabels,
      datasets: [
        {
          label: 'Humidity',
          data: humidity,
          fill: 0,
          borderColor: '#000',
          pointBackgroundColor: '#000',
          pointBorderColor: '#000',
          backgroundColor: '#000'
        }
      ]
    }, this.options)
  }
}
</script>

<style>

</style>
