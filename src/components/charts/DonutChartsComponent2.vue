<script lang="ts">
import { defineComponent, h, reactive, type PropType } from "vue";
import { GChart } from "vue-google-charts";

export const type = "PieChart";

export const options = {
  title: "Consultas",
  titlePosition: "center",
  pieHole: 0.3,
  colors: ["#2daab8", "#e6693e"],
  legend: {
    position: "bottom",
  },
};

export default defineComponent({
  name: "GoogleChart",
  components: {
    GChart,
  },

  props: {
    dataList: {
      type: Array as PropType<Array<Array<Object>>>,
      default: () => [],
    },
  },

  setup(props) {
    const data = reactive(props.dataList);

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
