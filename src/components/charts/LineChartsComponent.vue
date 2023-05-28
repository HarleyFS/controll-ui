<script lang="ts">
import { defineComponent, h, type PropType, reactive } from "vue";
import { GChart } from "vue-google-charts";

export const type = "AreaChart";

export const options = {
  legend: {
    position: "top",
  },
  vAxis: { minValue: 0, fontSize: 20 },
  colors: ["#2daab8"],
  chartArea: { width: "70%", height: "60%" },
};

export default defineComponent({
  name: "LineChartsComponent",
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
