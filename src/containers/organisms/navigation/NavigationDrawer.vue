<template>
  <v-navigation-drawer v-model="drawer" app clipped>
    <v-list dense>
      <v-list-item v-for="item in items" :key="item.text" @click="onClick(item.route)">
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Watch, Prop, Emit } from 'vue-property-decorator';
import router from '@/router';

@Component
export default class NavigationDrawer extends Vue {
  @Prop({ type: Boolean }) private readonly value!: boolean | null;
  @Emit() private input(value: boolean | null) {}

  private get drawer(): boolean | null {
    return this.value;
  }

  private set drawer(value: boolean | null) {
    this.input(value);
  }

  private items = [
    { icon: 'mdi-home', text: 'ホーム', route: 'home' },
    { icon: 'mdi-format-list-bulleted', text: '計測記録', route: 'measure-record' },
    { icon: 'mdi-settings', text: '検査項目設定', route: 'inspection-item' },
    { icon: 'mdi-web', text: '動作検証用', route: 'test' },
  ];

  private onClick(route: string): void {
    router.push({ name: route });
  }
}
</script>
