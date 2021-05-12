import InspectionItemModule from '@/store/modules/inspection-item-module';
import LoadingModule from '@/store/modules/loading-module';
import MeasureRecordModule from '@/store/modules/measure-record-module';
import Vue from 'vue';
import Vuex from 'vuex';
import { getModule } from 'vuex-module-decorators';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
});

const store = new Vuex.Store({
  modules: {
    loading: LoadingModule,
    inspectionItem: InspectionItemModule,
    measureRecord: MeasureRecordModule,
  },
  plugins: [vuexLocal.plugin],
});

export default store;
export const inspectionItemModule = getModule(InspectionItemModule, store);
export const loadingModule = getModule(LoadingModule, store);
export const measureRecordModule = getModule(MeasureRecordModule, store);
