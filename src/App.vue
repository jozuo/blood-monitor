<template>
  <v-app>
    <navigation-drawer v-model="drawer" />
    <app-bar v-model="drawer" />
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import NavigationDrawer from '@/containers/organisms/navigation/NavigationDrawer.vue';
import AppBar from '@/containers/organisms/navigation/AppBar.vue';
import { inspectionItemModule, measureRecordModule } from '@/store/store';

@Component({ components: { NavigationDrawer, AppBar } })
export default class App extends Vue {
  // 表示: true, 非表示: false
  // 初期値:null にすると、サイズに応じて初期設定されるっぽい
  private drawer: boolean | null = null;

  private async created(): Promise<void> {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    Promise.all([inspectionItemModule.initialize()]);
  }
}
</script>
