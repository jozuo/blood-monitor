<template>
  <v-layout>
    <v-flex xs6 class="mt-2">
      <button-back :confirm="changed" @click="back" />
    </v-flex>
    <v-flex xs6 class="mt-2">
      <v-layout justify-end>
        <v-btn :disabled="!changed" @click="cancel">キャンセル</v-btn>
        <v-btn color="info" :disabled="!changed" @click="save" class="ml-3">保存</v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import ButtonBack from '@/components/atoms/button/ButtonBack.vue';

@Component({ components: { ButtonBack } })
export default class MeasureRecordDetailFooter extends Vue {
  @Prop({ type: Boolean, required: true }) private readonly changed!: boolean;
  @Emit() private back(): void {}
  @Emit() private cancel(): void {}
  @Emit() private save(): void {}
}
</script>
