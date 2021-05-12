<template>
  <v-text-field v-model="search" label="Search" append-icon="fas fa-search" clearable />
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component
export default class TextFieldSearch extends Vue {
  @Prop({ type: String, default: '' }) private readonly value!: string;
  @Emit() private input(value: string) {}

  private get search(): string {
    return this.value;
  }

  private set search(value: string) {
    this.input(value);
  }
}
</script>
