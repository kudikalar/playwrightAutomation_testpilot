import { unique } from '../../utils/unique';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

/** User test data (§43). Unique fields (email, phone) are generated per call. */
export class UserFactory {
  static build(overrides: Partial<User> = {}): User {
    return {
      firstName: 'Aarav',
      lastName: unique.text('Tester'),
      email: unique.email(),
      phone: unique.phone(),
      ...overrides,
    };
  }

  static buildMany(count: number, overrides: Partial<User> = {}): User[] {
    return Array.from({ length: count }, () => UserFactory.build(overrides));
  }
}
