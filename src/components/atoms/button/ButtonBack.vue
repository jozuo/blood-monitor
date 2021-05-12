<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on }">
      <v-btn v-if="confirm" v-on="on">戻る</v-btn>
      <v-btn v-else @click="click">戻る</v-btn>
    </template>
    <v-card>
      <v-card-title class="title grey lighten-2 grey--text text--darken-2 pa-1 pl-4" primary-title>
        Confirm
      </v-card-title>

      <v-card-text class="mt-4 mb-0 pb-0">
        <p>更新内容が破棄されます。<br />よろしいですか?</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="onCancel">キャンセル</v-btn>
        <v-btn color="blue darken-1" text @click="onConfirm">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component
export default class ButtonBack extends Vue {
  @Emit() private click(): void {}
  @Prop({ type: Boolean, default: false }) private readonly confirm!: boolean;

  private dialog: boolean = false;

  private onCancel(): void {
    this.dialog = false;
  }

  private onConfirm(): void {
    this.dialog = false;
    this.click();
  }
}
</script>
