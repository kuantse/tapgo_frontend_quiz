<style lang="scss">
.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<template>
  <q-card bordered flat class="bg-grey-1">
    <q-card-section>
      <div class="row q-col-gutter-sm">
        <div class="col-xs-6 col-sm-4 col-md-2">
          <q-btn
            color="primary"
            icon-right="archive"
            label="Export to csv"
            unelevated
            class="full-width full-height"
            @click="exportTable"
          />
        </div>
        <!-- date -->
        <div class="col-xs-6 col-sm-4 col-md-2">
          <q-input
            v-model="filter.delivery_date"
            outlined
            readonly
            hide-bottom-space
            input-class="text-h6"
            label="Delivery Date"
            class="bg-white"
          >
            <template #append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="filter.delivery_date" title="Delivery Date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <!-- city -->
        <div class="col-xs-6 col-sm-4 col-md-2">
          <q-select
            v-model="filter.city"
            :options="CITY"
            label="City"
            outlined
            multiple
            emit-value
            class="bg-white"
          >
            <template #option="{ itemProps, opt, selected, toggleOption }">
              <q-item v-bind="itemProps">
                <q-item-section thumbnail>
                  <q-checkbox
                    :model-value="selected"
                    @update:model-value="toggleOption(opt)"
                  ></q-checkbox>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ opt }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template #selected>
              <p class="q-mb-none text-truncate">
                {{ filter.city.join(", ") }}
              </p>
            </template>
          </q-select>
        </div>
        <!-- order -->
        <div class="col-xs-6 col-sm-4 col-md-2">
          <q-select
            v-model="filter.order_status"
            :options="ORDER_STATUS"
            label="Status"
            clearable
            outlined
            class="bg-white"
          />
        </div>
        <!-- financial -->
        <div class="col-xs-6 col-sm-4 col-md-2">
          <q-select
            v-model="filter.financial_status"
            :options="FINANCIAL_STATUS"
            label="Payment"
            clearable
            outlined
            class="bg-white"
          />
        </div>
        <!-- fulfillment -->
        <div class="col-xs-6 col-sm-4 col-md-2">
          <q-select
            v-model="filter.fulfillment_status"
            :options="FULFILLMENT_STATUS"
            label="Fulfillment"
            clearable
            outlined
            class="bg-white"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, reactive, ref, watch } from "vue";
import { exportFile } from "quasar";

const CITY = ["台北市", "新北市", "新竹市", "台南市", "高雄市"];
const FINANCIAL_STATUS = ["paid", "pending", "refunded"];
const FULFILLMENT_STATUS = ["received", "preparing"];
const ORDER_STATUS = ["open", "cancelled", "closed"];

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}

export default defineComponent({
  name: "TableFilter",
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["filter:change"],
  setup(props, { emit }) {
    const qDateProxy = ref(null);
    const filter = reactive({
      delivery_date: "",
      city: [],
      order_status: "",
      financial_status: "",
      fulfillment_status: "",
    });

    watch(filter, (v) => {
      emit(
        "filter:change",
        Object.entries(v)
          .filter(([, val]) => !!val)
          .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {})
      );
    });

    function exportTable() {
      // naive encoding to csv format
      const content = [props.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          props.rows.map((row) =>
            props.columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("table-export.csv", content, "text/csv");

      if (status !== true) {
        $q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    }

    return {
      filter,
      qDateProxy,
      exportTable,
      CITY,
      FINANCIAL_STATUS,
      FULFILLMENT_STATUS,
      ORDER_STATUS,
    };
  },
});
</script>
