<template>
  <q-page class="q-pa-lg">
    <CustomFilter
      :columns="columns"
      :rows="state.rows"
      class="q-mb-sm"
      @filter:change="handleFilterChange"
    />
    <CustomTable
      v-model:pagination="state.pagination"
      :loading="state.loading"
      :columns="columns"
      :rows="state.rows"
      row-key="order_name"
      :rows-per-page-options="[5, 10, 20, 0]"
      binary-state-sort
      @request="handleRequest"
    />
  </q-page>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from "vue";
import CustomFilter from "components/CustomFilter";
import CustomTable from "components/CustomTable";

import { fetchOrders } from "apis/orders";

const columns = [
  {
    name: "order_name",
    label: "訂單編號",
    field: "order_name",
    align: "left",
    sortable: true,
  },
  {
    name: "customer_name",
    label: "顧客",
    field: "customer_name",
    align: "left",
  },
  {
    name: "total_price",
    label: "金額",
    field: (row) => `$${row.total_price}`,
    align: "left",
    sortable: true,
  },
  {
    name: "created_at",
    label: "訂單成立時間",
    field: "created_at",
    align: "left",
    sortable: true,
  },
  {
    name: "order_status",
    label: "訂單狀態",
    field: ({ order_status, financial_status, fulfillment_status }) =>
      `${order_status}/${financial_status}/${fulfillment_status}`,
    align: "left",
    sortable: true,
  },
  {
    name: "delivery_datetime",
    label: "配送日期與時段",
    field: ({ delivery_date, delivery_time }) =>
      `${delivery_date} ${delivery_time}`,
    align: "left",
    // sortable: true,
  },
  {
    name: "receiver_address",
    label: "配送地址",
    field: "receiver_address",
    align: "left",
    sortable: true,
  },
];

export default defineComponent({
  name: "IndexPage",
  components: {
    CustomFilter,
    CustomTable,
  },
  setup() {
    const state = reactive({
      loading: true,
      rows: [],
      pagination: {
        sortBy: "order_name",
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 0,
      },
    });
    const filter = ref({});

    function fetchData() {
      fetchOrders({
        ...filter.value,
        sort_by: state.pagination.sortBy,
        is_descending: state.pagination.descending,
        page: state.pagination.page - 1,
        size: state.pagination.rowsPerPage,
      })
        .then((data) => {
          state.rows = data.content;
          state.pagination = {
            ...state.pagination,
            page: data.pageable.page_number + 1,
            rowsPerPage: data.pageable.page_size,
            rowsNumber: data.total_elements,
          };
        })
        .finally(() => (state.loading = false));
    }

    function handleFilterChange(params = {}) {
      filter.value = { ...params };
      fetchData();
    }

    function handleRequest({ pagination }) {
      state.pagination = pagination;
      fetchData();
    }

    onMounted(fetchData);

    return {
      columns,
      state,
      filter,
      handleFilterChange,
      handleRequest,
    };
  },
});
</script>
