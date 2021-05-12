<template>
  <v-snackbar v-model="snackbar" color="success" :timeout="3000">
    {{ text }}
    <v-btn icon @click="snackbar = false">
      <v-icon>fa-times-circle</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component
export default class SnackbarSuccess extends Vue {
  @Prop({ type: Boolean, required: true }) private readonly value!: boolean;
  @Prop({ type: String, required: true }) private readonly text!: string;
  @Emit() private input(value: boolean): void {}

  private get snackbar(): boolean {
    return this.value;
  }

  private set snackbar(value: boolean) {
    this.input(value);
  }
}
</script>
