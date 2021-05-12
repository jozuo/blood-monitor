export interface MeasureRecordDetail {
  id: string | undefined;
  inspectionItemId: string;
  measuredValue: number;
}

export interface MeasureRecord {
  id: string | undefined;
  date: string | null;
  details: MeasureRecordDetail[];
  createdAt: string | undefined;
  updatedAt: string | undefined;
}
