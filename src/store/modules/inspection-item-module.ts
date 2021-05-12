import InspectionItem from '@/models/inspection-item';
import InspectionItemRepository from '@/repositories/inspection-item-repository';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

const DEFAULT_ITEM_ID: string = '';

@Module({ name: 'inspectionItem', namespaced: true })
export default class InspectionItemModule extends VuexModule {
  public items: InspectionItem[] = [];
  public search: string = '';
  public selectedItemId: string = DEFAULT_ITEM_ID;

  public get isEditNewItem(): boolean {
    return this.selectedItemId === DEFAULT_ITEM_ID;
  }

  public get selectedItem(): InspectionItem {
    return this.items.find((item) => item.id === this.selectedItemId)!;
  }

  public get names(): string[] {
    const result = this.items.map((item) => item.name);
    return result;
  }

  public get findByName() {
    return (name: string) => {
      return this.items.find((item) => item.name === name);
    };
  }

  @Action
  public async initialize() {
    const items = await InspectionItemRepository.getAll();
    this.setup(items);
  }

  @Action
  public async save(item: InspectionItem) {
    if (item.id === DEFAULT_ITEM_ID) {
      await InspectionItemRepository.post(item);
    } else {
      await InspectionItemRepository.put(item);
    }
    await this.initialize();
  }

  @Action
  public async delete(item: InspectionItem) {
    await InspectionItemRepository.delete(item);
    await this.initialize();
  }

  @Mutation
  private setup(items: InspectionItem[]) {
    this.items = items;
  }

  @Mutation
  public setSearch(search: string) {
    this.search = search;
  }

  @Mutation
  public setSelectedItemId(itemId: string) {
    this.selectedItemId = itemId;
  }

  @Mutation
  public clearSelectedItemId() {
    this.selectedItemId = DEFAULT_ITEM_ID;
  }
}
