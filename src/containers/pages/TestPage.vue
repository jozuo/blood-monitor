<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs3>
        <text-field-search v-model="search" />
      </v-flex>
      <v-flex xs1 class="ml-3">
        <button-list-add />
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3>
        <text-field-date v-model="date" label="計測日" />
      </v-flex>
      <v-flex xs4>
        <level-icon v-model="value" :low="low" :high="high" />
        <span>value: {{ value }}, </span>
        <span>low: {{ low }}, </span>
        <span>high: {{ high }}</span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TextFieldSearch from '@/components/atoms/text-field/TextFieldSearch.vue';
import ButtonListAdd from '@/components/atoms/button/ButtonListAdd.vue';
import TextFieldDate from '@/components/atoms/text-field/TextFieldDate.vue';
import LevelIcon from '@/components/atoms/icon/LevelIcon.vue';
import moment from 'moment';

@Component({ components: { TextFieldSearch, ButtonListAdd, TextFieldDate, LevelIcon } })
export default class TestPage extends Vue {
  private search: string = '';
  private date: string | null = null;
  private value: number = 130;
  private low: number = 90;
  private high: number = 110;
}
</script>
