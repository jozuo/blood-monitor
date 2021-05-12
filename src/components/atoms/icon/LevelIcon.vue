<template>
  <span fill-height class="ma-0 pa-0">
    <v-icon color="blue" :size="size" v-if="level === 'low'">mdi-arrow-down-circle-outline</v-icon>
    <v-icon color="red" :size="size" v-else-if="level === 'high'"
      >mdi-arrow-up-circle-outline</v-icon
    >
    <v-icon color="green" :size="size" v-else-if="level === 'normal'"
      >mdi-check-circle-outline</v-icon
    >
    <v-icon :size="size" v-else>mdi-blank</v-icon>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from 'vue-property-decorator';

const NO_VALUE = -1;

type Level = 'low' | 'normal' | 'high' | 'none';

@Component
export default class LevelIcon extends Vue {
  @Prop({ default: NO_VALUE }) private readonly value?: number | string;
  @Prop({ type: Number, default: NO_VALUE }) private readonly low?: number;
  @Prop({ type: Number, default: NO_VALUE }) private readonly high?: number;
  @Prop({ type: String, default: '' }) private readonly size?: string;

  private get level(): Level {
    if (!this.num || !this.low || !this.high) {
      return 'none';
    }
    if (this.num < this.low) {
      return 'low';
    }
    if (this.num > this.high) {
      return 'high';
    }
    return 'normal';
  }

  private get num(): number {
    return Number(this.value);
  }
}
</script>
