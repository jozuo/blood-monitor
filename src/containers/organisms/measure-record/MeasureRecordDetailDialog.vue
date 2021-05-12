<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <loading :active.sync="loading" :is-full-page="false" />
      <v-card-text class="pt-5">
        <v-container grid-list-md class="mt-0 py-0">
          <v-layout wrap>
            <v-flex xs4>
              <v-autocomplete
                label="計測項目(*)"
                v-model="inspectionItemName"
                :items="inspectionItemNames"
                ref="elInspectionItem"
                @keydown.prevent.native.tab.exact="focusMeasuredValue"
                @keydown.prevent.native.shift.tab="focusRegist"
                v-validate="'required'"
                data-vv-as="計測項目"
                data-vv-name="inspectionItemName"
                :error-messages="errors.collect('inspectionItemName')"
              />
            </v-flex>
            <v-flex xs4>
              <v-text-field
                label="基準値(下限)"
                v-model="inspectionItemLow"
                disabled
                class="body-2"
              />
            </v-flex>
            <v-flex xs4>
              <v-text-field
                label="基準値(上限)"
                v-model="inspectionItemHigh"
                disabled
                class="body-2"
              />
            </v-flex>
            <v-flex xs1>
              <level-icon
                v-model="measuredValue"
                :low="inspectionItemLow"
                :high="inspectionItemHigh"
              />
            </v-flex>
            <v-flex xs11>
              <v-text-field
                label="計測値(*)"
                v-model="measuredValue"
                :counter="5"
                :suffix="inspectionItemUnit"
                ref="elMeasuredValue"
                color="primary"
                required
                v-validate="'required|decimal:1|max:5'"
                data-vv-as="計測値"
                data-vv-name="measuredValue"
                :error-messages="errors.collect('measuredValue')"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close" ref="elCancel">キャンセル</v-btn>
        <v-btn
          color="blue darken-1"
          text
          ref="elRegist"
          @click="onRegist"
          @keydown.prevent.tab.exact="focusInspectionItem"
          @keydown.prevent.shift.tab="focusCancel"
          >{{ registButtonTitle }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
// tslint:disable-next-line:no-var-requires
const Loading = require('vue-loading-overlay');
// tslint:enable
import 'vue-loading-overlay/dist/vue-loading.css';

import { Component, Vue, Prop, Emit, Watch, Ref } from 'vue-property-decorator';
import InspectionItem from '@/models/inspection-item';
import MeasureRecordDetailHeader from './MeasureRecordDetailHeader.vue';
import { MeasureRecordDetail } from '@/models/measure-record';
import LevelIcon from '@/components/atoms/icon/LevelIcon.vue';

@Component({ components: { Loading, LevelIcon } })
export default class MeasureRecordDetailDialog extends Vue {
  @Prop({ type: Boolean, required: true }) private readonly value!: boolean;
  @Prop({ type: Array, required: true }) private readonly inspectionItems!: InspectionItem[];
  @Prop({ type: Array, required: true }) private readonly unUsedInspectionItemIds!: string[];
  @Prop({ type: Object }) private readonly editTarget!: MeasureRecordDetail;
  @Prop({ type: Function, required: true }) private readonly regist!: (
    detail: MeasureRecordDetail
  ) => Promise<void>;
  @Emit() public input(value: boolean) {}

  private loading: boolean = false;

  private id: string | undefined = undefined;
  private inspectionItemId: string = '';
  private measuredValue: number | null = null;

  private get dialog(): boolean {
    return this.value;
  }

  private set dialog(value: boolean) {
    this.input(value);
  }

  private get isNew(): boolean {
    return !this.editTarget;
  }

  private get registButtonTitle(): string {
    return this.isNew ? '登録' : '変更';
  }

  private get inspectionItemName() {
    const inspectionItem = this.resolveInspectionItem();
    return inspectionItem ? inspectionItem.name : null;
  }

  private set inspectionItemName(value: string | null) {
    const inspectionItem = this.inspectionItems.find((item) => item.name === value);
    this.inspectionItemId = inspectionItem ? inspectionItem.id : '';
  }

  private get inspectionItemLow() {
    const inspectionItem = this.resolveInspectionItem();
    return inspectionItem ? inspectionItem.low : null;
  }

  private get inspectionItemHigh() {
    const inspectionItem = this.resolveInspectionItem();
    return inspectionItem ? inspectionItem.high : null;
  }

  private get inspectionItemUnit() {
    const inspectionItem = this.resolveInspectionItem();
    return inspectionItem ? inspectionItem.unit : null;
  }

  private resolveInspectionItem(): InspectionItem | undefined {
    return this.inspectionItems.find((item) => item.id === this.inspectionItemId);
  }

  private get inspectionItemNames(): string[] {
    return this.inspectionItems
      .filter((item) => {
        if (this.editTarget && this.editTarget.inspectionItemId === item.id) {
          return true;
        }
        return this.unUsedInspectionItemIds.some((id) => item.id === id);
      })
      .map((item) => item.name);
  }

  @Watch('dialog')
  private initialize() {
    if (this.dialog && this.editTarget) {
      this.id = this.editTarget.id!;
      const inspectionItem = this.inspectionItems.find(
        (item) => item.id === this.editTarget.inspectionItemId
      );
      this.inspectionItemName = inspectionItem ? inspectionItem.name : '';
      this.measuredValue = this.editTarget.measuredValue;
    }
  }

  private $_veeValidate = {
    validator: 'new',
  };

  private async onRegist() {
    if (!(await this.$validator.validate())) {
      return;
    }

    this.loading = true;
    const detail: MeasureRecordDetail = Object.assign({}, this.editTarget);
    detail.inspectionItemId = this.inspectionItemId;
    detail.measuredValue = this.measuredValue!;

    await this.regist(detail);
    this.loading = false;
    this.close();
  }

  private close() {
    this.inspectionItemId = '';
    this.id = undefined;
    this.inspectionItemId = '';
    this.measuredValue = null;
    this.$validator.reset();
    this.dialog = false;
  }

  @Ref()
  private elInspectionItem!: HTMLInputElement;
  @Ref()
  private elMeasuredValue!: HTMLInputElement;
  @Ref()
  private elCancel!: HTMLButtonElement;
  @Ref()
  private elRegist!: HTMLButtonElement;

  private focusInspectionItem(): void {
    this.elInspectionItem.focus();
  }

  private focusMeasuredValue(): void {
    this.elMeasuredValue.focus();
  }

  private focusCancel(): void {
    (this.elCancel as any).$el.focus();
  }

  private focusRegist(): void {
    (this.elRegist as any).$el.focus();
  }
}
</script>
