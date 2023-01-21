<script lang="ts">
import { defineComponent, h } from "vue";

import { GChart } from "vue-google-charts";

export const type = "PieChart";

export const data = [
  ["Sexo", "Número"],
  ["Feminino", 13],
  ["Masculino", 5],
];

export const options = {
  title: "Sexo",
  pieHole: 0.3,
  colors: ["#2daab8", "#e6693e"],
  legend: {
    position: "bottom",
  },
  //   width: 800,
  //   height: 600,
};

export default defineComponent({
  name: "DonutChartsComponent",
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
