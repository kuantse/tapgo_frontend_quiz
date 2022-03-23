<template>
  <div>
    <q-table ref="qTable" v-bind="$attrs">
      <template #top="scope">
        <CustomPagination
          :q-page-info="scope"
          :pagination="$attrs.pagination"
          :options="$attrs['rows-per-page-options']"
          @rows-per-page:change="handleRowsPerPageChange"
        />
      </template>
      <template #bottom="scope">
        <CustomPagination
          :q-page-info="scope"
          :pagination="$attrs.pagination"
          :options="$attrs['rows-per-page-options']"
          @rows-per-page:change="handleRowsPerPageChange"
        />
      </template>

      <template #loading>
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left" style="width: 150px">
                <q-skeleton animation="blink" type="text" />
              </th>
              <th class="text-right">
                <q-skeleton animation="blink" type="text" />
              </th>
              <th class="text-right">
                <q-skeleton animation="blink" type="text" />
              </th>
              <th class="text-right">
                <q-skeleton animation="blink" type="text" />
              </th>
              <th class="text-right">
                <q-skeleton animation="blink" type="text" />
              </th>
              <th class="text-right">
                <q-skeleton animation="blink" type="text" />
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="n in 5" :key="n">
              <td class="text-left">
                <q-skeleton animation="blink" type="text" width="85px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="50px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="35px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="65px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="25px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="85px" />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import CustomPagination from "components/CustomPagination";

export default defineComponent({
  name: "CustomTable",
  inheritAttrs: false,
  components: {
    CustomPagination,
  },
  setup() {
    const qTable = ref(null);
    function handleRowsPerPageChange(rowsPerPage) {
      qTable.value.setPagination({
        page: 1,
        rowsPerPage,
      });
    }
    return { qTable, handleRowsPerPageChange };
  },
});
</script>
