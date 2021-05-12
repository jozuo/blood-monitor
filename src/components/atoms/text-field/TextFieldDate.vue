<template>
  <v-menu v-model="menu" :close-on-content-click="false" max-width="290">
    <template v-slot:activator="{ on }">
      <v-text-field :value="formatedDate" :label="label" readonly v-on="on" />
    </template>
    <v-date-picker
      v-model="date"
      @change="menu = false"
      no-title
      scrollable
      locale="ja-jp"
      :day-format="dayFormat"
      :allowed-dates="allowedDate"
    />
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Prop, Emit, Watch } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class TextFieldDate extends Vue {
  @Prop({ type: String, default: '' }) private readonly value!: string;
  @Emit() public input(value: string | null) {}
  @Prop({ type: String, required: true }) private readonly label!: string;
  @Prop({ type: Array, default: () => [] }) private readonly deniedDates!: string[];

  private menu: boolean = false;

  private get formatedDate(): string {
    return this.value ? moment(this.value).format('YYYY/MM/DD') : '';
  }

  private get date(): string | null {
    return this.value;
  }

  private set date(value: string | null) {
    this.input(value);
  }

  private dayFormat(value: string): number {
    return new Date(value).getDate();
  }

  private allowedDate(date: string) {
    if (this.deniedDates) {
      return this.deniedDates.indexOf(date) < 0;
    }
    return true;
  }
}
</script>
