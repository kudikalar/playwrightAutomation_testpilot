import { unique } from '../../utils/unique';

export interface Report {
  policyNumberEGVhcL000002: string;
  lifeAssuredFullName: string;
  lifeAssuredDateOfBirth: string;
  yourFullName: string;
  relationshipToTheLifeAssured: string;
  email: string;
  mobile10Digits: string;
  identityDocumentVoterIdDrivingLicence: string;
  documentNumberSample: string;
}

/** Report test data (§43). Unique fields (email) are generated per call. */
export class ReportFactory {
  static build(overrides: Partial<Report> = {}): Report {
    return {
      policyNumberEGVhcL000002: unique.text("Policy number e.g. VHC-L-000002"),
      lifeAssuredFullName: unique.text("Life assured — full name"),
      lifeAssuredDateOfBirth: unique.date(),
      yourFullName: unique.text("Your full name"),
      relationshipToTheLifeAssured: unique.text("Relationship to the life assured"),
      email: unique.email(),
      mobile10Digits: unique.phone(),
      identityDocumentVoterIdDrivingLicence: unique.text("Identity document Voter ID Driving licence"),
      documentNumberSample: unique.text("Document number (sample)"),
      ...overrides,
    };
  }

  static buildMany(count: number, overrides: Partial<Report> = {}): Report[] {
    return Array.from({ length: count }, () => ReportFactory.build(overrides));
  }
}
