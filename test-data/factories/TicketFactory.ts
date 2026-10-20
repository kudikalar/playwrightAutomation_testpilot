import { unique } from '../../utils/unique';

export interface Ticket {
  id: string;
  createdAt: string;
  updatedAt: string;
  reference: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  category: string;
  subject: string;
  priority: string;
  status: string;
  channel: string;
  relatedRef: string;
  source: string;
}

/** Ticket test data (§43). Unique fields (reference, customerEmail, relatedRef) are generated per call. */
export class TicketFactory {
  static build(overrides: Partial<Ticket> = {}): Ticket {
    return {
      id: unique.text("id"),
      createdAt: unique.text("createdAt"),
      updatedAt: unique.date(),
      reference: unique.id('EMP'),
      userId: unique.text("userId"),
      customerName: unique.text("customerName"),
      customerEmail: unique.email(),
      category: unique.text("category"),
      subject: unique.text("subject"),
      priority: unique.text("priority"),
      status: 'Active',
      channel: unique.text("channel"),
      relatedRef: unique.text("relatedRef"),
      source: unique.text("source"),
      ...overrides,
    };
  }

  static buildMany(count: number, overrides: Partial<Ticket> = {}): Ticket[] {
    return Array.from({ length: count }, () => TicketFactory.build(overrides));
  }
}
