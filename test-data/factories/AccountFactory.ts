import { unique } from '../../utils/unique';

export interface Account {
  firstName: string;
  lastNameOptional: string;
  emailAddress: string;
  mobileNumber91: string;
  passwordShow: string;
  confirmPasswordShow: string;
  iAcceptTheTermsOfUseAndAcknowledgeThePrivacyNotice: string;
  sendMeProductNewsAndOffersOptial: string;
}

/** Account test data (§43). Unique fields (emailAddress) are generated per call. */
export class AccountFactory {
  static build(overrides: Partial<Account> = {}): Account {
    return {
      firstName: 'Aarav',
      lastNameOptional: unique.text('Tester'),
      emailAddress: unique.email(),
      mobileNumber91: unique.phone(),
      passwordShow: unique.text("Password Show"),
      confirmPasswordShow: unique.text("Confirm password Show"),
      iAcceptTheTermsOfUseAndAcknowledgeThePrivacyNotice: unique.text("I accept the terms of use and acknowledge the privacy notice."),
      sendMeProductNewsAndOffersOptial: unique.text("Send me product news and offers (optial)."),
      ...overrides,
    };
  }

  static buildMany(count: number, overrides: Partial<Account> = {}): Account[] {
    return Array.from({ length: count }, () => AccountFactory.build(overrides));
  }
}
