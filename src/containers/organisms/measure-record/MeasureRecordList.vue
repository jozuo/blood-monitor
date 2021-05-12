<template>
  <div class="table-scroll mt-2">
    <v-simple-table height="500px">
      <thead>
        <tr>
          <th class="grey lighten-3 text-left" width="100px">計測項目 \ 計測日</th>
          <th
            class="grey lighten-3 text-center"
            width="130px"
            v-for="record in records"
            :key="record.id"
          >
            {{ record.date | moment }}<br />
            <button-list-edit class="mr-2" @click="editItem(record)" />
            <button-list-delete @click="deleteItem(record)" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.name">
          <th class="grey lighten-3">{{ row.name }}</th>
          <td class="text-right" v-for="column in row.columns" :key="column.seq">
            <span v-if="column.detail">
              <span class="mr-1">{{ column.detail.measuredValue }}</span>
              <span
                ><level-icon
                  v-model="column.detail.measuredValue"
                  :low="column.item.low"
                  :high="column.item.high"
                  size="small"
              /></span>
            </span>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import InspectionItem from '../../../models/inspection-item';
import ButtonListEdit from '@/components/atoms/button/ButtonListEdit.vue';
import ButtonListDelete from '@/components/atoms/button/ButtonListDelete.vue';
import LevelIcon from '@/components/atoms/icon/LevelIcon.vue';
import { MeasureRecordDetail, MeasureRecord } from '../../../models/measure-record';
import moment from 'moment';

export interface Row {
  name: string;
  columns: Column[];
}

export interface Column {
  seq: number;
  item: InspectionItem;
  detail?: MeasureRecordDetail | null;
}

@Component({
  components: { ButtonListEdit, ButtonListDelete, LevelIcon },
  filters: {
    moment(value: string): string {
      return moment(value).format('YYYY/MM/DD');
    },
  },
})
export default class MeasureRecordList extends Vue {
  @Prop({ type: Array, required: true }) private readonly records!: MeasureRecord[];
  @Prop({ type: Array, required: true }) private readonly rows!: Row[];
  @Emit() private editItem(record: MeasureRecord): void {}
  @Emit() private deleteItem(record: MeasureRecord): void {}
}
</script>

<style>
.table-scroll {
  width: 100vw - 256px;
  overflow: scroll;
}

table {
  width: 100%;
}

th {
  white-space: nowrap;
}
t {
  white-space: nowrap;
}

thead th {
  /* 縦スクロール時に固定する */
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  /* tbody内のセルより手前に表示する */
  z-index: 1;
}
thead th:first-child {
  /* 行内の他のセルより手前に表示する */
  z-index: 2;
}
th:first-child {
  /* 横スクロール時に固定する */
  position: -webkit-sticky;
  position: sticky;
  left: 0;
}
</style>
