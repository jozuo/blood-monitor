<template>
  <v-container fluid>
    <loading :active.sync="loading" :is-full-page="false" />
    <inspection-item-dialog v-model="dialog" :item="selectedItem" :save="saveItem" />
    <inspection-item-header :search.sync="search" @add-item="addItem" />
    <inspection-item-list :search.sync="search" @edit-item="editItem" @delete-item="deleteItem" />
    <snackbar-success v-model="snackbar" :text="message" />
  </v-container>
</template>

<script lang="ts">
import InspectionItemHeader from '@/containers/organisms/inspection-item/InspectionItemHeader.vue';
import InspectionItemList from '@/containers/organisms/inspection-item/InspectionItemList.vue';
import InspectionItemDialog from '@/containers/organisms/inspection-item/InspectionItemDialog.vue';
import LoadingMixin from '@/containers/pages/mixins/LoadingMixin';
import Component, { mixins } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import InspectionItem from '../../models/inspection-item';
import { inspectionItemModule } from '@/store/store';
import SnackbarSuccess from '@/components/atoms/snackbar/SnackbarSuccess.vue';
import { loadingModule } from '@/store/store';

@Component({
  components: { InspectionItemHeader, InspectionItemList, InspectionItemDialog, SnackbarSuccess },
})
export default class InspectionItemPage extends mixins(LoadingMixin) {
  private dialog: boolean = false;
  private search: string | null = '';
  private selectedItem: InspectionItem | null = null;
  private snackbar: boolean = false;
  private messagePrefix: string = '';

  private get message(): string {
    return `${this.messagePrefix}しました`;
  }

  private async created() {
    loadingModule.setLoading(true);
    await inspectionItemModule.initialize();
    loadingModule.setLoading(false);
  }

  private addItem() {
    this.selectedItem = null;
    this.dialog = true;
    this.messagePrefix = '登録';
  }

  private editItem(item: InspectionItem) {
    this.selectedItem = item;
    this.dialog = true;
    this.messagePrefix = '変更';
  }

  private async deleteItem(item: InspectionItem) {
    loadingModule.setLoading(true);
    await inspectionItemModule.delete(item);
    loadingModule.setLoading(false);
    this.messagePrefix = '削除';
    this.snackbar = true;
  }

  private async saveItem(item: InspectionItem) {
    await inspectionItemModule.save(item);
    this.snackbar = true;
  }
}
</script>
