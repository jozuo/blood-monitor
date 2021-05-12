<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on }">
      <v-icon small class="ml-3" color="pink" v-on="on">fa-trash-alt</v-icon>
    </template>
    <v-card>
      <v-card-title class="title grey lighten-2 grey--text text--darken-2 pa-1 pl-4" primary-title>
        Confirm
      </v-card-title>

      <v-card-text class="mt-4 mb-0 pb-0">
        <p>選択された項目を削除します。 <br />よろしいですか?</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="onCancel">キャンセル</v-btn>
        <v-btn color="blue darken-1" text @click="onConfirm">削除</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';

@Component
export default class ButtonListDelete extends Vue {
  @Emit() private click(): void {}

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
