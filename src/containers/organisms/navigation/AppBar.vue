<template>
  <v-app-bar app clipped-left color="red" dense>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-icon class="mx-4" color="yellow lighten-2">fas fa-chart-line</v-icon>
    <v-toolbar-title class="mr-12 align-center">
      <span class="title white--text">Blood Monitor</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component
export default class AppBar extends Vue {
  @Prop({ type: Boolean }) private readonly value!: boolean | null;
  @Emit() private input(value: boolean | null) {}

  private get drawer(): boolean | null {
    return this.value;
  }

  private set drawer(value: boolean | null) {
    this.input(value);
  }
}
</script>
