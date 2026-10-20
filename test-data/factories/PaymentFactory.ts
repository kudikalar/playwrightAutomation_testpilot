import { unique } from '../../utils/unique';

export interface Payment {
  slug: string;
  title: string;
  category: string;
  body: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  reference: string;
  purpose: string;
  targetKey: string;
  applicationId: string;
  userId: string;
  amount: string;
  status: string;
}

/** Payment test data (§43). Unique fields (reference) are generated per call. */
export class PaymentFactory {
  static build(overrides: Partial<Payment> = {}): Payment {
    return {
      slug: unique.text("slug"),
      title: 'QA Engineer',
      category: unique.text("category"),
      body: unique.text("body"),
      id: unique.text("id"),
      createdAt: unique.text("createdAt"),
      updatedAt: unique.date(),
      reference: unique.id('EMP'),
      purpose: unique.text("purpose"),
      targetKey: unique.text("targetKey"),
      applicationId: unique.text("applicationId"),
      userId: unique.text("userId"),
      amount: '50000',
      status: 'Active',
      ...overrides,
    };
  }

  static buildMany(count: number, overrides: Partial<Payment> = {}): Payment[] {
    return Array.from({ length: count }, () => PaymentFactory.build(overrides));
  }
}
