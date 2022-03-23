<style lang="scss">
.custom-pagination {
  &__per-page {
    width: 135px;
  }
}
</style>

<template>
  <div class="row items-center">
    <q-select
      v-model="page"
      borderless
      :options="options"
      label="Records per page"
      class="custom-pagination__per-page"
    />
    <p class="row item-center q-mb-none q-mx-md">
      {{ pageDesc }}
    </p>
    <q-btn
      v-if="qPageInfo.pagesNumber > 2"
      icon="first_page"
      color="grey-8"
      round
      dense
      flat
      :disable="qPageInfo.isFirstPage"
      @click="qPageInfo.firstPage"
    />
    <q-btn
      icon="chevron_left"
      color="grey-8"
      round
      dense
      flat
      :disable="qPageInfo.isFirstPage"
      @click="qPageInfo.prevPage"
    />
    <q-btn
      icon="chevron_right"
      color="grey-8"
      round
      dense
      flat
      :disable="qPageInfo.isLastPage"
      @click="qPageInfo.nextPage"
    />
    <q-btn
      v-if="qPageInfo.pagesNumber > 2"
      icon="last_page"
      color="grey-8"
      round
      dense
      flat
      :disable="qPageInfo.isLastPage"
      @click="qPageInfo.lastPage"
    />
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    qPageInfo: {
      type: Object,
      default: () => ({}),
    },
    pagination: {
      type: Object,
      default: () => ({}),
    },
    rowsPerPageOptions: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["rows-per-page:change"],
  setup(props, { emit }) {
    const pageDesc = computed(() => {
      const { page, rowsPerPage, rowsNumber } = props.pagination;
      const pageRows = page * rowsPerPage;
      const firstRowIndex = pageRows - (rowsPerPage - 1);
      const endRowIndex = pageRows;
      return `${firstRowIndex} - ${endRowIndex} of ${rowsNumber}`;
    });
    const page = computed({
      get() {
        return props.pagination.rowsPerPage;
      },
      set(option) {
        emit("rows-per-page:change", option.value);
      },
    });
    const options = props.rowsPerPageOptions.map((value) => ({
      label: value === 0 ? "All" : value,
      value,
    }));
    return { pageDesc, page, options };
  },
});
</script>
