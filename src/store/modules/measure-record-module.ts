import { MeasureRecord } from '@/models/measure-record';
import MeasureRecordRepository from '@/repositories/measure-record-repository';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import InspectionItem from '../../models/inspection-item';

@Module({ name: 'measureRecord', namespaced: true })
export default class MeasureRecordModule extends VuexModule {
  public editRecordId?: string;
  public records: MeasureRecord[] = [];

  public get registedDates(): string[] {
    return this.records.map((record) => record.date!);
  }

  public get editRecord(): MeasureRecord | undefined {
    if (this.editRecordId) {
      return this.records.find((record) => record.id === this.editRecordId!);
    }
    return undefined;
  }

  public get details() {
    return (inspectionItem: InspectionItem) => {
      return this.records.map((record) => {
        const detail = record.details.find(
          (detail) => detail.inspectionItemId === inspectionItem.id
        );
        return detail ? detail : null;
      });
    };
  }

  @Action
  public async initialize(): Promise<void> {
    const records = await MeasureRecordRepository.getAll();
    this.setup(records);
  }

  @Action
  public async save(record: MeasureRecord): Promise<void> {
    if (!record.id) {
      console.log('post');
      await MeasureRecordRepository.post(record);
    } else {
      console.log('put');
      await MeasureRecordRepository.put(record);
    }
    await this.initialize();
  }

  @Mutation
  public setup(records: MeasureRecord[]): void {
    this.records = records;
  }

  @Mutation
  public setEditNewRecord() {
    this.editRecordId = undefined;
  }

  @Mutation
  public setEditRecordId(editRecordId: string) {
    this.editRecordId = editRecordId;
  }
}
