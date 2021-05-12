<template>
  <v-card>
    <v-toolbar flat color="white">
      <v-container fluid fill-height>
        <v-layout row>
          <v-flex xs7>
            <v-toolbar-title>検査項目管理</v-toolbar-title>
            <v-divider class="mx-4" inset vertical />
            <v-spacer></v-spacer>
          </v-flex>
          <v-flex xs4>
            <text-field-search v-model="syncSearch" />
          </v-flex>
          <v-flex xs1>
            <v-layout justify-center>
              <button-list-add @click.stop="addItem" />
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-toolbar>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Emit } from 'vue-property-decorator';
import { inspectionItemModule } from '@/store/store';
import TextFieldSearch from '@/components/atoms/text-field/TextFieldSearch.vue';
import ButtonListAdd from '@/components/atoms/button/ButtonListAdd.vue';

@Component({ components: { TextFieldSearch, ButtonListAdd } })
export default class InspectionItemHeader extends Vue {
  @PropSync('search', { type: String }) private syncSearch!: string | null;
  @Emit() private addItem() {}
}
</script>
