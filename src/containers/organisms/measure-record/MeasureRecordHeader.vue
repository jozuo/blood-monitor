<template>
  <div>
    <v-layout justify-end class="mr-2">
      <button-list-add @click="click" />
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import ButtonListAdd from '@/components/atoms/button/ButtonListAdd.vue';

@Component({ components: { ButtonListAdd } })
export default class MeasureRecordHeader extends Vue {
  @Emit() private click(): void {}
}
</script>
