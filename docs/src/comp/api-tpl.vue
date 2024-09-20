<template>
  <div class="api-tpl">
    <vue-anchor :is-edit="false" :label="getAnchor" />
    <div class="api-tpl-desc">{{ desc }}</div>
    <fan-table class="tpl-table " :columns="columns" :table-data="cloneTable" :border-around="true" :border-x="true"
      :border-y="false" row-key-field-name="__key__" :expand-option="expandOption"
      :cell-selection-option="cellSelectionOption" />
  </div>
</template>

<script>
import cloneDeep from '@/utils/cloneDeep'
export default {
  name: 'ApiTpl',
  props: {
    desc: {
      type: String,
      required: true,
    },
    anchor: {
      type: String,
      default: null,
    },
    tableData: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    expandOption: {
      type: Object,
      default() {
        return null
      },
    },
  },

  data() {
    return {
      cellSelectionOption: {
        // default true
        enable: false,
      },
      cloneTable: [],
      cloneColumns: [],
      bColumn: [{ key: 'a', field: 'param', title: '参数', width: '10%', align: 'left', type: 'expand' }, { key: 'b', field: 'desc', title: '说明', width: '60%', align: 'left' }, { key: 'c', field: 'type', title: '类型', width: '10%', align: 'left' }, { key: 'd', field: 'optionalVal', title: '可选值', width: '10%', align: 'left' }, { key: 'e', field: 'default', title: '默认值', width: '10%', align: 'left' }],
      bData: [
        {
          name: 'John',
          date: '1900-05-20',
          hobby: 'coding and coding repeat',
          address: 'No.1 Century Avenue, Shanghai',
        },
      ],
    }
  },
  computed: {
    getAnchor() {
      return this.anchor ? this.anchor : this.desc
    },
  },
  watch: {
    // auto create row key
    tableData: {
      handler(val) {
        this.cloneTable = cloneDeep(val)
        this.cloneColumns = cloneDeep(this.columns)
        // console.log(this.bColumn);
        // console.log(this.cloneColumns);
        // if (val) {
        //   this.cloneTable = val.map((item, index) => ({
        //     ...item,
        //     __key__: index
        //   }))
        // }
        // console.log("5246464", this.cloneTable, this.columns)
        // setTimeout(() => {
        //   console.log(this.cloneTable, this.columns)
        // }, 2000)
      },
      immediate: true,
    },
  },
}
</script>

<style lang="less">
.api-tpl {
  margin-bottom: 30px;

  .api-tpl-desc {
    height: 30px;
  }

  .tpl-table {

    td,
    th {
      color: #5e6d82 !important;
      font-size: 14px;

      code {
        display: inline-block;
        background: #f7f7f7;
        font-family: Consolas, Monaco, Andale Mono, Ubuntu Mono,
          monospace;
        margin: 0 3px;
        padding: 1px 5px;
        border-radius: 3px;
        color: #666;
        border: 1px solid #eee;
      }
    }

    td:first-child {
      code {
        margin: 0;
        padding: 2 px 6 px;
        color: #1989fa;
        font-weight: 600;
        font-size: 11px;
        background-color: rgba(25, 137, 250, 0.1);
        border-radius: 20 px;
      }
    }

    td {
      .expand {
        font-weight: bold;
      }
    }
  }
}
</style>
