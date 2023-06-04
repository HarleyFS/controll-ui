<script lang="ts">
import { defineComponent, h, reactive, type PropType } from "vue";

import { GChart } from "vue-google-charts";

export const type = "PieChart";

export const options = {
  title: "Tipos de atendimentos",
  colors: ["#2daab8", "#e6693e", "F9B247", "BD86BD", "4DE06A"],
  is3D: true,
};

export default defineComponent({
  name: "PieChartsComponent",
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
