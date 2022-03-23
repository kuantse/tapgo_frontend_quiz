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
    label: "Order",
    field: "order_name",
    align: "left",
    sortable: true,
  },
  {
    name: "customer_name",
    label: "Customer",
    field: "customer_name",
    align: "left",
  },
  {
    name: "total_price",
    label: "Price",
    field: "total_price",
    format: (val) => `$${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
    align: "left",
    sortable: true,
  },
  {
    name: "receiver_address",
    label: "Address",
    field: "receiver_address",
    align: "left",
    sortable: true,
  },
  {
    name: "delivery_date",
    label: "Delivery Date",
    field: "delivery_date",
    align: "left",
    sortable: true,
  },
  {
    name: "created_at",
    label: "Time",
    field: "created_at",
    align: "left",
    sortable: true,
  },
  {
    name: "order_status",
    label: "Status",
    field: "order_status",
    align: "left",
  },
  {
    name: "financial_status",
    label: "Payment",
    field: "financial_status",
    align: "left",
  },
  {
    name: "fulfillment_status",
    label: "fulfillment",
    field: "fulfillment_status",
    align: "left",
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
