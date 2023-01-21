<script lang="ts">
import { defineComponent, h } from "vue";

import { GChart } from "vue-google-charts";

export const type = "ColumnChart";

export const data = [
  ["Mês", "Clinico geral", "Estética", "Depilação", "Laser", "Cirurgia"],
  ["jan", 1000, 400, 200, 133, 200],
  ["fev", 1170, 460, 250, 133, 200],
  ["mar", 660, 1120, 300, 143, 500],
  ["Abri", 1030, 540, 350, 133, 200],
  ["Mai", 1030, 540, 350, 153, 200],
  ["Jun", 1030, 540, 350, 163, 400],
];

export const options = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
  colors: ["#2daab8", "#e6693e", "F9B247", "BD86BD", "4DE06A"],

  //   width: 800,
  //   height: 600,
};

export default defineComponent({
  name: "ColumnChartsComponent",
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
