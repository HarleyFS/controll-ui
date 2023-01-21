<script lang="ts">
import { defineComponent, h } from "vue";

import { GChart } from "vue-google-charts";

export const type = "AreaChart";

export const data = [
  ["Mês", "Consultas realizadas"],
  ["Jan", 112],
  ["Fev", 170],
  ["Mar", 460],
  ["Abr", 130],
  ["Maio", 230],
  ["Jun", 280],
  ["Jul", 112],
  ["Ago", 170],
  ["Set", 460],
  ["Out", 130],
  ["Nov", 230],
  ["Dez", 280],
];

export const options = {
  legend: {
    position: "top",
  },
  vAxis: { minValue: 0, fontSize: 20 },
  colors: ["#2daab8"],
  chartArea: { width: "70%", height: "60%" },

  //   width: 400,
  //   height: 300,
};

export default defineComponent({
  name: "LineChartsComponent",
  components: {
    GChart,
  },
  setup() {
    return () =>
      h(GChart, {
        data,
        options,
        type,
      });
  },
});
</script>
