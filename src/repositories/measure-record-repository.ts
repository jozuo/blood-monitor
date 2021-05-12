import { MeasureRecord } from '@/models/measure-record';
import moment from 'moment';
import uuidv4 from 'uuid/v4';

const STORAGE_KEY = 'MeasureRecordRepository';

export default class MeasureRecordRepository {
  public static async getAll(): Promise<MeasureRecord[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storageData = localStorage.getItem(STORAGE_KEY);
        const records: MeasureRecord[] = storageData ? JSON.parse(storageData) : [];
        records.sort((record1, record2) => {
          return moment(record1.date!).isAfter(moment(record2.date!)) ? 1 : -1;
        });
        resolve(records);
      }, 1000);
    });
  }

  public static async post(record: MeasureRecord): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        let records = await this.getAll();
        record.id = uuidv4();
        record.createdAt = moment().format();
        record.updatedAt = moment().format();
        records.push(record);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
        resolve();
      }, 500);
    });
  }

  public static async put(record: MeasureRecord): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        let records = await this.getAll();
        const target = records.find((item) => item.id === record.id);
        Object.assign(target, record);
        record.updatedAt = moment().format();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
        resolve();
      }, 500);
    });
  }
}
