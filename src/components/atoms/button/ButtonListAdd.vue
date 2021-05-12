<template>
  <span>
    <template>
      <v-btn fab small color="info" @click="click" :disabled="disabled"
        ><v-icon>fa-plus</v-icon></v-btn
      >
    </template>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component
export default class ButtonListAdd extends Vue {
  @Emit() private click(): void {}
  @Prop({ type: Boolean, default: false }) private readonly disabled!: boolean;
}
</script>
