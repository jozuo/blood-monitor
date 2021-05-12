import InspectionItem from '@/models/inspection-item';
import uuidv4 from 'uuid/v4';

export default class InspectionItemRepository {
  private static items: InspectionItem[] = [
    {
      id: 'd0ba2b7f-338e-46ca-af61-944f293d61c2',
      name: 'Na-PS',
      nameJa: 'ナトリウム',
      unit: 'mEq/l',
      low: 137,
      high: 150,
      description:
        '細胞の浸透圧調節や体内の酸-塩基平衡(pH)調節、神経伝達など重要な機能を担っている。',
    },
    {
      id: '9754de5f-8fab-49b0-aef8-88d769fa63fd',
      name: 'K-PS',
      nameJa: 'カリウム',
      unit: 'mEq/l',
      low: 3.4,
      high: 5.2,
      description:
        '細胞の浸透圧調節や体内の酸-塩基平衡(pH)調節、神経伝達など重要な機能を担っている。',
    },
    {
      id: 'ac65e2d4-9345-4ffd-bcd7-35b40020102e',
      name: 'CI-PS',
      nameJa: 'クロール',
      unit: 'mEq/l',
      low: 102,
      high: 117,
      description:
        '細胞の浸透圧調節や体内の酸-塩基平衡(pH)調節、神経伝達など重要な機能を担っている。',
    },
    {
      id: 'eced1718-1e95-4b47-8bec-bd21177075d2',
      name: 'GLU-PS',
      nameJa: '血糖値',
      unit: 'mg/dl',
      low: 50,
      high: 124,
      description: '興奮などのストレスやステロイドの影響により上昇する場合もある。',
    },
    {
      id: 'c8658f27-00ee-4e98-bfdf-aff132eadf47',
      name: 'GPT-PS',
      nameJa: 'トランスアミラーゼ',
      unit: 'U/l',
      low: 13,
      high: 53,
      description: '肝細胞障害や破壊が起こると血液中に放出される。',
    },
    {
      id: '7b30b553-68b7-43ff-8a13-28d68f93c994',
      name: 'ALP-PS',
      nameJa: 'アルカリフォスファターゼ',
      unit: 'U/l',
      low: 14,
      high: 142,
      description: '主に胆道系疾患（胆汁鬱滞、胆管肝炎など）で上昇する肝酵素。',
    },
    {
      id: '9dd17089-a16d-406a-8ae9-d3ebcf60e218',
      name: 'TCHO-PS',
      nameJa: '総コレステロール',
      unit: 'mg/dl',
      low: 70,
      high: 303,
      description: '生体の主要脂質成分であるコレステロールの血液中の総量。',
    },
    {
      id: 'aeddfc10-7667-4c0a-be76-e679a1739889',
      name: 'BUN-PS',
      nameJa: '尿素窒素',
      unit: 'mg/dl',
      low: 4.8,
      high: 31.4,
      description: '臓から排泄される代謝産物で、腎機能の低下や消化管内出血などで上昇する。',
    },
    {
      id: '02a4d7c6-9f02-401e-bb9b-57279e4243e0',
      name: 'CRE-PS',
      nameJa: 'クレアチニン',
      unit: 'mg/dl',
      low: 0.2,
      high: 1.6,
      description: '腎臓から排泄される代謝産物で、腎機能が激しく低下すると上昇する。',
    },
    {
      id: '4c1a036e-c745-406a-9731-6395588a41d9',
      name: 'ALB-PS',
      nameJa: 'アルブミン',
      unit: 'g/dl',
      low: 2.2,
      high: 2.4,
      description:
        '血液中に多く含まれる蛋白質。上昇は脱水、低下は肝臓、腎臓、腸などの疾患や出血などが疑われる。',
    },
    {
      id: 'c38ebc1b-ecaf-4c43-aa8f-ab4a28f0f6ee',
      name: 'Ca-PS',
      nameJa: 'カルシウム',
      unit: 'mg/dl',
      low: 5.2,
      high: 11.3,
      description:
        '骨代謝や筋肉の収縮、血液凝固などに関与。主に腎臓や副甲状腺の疾患などで変動する。',
    },
    {
      id: '90832936-d44a-49b1-8c28-67de92b58ae4',
      name: 'WBC',
      nameJa: '白血球数',
      unit: '10^2/uL',
      low: 60,
      high: 170,
      description: '体内に炎症があるときや血液疾患の時に数値の変動がみられる。',
    },
    {
      id: '6a300bc8-d776-4fa7-9085-fa260ae88764',
      name: 'RBC',
      nameJa: '赤血球数',
      unit: '10^4/uL',
      low: 550,
      high: 850,
      description: '貧血の有無や程度の判断に利用。',
    },
    {
      id: '41ff7664-6619-4284-aed9-a901a55c0204',
      name: 'HGB',
      nameJa: '血色素(ヘモグロビン)',
      unit: 'g/dL',
      low: 12,
      high: 18,
      description: '貧血や多血症の診断など、全身の状態判断に利用。',
    },
    {
      id: '774d2a1b-36be-4fe5-a273-a080f3feab05',
      name: 'HCT',
      nameJa: 'ヘマトクリット',
      unit: '%',
      low: 37,
      high: 55,
      description: '貧血の有無や程度の判断に利用。',
    },
    {
      id: 'acbd5c47-aa11-463e-bcaf-bc3b208e6194',
      name: 'SDMA',
      nameJa: 'IDEXX SDMA',
      unit: 'ug/dL',
      low: 0,
      high: 14,
      description:
        '腎臓から排泄される代謝産物で、早期の腎疾患の発見を可能にする犬猫の新しい腎機能マーカー。',
    },
    {
      id: '8cadccdd-1f69-4f2d-9c55-79815e70eade',
      name: 'MCV',
      nameJa: '平均赤血球容積',
      unit: 'fL',
      low: 60,
      high: 77,
      description: '赤血球1個当たりの、平均的な大きさ',
    },
    {
      id: 'acea72ec-bd1c-4fc2-8803-4dd1c3fe477e',
      name: 'MCH',
      nameJa: '平均赤血球血色素量',
      unit: 'pg',
      low: 28,
      high: 34,
      description: '赤血球1個当たりの、平均ヘモグロビン量',
    },
    {
      id: '5bf73ec0-b2bc-4833-84b2-49fe5e0af94c',
      name: 'MCHC',
      nameJa: '平均赤血球血色素濃度',
      unit: '%',
      low: 30.2,
      high: 35.1,
      description: '赤血球1個当たりの、平均ヘモグロビン濃度',
    },
    {
      id: 'beafc3e4-1bce-4133-bf39-1d4716346f28',
      name: 'PLT',
      nameJa: '血小板数',
      unit: '10*4/mm',
      low: 20,
      high: 50,
      description: '血小板数',
    },
  ];

  public static async getAll(): Promise<InspectionItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.items);
      }, 1000);
    });
  }

  public static async post(item: InspectionItem): Promise<InspectionItem> {
    const registedItem = await this.regist(item);
    registedItem.id = uuidv4();
    this.items.push(registedItem);
    return registedItem;
  }

  public static async put(item: InspectionItem): Promise<InspectionItem> {
    await this.regist(item);
    const target = this.items.find((value) => value.id === item.id)!;
    Object.assign(target, item);
    return item;
  }

  public static async delete(item: InspectionItem): Promise<InspectionItem> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let idx = 0;
        this.items.forEach((value, index) => {
          if (value.id === item.id) {
            idx = index;
          }
        });
        this.items.splice(idx, 1);
        resolve();
      }, 1000);
    });
  }

  private static async regist(item: InspectionItem): Promise<InspectionItem> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(item), 1000);
    });
  }
}
