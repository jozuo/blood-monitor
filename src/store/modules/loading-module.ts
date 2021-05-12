import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({ name: 'loading', namespaced: true })
export default class LoadingModule extends VuexModule {
  public isLoading: boolean = false;

  @Mutation
  public setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }
}
