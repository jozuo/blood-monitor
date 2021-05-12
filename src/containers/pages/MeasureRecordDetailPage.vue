<template>
  <v-container fluid>
    <loading :active.sync="loading" :is-full-page="false" />
    <measure-record-detail-dialog
      v-model="dialog"
      :inspectionItems="inspectionItems"
      :unUsedInspectionItemIds="unUsedInspectionItemIds"
      :editTarget="selectedDetail"
      :regist="registDetail"
    />
    <measure-record-detail-header
      :date.sync="measureRecord.date"
      :registedDates="registedDates"
      :search.sync="search"
      :unUsedInspectionItemIds="unUsedInspectionItemIds"
      @click="addItem"
    />
    <measure-record-detail-list
      :details="measureRecord.details"
      :inspectionItems="inspectionItems"
      :search="search"
      @edit-item="editItem"
      @delete-item="deleteItem"
    />
    <measure-record-detail-footer :changed="changed" @back="back" @cancel="cancel" @save="save" />
    <snackbar-success v-model="snackbar" text="保存しました" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MeasureRecordDetailHeader from '@/containers/organisms/measure-record/MeasureRecordDetailHeader.vue';
import MeasureRecordDetailList from '@/containers/organisms/measure-record/MeasureRecordDetailList.vue';
import MeasureRecordDetailDialog from '@/containers/organisms/measure-record/MeasureRecordDetailDialog.vue';
import MeasureRecordDetailFooter from '@/containers/organisms/measure-record/MeasureRecordDetailFooter.vue';
import SnackbarSuccess from '@/components/atoms/snackbar/SnackbarSuccess.vue';
import moment from 'moment';
import { inspectionItemModule, measureRecordModule, loadingModule } from '@/store/store';
import InspectionItem from '@/models/inspection-item';
import { MeasureRecordDetail, MeasureRecord } from '@/models/measure-record';
import uuidv4 from 'uuid/v4';
import LoadingMixin from '@/containers/pages/mixins/LoadingMixin';
import { mixins } from 'vue-class-component';
import router from '@/router';

@Component({
  components: {
    MeasureRecordDetailHeader,
    MeasureRecordDetailList,
    MeasureRecordDetailDialog,
    MeasureRecordDetailFooter,
    SnackbarSuccess,
  },
})
export default class MeasureRecordDetailPage extends mixins(LoadingMixin) {
  private defaultRecord: MeasureRecord = {
    id: undefined,
    date: null,
    details: [],
    createdAt: undefined,
    updatedAt: undefined,
  };

  private search: string = '';
  private dialog: boolean = false;
  private changed: boolean = false;
  private selectedDetail: MeasureRecordDetail | null = null;
  private snackbar: boolean = false;
  private measureRecord: MeasureRecord = this.defaultRecord;

  get inspectionItems(): InspectionItem[] {
    return inspectionItemModule.items;
  }

  get unUsedInspectionItemIds(): string[] {
    return inspectionItemModule.items
      .filter((item) => {
        return !this.measureRecord.details.some((detail) => detail.inspectionItemId === item.id);
      })
      .map((item) => item.id);
  }

  get registedDates(): string[] {
    return measureRecordModule.registedDates;
  }

  private created(): void {
    this.initialize();
  }

  private initialize(): void {
    const target = measureRecordModule.editRecord;
    if (target) {
      this.measureRecord = Object.assign({}, JSON.parse(JSON.stringify(target)));
    }
    this.changed = false;
  }

  private addItem(): void {
    this.selectedDetail = null;
    this.dialog = true;
  }

  private editItem(id: string): void {
    const detail = this.measureRecord.details.find((detail) => detail.id === id);
    this.selectedDetail = detail ? detail : null;
    this.dialog = true;
  }

  private deleteItem(id: string): void {
    let idx = 0;
    this.measureRecord.details.forEach((item, index) => {
      if (item.id === id) {
        idx = index;
      }
    });
    this.measureRecord.details.splice(idx, 1);
    this.changed = true;
  }

  private async registDetail(detail: MeasureRecordDetail): Promise<void> {
    new Promise((resolve) => {
      if (!detail.id) {
        detail.id = uuidv4();
        this.measureRecord.details.push(detail);
      } else {
        const target = this.measureRecord.details.find((item) => item.id === detail.id);
        Object.assign(target, detail);
      }
      this.changed = true;
      resolve();
    });
  }

  private async save(): Promise<void> {
    loadingModule.setLoading(true);
    await measureRecordModule.save(this.measureRecord);
    this.initialize();
    loadingModule.setLoading(false);
    this.snackbar = true;
  }

  private async cancel(): Promise<void> {
    this.initialize();
  }

  private back(): void {
    router.push('measure-record');
  }
}
</script>
