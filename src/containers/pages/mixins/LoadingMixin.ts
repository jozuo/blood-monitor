import { loadingModule } from '@/store/store';
import 'vue-loading-overlay/dist/vue-loading.css';
import { Component, Vue } from 'vue-property-decorator';

// tslint:disable-next-line:no-var-requires
const Loading = require('vue-loading-overlay');
// tslint:enable

@Component({ components: { Loading } })
export default class LoadingMixin extends Vue {
  private get loading(): boolean {
    return loadingModule.isLoading;
  }
}
