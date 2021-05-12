<template>
  <v-data-table
    :headers="headers"
    :items="rows"
    item-key="id"
    :items-per-page="5"
    class="elevation-1"
    :search="search"
    :page.sync="page"
    @pagination="onPagenation"
  >
    <template v-slot:item.action="{ item }">
      <button-list-edit class="mr-3" @click="editItem(item.id)" />
      <button-list-delete @click="deleteItem(item.id)" />
    </template>

    <template v-slot:item.measuredValue="{ item }">
      <v-container fluid>
        <v-layout row>
          <v-flex xs7 class="text-right">
            {{ item.measuredValue }}
            {{ item.inspectionItemUnit }}
          </v-flex>
          <v-flex xs1>
            <level-icon
              v-model="item.measuredValue"
              :low="item.inspectionItemLow"
              :high="item.inspectionItemHigh"
              class="ml-4"
            />
            <v-flex xs4>
              <v-spacer />
            </v-flex>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, PropSync, Watch } from 'vue-property-decorator';
import InspectionItem from '@/models/inspection-item';
import { MeasureRecordDetail } from '@/models/measure-record';
import ButtonListEdit from '@/components/atoms/button/ButtonListEdit.vue';
import ButtonListDelete from '@/components/atoms/button/ButtonListDelete.vue';
import LevelIcon from '@/components/atoms/icon/LevelIcon.vue';
import Pagenation from '@/models/pagenation';

interface RowData {
  id: string;
  inspectionItemName: string | null;
  inspectionItemLow: number | null;
  inspectionItemHigh: number | null;
  inspectionItemUnit: string | null;
  measuredValue: number | null;
}

@Component({ components: { ButtonListEdit, ButtonListDelete, LevelIcon } })
export default class MeasureRecordDetailList extends Vue {
  @Emit() private editItem(id: string) {}
  @Emit() private deleteItem(id: string) {}

  private readonly headers = [
    {
      text: '計測項目',
      align: 'center',
      value: 'inspectionItemName',
      width: '25%',
    },
    {
      text: '基準値(下限)',
      align: 'center',
      value: 'inspectionItemLow',
      width: '20%',
      sortable: false,
    },
    {
      text: '基準値(上限)',
      align: 'center',
      value: 'inspectionItemHigh',
      width: '20%',
      sortable: false,
    },
    { text: '計測値', align: 'center', value: 'measuredValue', width: '25%', sortable: false },
    { text: '', align: 'center', value: 'action', width: '10%', sortable: false },
  ];

  @Prop({ type: String, default: '' })
  private readonly search!: string;

  @Prop({ type: Array, required: true })
  private readonly inspectionItems!: InspectionItem[];

  @Prop({ type: Array, default: [] })
  private readonly details!: MeasureRecordDetail[];

  get rows(): RowData[] {
    return this.details.map((detail) => {
      const inspectionItem = this.inspectionItems.find(
        (item) => item.id === detail.inspectionItemId
      );
      return {
        id: detail.id!,
        inspectionItemName: inspectionItem ? inspectionItem.name : null,
        inspectionItemLow: inspectionItem ? inspectionItem.low : null,
        inspectionItemHigh: inspectionItem ? inspectionItem.high : null,
        inspectionItemUnit: inspectionItem ? inspectionItem.unit : null,
        measuredValue: detail.measuredValue,
      };
    });
  }

  private page: number = 1;
  private pagenation!: Pagenation;
  private itemCount!: number;

  private created(): void {
    this.itemCount = this.details.length;
  }

  private onPagenation(pagenation: Pagenation): void {
    this.pagenation = pagenation;
    this.page = pagenation.page;
  }

  @Watch('details')
  private itemsChange(): void {
    if (this.details.length > this.itemCount) {
      this.page = this.lastPage();
    } else if (this.isPageOverflow()) {
      this.page = this.lastPage();
    }
    this.itemCount = this.details.length;
  }

  private isPageOverflow(): boolean {
    return (this.pagenation.page - 1) * this.pagenation.itemsPerPage >= this.details.length;
  }

  private lastPage(): number {
    let max = this.details.length / this.pagenation.itemsPerPage;
    if (this.details.length % this.pagenation.itemsPerPage > 0) {
      max += 1;
    }
    return Math.floor(max);
  }
}
</script>
