<template>
  <v-container fluid color="white">
    <loading :active.sync="loading" :is-full-page="false" />
    <measure-record-header @click="addItem" />
    <measure-record-list
      :records="records"
      :rows="rows"
      @edit-item="editItem"
      @delete-item="deleteItem"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { inspectionItemModule, measureRecordModule, loadingModule } from '@/store/store';
import { mixins } from 'vue-class-component';
import LoadingModule from '../../store/modules/loading-module';
import LoadingMixin from './mixins/LoadingMixin';
import { MeasureRecord } from '../../models/measure-record';
import router from '@/router';
import InspectionItem from '../../models/inspection-item';
import MeasureRecordHeader from '@/containers/organisms/measure-record/MeasureRecordHeader.vue';
import MeasureRecordList, {
  Row,
  Column,
} from '@/containers/organisms/measure-record/MeasureRecordList.vue';

@Component({
  components: { MeasureRecordHeader, MeasureRecordList },
})
export default class MeasureRecordPage extends mixins(LoadingMixin) {
  private get records(): MeasureRecord[] {
    return measureRecordModule.records;
  }

  private get rows(): Row[] {
    const rows = inspectionItemModule.items.map((item) => {
      let seq = 0;
      const columns: Column[] = measureRecordModule.details(item).map((detail) => {
        return {
          seq: seq += 1,
          item: item,
          detail: detail,
        };
      });
      return { name: item.name, columns: columns };
    });
    return rows;
  }

  private async created(): Promise<void> {
    loadingModule.setLoading(true);
    await measureRecordModule.initialize();
    loadingModule.setLoading(false);
  }

  private addItem(): void {
    measureRecordModule.setEditNewRecord();
    router.push('measure-record-detail');
  }

  private editItem(record: MeasureRecord): void {
    measureRecordModule.setEditRecordId(record.id!);
    router.push('measure-record-detail');
  }

  private deleteItem(record: MeasureRecord): void {
    alert(record.date);
  }
}
</script>
