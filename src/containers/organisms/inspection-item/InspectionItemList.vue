<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :single-expand="expand"
    item-key="name"
    show-expand
    :items-per-page="5"
    class="elevation-1"
    :search="syncSearch"
    :page.sync="page"
    @pagination="onPagenation"
  >
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length" class="pa-0">
        <blockquote class="blockquote body-2">{{ item.description }}</blockquote>
      </td>
    </template>

    <template v-slot:item.action="{ item }">
      <button-list-edit class="mr-3" @click="editItem(item)" />
      <button-list-delete @click="deleteItem(item)" />
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Emit, Watch } from 'vue-property-decorator';
import InspectionItem from '@/models/inspection-item';
import { inspectionItemModule } from '@/store/store';
import ButtonListEdit from '@/components/atoms/button/ButtonListEdit.vue';
import ButtonListDelete from '@/components/atoms/button/ButtonListDelete.vue';
import Pagenation from '@/models/pagenation';

@Component({ components: { ButtonListEdit, ButtonListDelete } })
export default class InspectionItemList extends Vue {
  @PropSync('search', { type: String }) private syncSearch!: string | null;
  @Emit() public editItem(item: InspectionItem) {}
  @Emit() public deleteItem(item: InspectionItem) {}

  private readonly headers = [
    { text: '計測項目名', align: 'left', value: 'name', width: '20%', sortable: true },
    { text: '計測項目名(日本語)', align: 'left', value: 'nameJa', width: '35%', sortable: false },
    { text: '単位', align: 'left', value: 'unit', width: '10%', sortable: false },
    { text: '基準値(下限)', align: 'left', value: 'low', width: '10%', sortable: false },
    { text: '基準値(上限)', align: 'left', value: 'high', width: '10%', sortable: false },
    { text: '', align: 'center', value: 'action', width: '10%', sortable: false },
  ];

  private get items(): InspectionItem[] {
    return inspectionItemModule.items;
  }

  private expand: boolean = false;
  private expanded = [];
  private page: number = 1;
  private pagenation!: Pagenation;
  private itemCount!: number;

  @Watch('items')
  private itemsChange(): void {
    if (this.items.length > this.itemCount) {
      this.page = this.lastPage();
    } else if (this.isPageOverflow()) {
      this.page = this.lastPage();
    }
    this.itemCount = this.items.length;
  }

  private onPagenation(pagenation: Pagenation): void {
    this.pagenation = pagenation;
    this.page = pagenation.page;
  }

  private isPageOverflow(): boolean {
    return (this.pagenation.page - 1) * this.pagenation.itemsPerPage >= this.items.length;
  }

  private lastPage(): number {
    let max = this.items.length / this.pagenation.itemsPerPage;
    if (this.items.length % this.pagenation.itemsPerPage > 0) {
      max += 1;
    }
    return Math.floor(max);
  }
}
</script>
