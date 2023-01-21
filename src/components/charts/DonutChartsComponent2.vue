<script lang="ts">
import { defineComponent, h } from "vue";

import { GChart } from "vue-google-charts";

export const type = "PieChart";

export const data = [
  ["Tipo pagamento", "Número"],
  ["Compareceu", 44],
  ["Não compareceu", 21],
];

export const options = {
  title: "Comparecimentos",
  titleFontSize: 20,
  titlePosition: "center",
  pieHole: 0.3,
  colors: ["#2daab8", "#e6693e"],
  legend: {
    position: "bottom",
  },
  //   width: 800,
  //   height: 600,
};

export default defineComponent({
  name: "GoogleChart",
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

<style></style>
