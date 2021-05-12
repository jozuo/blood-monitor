<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <loading :active.sync="loading" :is-full-page="false"></loading>
      <v-card-text class="pt-5">
        <v-container grid-list-md class="mt-0 py-0">
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="editedItem.name"
                data-vv-name="editedItem[name]"
                v-validate="'required|max:20|alpha_dash'"
                :counter="20"
                :error-messages="errors.collect('editedItem[name]')"
                data-vv-as="項目名"
                label="項目名(*)"
                ref="elName"
                @keydown.prevent.native.tab.exact="focusNameJa"
                @keydown.prevent.native.shift.tab="focusSave"
                rquired
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md8>
              <v-text-field
                v-model="editedItem.nameJa"
                data-vv-name="editedItem[nameJa]"
                v-validate="'max:100'"
                :counter="100"
                :error-messages="errors.collect('editedItem[nameJa]')"
                data-vv-as="項目名(日本語)"
                label="項目名(日本語)"
                ref="elNameJa"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="editedItem.unit"
                data-vv-name="editedItem[unit]"
                v-validate="'max:20'"
                :counter="20"
                :error-messages="errors.collect('editedItem[unit]')"
                data-vv-as="単位"
                label="単位"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="editedItem.low"
                data-vv-name="editedItem[low]"
                v-validate="'decimal:1|max:5'"
                :counter="5"
                :error-messages="errors.collect('editedItem[low]')"
                data-vv-as="基準値(下限)"
                label="基準値(下限)"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="editedItem.high"
                data-vv-name="editedItem[high]"
                v-validate="'decimal:1|max:5'"
                :counter="5"
                :error-messages="errors.collect('editedItem[high]')"
                data-vv-as="基準値(上限)"
                label="基準値(上限)"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm12 md12>
              <v-textarea
                v-model="editedItem.description"
                label="説明"
                auto-grow
                rows="1"
              ></v-textarea>
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
          @click="onSave"
          ref="elSave"
          @keydown.prevent.native.tab.exact="focusName"
          @keydown.prevent.native.shift.tab="focusCancel"
          >{{ registButtonTitle }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit, Ref } from 'vue-property-decorator';
import InspectionItem from '@/models/inspection-item';
import { inspectionItemModule } from '@/store/store';

// tslint:disable-next-line:no-var-requires
const Loading = require('vue-loading-overlay');
// tslint:enable
import 'vue-loading-overlay/dist/vue-loading.css';

export const defaultItem: InspectionItem = {
  id: '',
  name: '',
  nameJa: '',
  unit: '',
  low: 0.0,
  high: 0.0,
  description: '',
};

@Component({ components: { Loading } })
export default class InspectionItemDialog extends Vue {
  @Prop({ type: Boolean, required: true }) private readonly value!: boolean;
  @Prop({ type: Object }) private readonly item!: InspectionItem | null;
  @Prop({ type: Function, required: true }) private readonly save!: (
    item: InspectionItem
  ) => Promise<void>;

  @Emit() public input(value: boolean) {}

  private loading: boolean = false;
  private editedItem: InspectionItem | null = Object.assign({}, defaultItem);

  private get dialog() {
    return this.value;
  }

  private set dialog(value: boolean) {
    this.input(value);
  }

  private get isNew(): boolean {
    return !this.item;
  }

  private $_veeValidate = {
    validator: 'new',
  };

  private get registButtonTitle(): string {
    return this.isNew ? '登録' : '変更';
  }

  private close(): void {
    inspectionItemModule.clearSelectedItemId();
    this.editedItem = Object.assign({}, defaultItem);
    this.$validator.reset();
    this.dialog = false;
  }

  private async onSave() {
    if (!(await this.$validator.validateAll())) {
      return;
    }

    this.loading = true;
    await this.save(this.editedItem!);
    this.loading = false;
    this.close();
  }

  @Watch('dialog')
  private watchDialog() {
    // 新規作成の場合、このタイミングで項目値初期化すると項目値が変更になりValidationが発火してしまうので
    // 項目値の初期化は`close()`のタイミングで行う。
    if (this.dialog && !this.isNew) {
      this.editedItem = Object.assign({}, this.item);
    }
  }

  @Ref() elName!: HTMLElement;
  @Ref() elNameJa!: HTMLElement;
  @Ref() elCancel!: HTMLElement;
  @Ref() elSave!: HTMLElement;

  private focusName(): void {
    this.elName.focus();
  }
  private focusNameJa(): void {
    this.elNameJa.focus();
  }
  private focusCancel(): void {
    (this.elCancel as any).$el.focus();
  }
  private focusSave(): void {
    (this.elSave as any).$el.focus();
  }
}
</script>
