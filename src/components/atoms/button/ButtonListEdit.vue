<template>
  <v-icon small color="teal" @click="click">fa-edit</v-icon>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';

@Component
export default class ButtonListEdit extends Vue {
  @Emit() private click(): void {}
}
</script>
