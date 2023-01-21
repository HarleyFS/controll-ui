<script lang="ts">
import { defineComponent, h } from "vue";

import { GChart } from "vue-google-charts";

export const type = "PieChart";

export const data = [
  ["Tipo consulta", "Número"],
  ["Clinico geral", 11],
  ["Estética", 2],
  ["Depilação", 2],
  ["Laser", 2],
  ["Cirurgia", 7],
];

export const options = {
  title: "Tipos de atendimentos",
  colors: ["#2daab8", "#e6693e", "F9B247", "BD86BD", "4DE06A"],
  is3D: true,
  //   width: 800,
  //   height: 600,
};

export default defineComponent({
  name: "PieChartsComponent",
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
