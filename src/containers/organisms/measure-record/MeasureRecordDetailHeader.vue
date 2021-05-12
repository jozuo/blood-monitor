<template>
  <v-card>
    <v-toolbar flat color="white">
      <v-container fluid fill-height="">
        <v-layout row>
          <v-flex xs2>
            <text-field-date v-model="syncDate" label="計測日" :deniedDates="registedDates" />
          </v-flex>
          <v-flex xs5>
            <v-spacer />
          </v-flex>
          <v-flex xs4>
            <text-field-search v-model="syncSearch" />
          </v-flex>
          <v-flex xs1>
            <v-layout justify-center>
              <button-list-add @click="click" :disabled="!canAdd" />
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-toolbar>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Emit, Prop } from 'vue-property-decorator';
import TextFieldDate from '@/components/atoms/text-field/TextFieldDate.vue';
import TextFieldSearch from '@/components/atoms/text-field/TextFieldSearch.vue';
import ButtonListAdd from '@/components/atoms/button/ButtonListAdd.vue';
import moment from 'moment';

@Component({ components: { TextFieldDate, TextFieldSearch, ButtonListAdd } })
export default class MeasureRecordDetailHeader extends Vue {
  @Prop({ type: Array, required: true }) private readonly unUsedInspectionItemIds!: string[];
  @Prop({ type: Array, required: true }) private readonly registedDates!: string[];
  @PropSync('date', { type: String }) private syncDate!: string;
  @PropSync('search', { type: String, default: '' }) private syncSearch!: string;
  @Emit() private click(): void {}

  private get canAdd(): boolean {
    return this.unUsedInspectionItemIds.length > 0;
  }
}
</script>
