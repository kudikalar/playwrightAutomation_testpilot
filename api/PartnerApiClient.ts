import type { APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import type { Schema } from '../utils/schema';

/** Partners API — generated from 6 endpoint(s) observed in live traffic. */
export class PartnerApiClient extends BaseApiClient {
  /** GET /api/partners/public/categories — observed 200, avg 257 ms; used by Compare insurance, Compare insurance, No update on my reimbursement claim */
  async getPartnersPublicCategories(): Promise<APIResponse> {
    return this.request.get("/api/partners/public/categories");
  }

  /** GET /api/partners/wallet/policies/pol_26b0b06501d2 — observed 200, avg 255 ms; used by VHC-L-000002, VHC-L-000002 */
  async getPartnersWalletPoliciesPol26b0b06501d2(): Promise<APIResponse> {
    return this.request.get("/api/partners/wallet/policies/pol_26b0b06501d2");
  }

  /** GET /api/partners/wallet — observed 200, avg 252 ms; used by My policies */
  async getPartnersWallet(): Promise<APIResponse> {
    return this.request.get("/api/partners/wallet");
  }

  /** GET /api/partners/portability — observed 200, avg 245 ms; used by Portability & migration */
  async getPartnersPortability(): Promise<APIResponse> {
    return this.request.get("/api/partners/portability");
  }

  /** GET /api/partners/wallet/policies/pol_39f05f4b5159 — observed 200, avg 251 ms; used by VHC-H-000001 */
  async getPartnersWalletPoliciesPol39f05f4b5159(): Promise<APIResponse> {
    return this.request.get("/api/partners/wallet/policies/pol_39f05f4b5159");
  }

  /** GET /api/partners/public/insurers — observed 200, avg 282 ms; used by Health insurance, explained honestly. */
  async getPartnersPublicInsurers(): Promise<APIResponse> {
    return this.request.get("/api/partners/public/insurers");
  }
}

/** Response schemas inferred from traffic (§37) — used for contract assertions. */
export const partnersSchemas: Record<string, Schema> = {
  getPartnersPublicCategories: {"type":"array","items":{"type":"object","fields":{"key":{"type":"string"},"label":{"type":"string"},"description":{"type":"string"},"order":{"type":"number"},"productCount":{"type":"number"}}}},
  getPartnersWalletPoliciesPol26b0b06501d2: {"type":"object","fields":{"policyId":{"type":"string"},"policyNumber":{"type":"string"},"insurerPolicyReference":{"type":"null"},"insurer":{"type":"object","fields":{"id":{"type":"string"},"name":{"type":"string"},"sandbox":{"type":"boolean"}}},"uin":{"type":"string"},"planVersion":{"type":"number"},"currentPlanVersion":{"type":"number"},"sandbox":{"type":"boolean"},"product":{"type":"string"},"planName":{"type":"string"},"planType":{"type":"string"},"status":{"type":"string"},"coveredMembers":{"type":"array","items":{"type":"object","fields":{"fullName":{"type":"string"},"relationship":{"type":"string"},"dob":{"type":"string","format":"date"}}}},"sumInsured":{"type":"number"},"sharedFloater":{"type":"boolean"},"effectiveDate":{"type":"string","format":"date"},"endDate":{"type":"string","format":"date"},"renewalDate":{"type":"string","format":"date"},"premium":{"type":"object","fields":{"annual":{"type":"number"},"installment":{"type":"number"},"frequency":{"type":"string"},"tax":{"type":"object","fields":{"inclusive":{"type":"boolean"},"gstBp":{"type":"number"},"netPremium":{"type":"number"},"gst":{"type":"number"},"total":{"type":"number"}}}}},"importantExclusions":{"type":"array","items":{"type":"string"}},"claimsContacts":{"type":"array","items":{"type":"object","fields":{"kind":{"type":"string"},"name":{"type":"string"},"phone":{"type":"string|null","optional":true},"email":{"type":"string","format":"email","optional":true},"hours":{"type":"string","optional":true},"link":{"type":"string","optional":true}}}},"documents":{"type":"object","fields":{"policyPdf":{"type":"string"},"cis":{"type":"string"},"wording":{"type":"string"},"ecard":{"type":"null"}}},"networkHospitalsLink":{"type":"null"},"renewal":{"type":"null"},"servicing":{"type":"array","items":{"type":"object","fields":{"action":{"type":"string"},"label":{"type":"string"},"link":{"type":"string"}}}}}},
  getPartnersWallet: {"type":"object","fields":{"policies":{"type":"array","items":{"type":"object","fields":{"policyId":{"type":"string"},"policyNumber":{"type":"string"},"insurerPolicyReference":{"type":"null"},"insurer":{"type":"object","fields":{"id":{"type":"string"},"name":{"type":"string"},"sandbox":{"type":"boolean"}}},"uin":{"type":"string"},"planVersion":{"type":"number"},"currentPlanVersion":{"type":"number"},"sandbox":{"type":"boolean"},"product":{"type":"string"},"planName":{"type":"string"},"planType":{"type":"string"},"status":{"type":"string"},"coveredMembers":{"type":"array","items":{"type":"object","fields":{"fullName":{"type":"string"},"relationship":{"type":"string"},"dob":{"type":"string","format":"date"}}}},"sumInsured":{"type":"number"},"sharedFloater":{"type":"boolean"},"effectiveDate":{"type":"string","format":"date"},"endDate":{"type":"string","format":"date"},"renewalDate":{"type":"string","format":"date"},"premium":{"type":"object","fields":{"annual":{"type":"number"},"installment":{"type":"number|null"},"frequency":{"type":"string"},"tax":{"type":"object","fields":{"inclusive":{"type":"boolean"},"gstBp":{"type":"number"},"netPremium":{"type":"number"},"gst":{"type":"number"},"total":{"type":"number"}}}}},"importantExclusions":{"type":"array","items":{"type":"string"}},"claimsContacts":{"type":"array","items":{"type":"object","fields":{"kind":{"type":"string"},"name":{"type":"string"},"phone":{"type":"string|null","optional":true},"email":{"type":"string","format":"email","optional":true},"hours":{"type":"string","optional":true},"link":{"type":"string","optional":true}}}},"documents":{"type":"object","fields":{"policyPdf":{"type":"string"},"cis":{"type":"string"},"wording":{"type":"string"},"ecard":{"type":"null|string"}}},"networkHospitalsLink":{"type":"null|string"},"renewal":{"type":"null|object"},"servicing":{"type":"array","items":{"type":"object","fields":{"action":{"type":"string"},"label":{"type":"string"},"link":{"type":"string"}}}}}}},"activeSumInsured":{"type":"object","fields":{"total":{"type":"number"},"perPolicy":{"type":"array","items":{"type":"object","fields":{"policyNumber":{"type":"string"},"sumInsured":{"type":"number"},"sharedFloater":{"type":"boolean"},"members":{"type":"number"}}}},"qualifier":{"type":"string"}}}}},
  getPartnersPortability: {"type":"array","items":{"type":"unknown"}},
  getPartnersWalletPoliciesPol39f05f4b5159: {"type":"object","fields":{"policyId":{"type":"string"},"policyNumber":{"type":"string"},"insurerPolicyReference":{"type":"null"},"insurer":{"type":"object","fields":{"id":{"type":"string"},"name":{"type":"string"},"sandbox":{"type":"boolean"}}},"uin":{"type":"string"},"planVersion":{"type":"number"},"currentPlanVersion":{"type":"number"},"sandbox":{"type":"boolean"},"product":{"type":"string"},"planName":{"type":"string"},"planType":{"type":"string"},"status":{"type":"string"},"coveredMembers":{"type":"array","items":{"type":"object","fields":{"fullName":{"type":"string"},"relationship":{"type":"string"},"dob":{"type":"string","format":"date"}}}},"sumInsured":{"type":"number"},"sharedFloater":{"type":"boolean"},"effectiveDate":{"type":"string","format":"date"},"endDate":{"type":"string","format":"date"},"renewalDate":{"type":"string","format":"date"},"premium":{"type":"object","fields":{"annual":{"type":"number"},"installment":{"type":"null"},"frequency":{"type":"string"},"tax":{"type":"object","fields":{"inclusive":{"type":"boolean"},"gstBp":{"type":"number"},"netPremium":{"type":"number"},"gst":{"type":"number"},"total":{"type":"number"}}}}},"importantExclusions":{"type":"array","items":{"type":"string"}},"claimsContacts":{"type":"array","items":{"type":"object","fields":{"kind":{"type":"string"},"name":{"type":"string"},"phone":{"type":"string|null","optional":true},"email":{"type":"string","format":"email","optional":true},"hours":{"type":"string","optional":true},"link":{"type":"string","optional":true}}}},"documents":{"type":"object","fields":{"policyPdf":{"type":"string"},"cis":{"type":"string"},"wording":{"type":"string"},"ecard":{"type":"string"}}},"networkHospitalsLink":{"type":"string"},"renewal":{"type":"object","fields":{"state":{"type":"string"},"label":{"type":"string"},"daysToEnd":{"type":"number"},"graceEnds":{"type":"string","format":"date"}}},"servicing":{"type":"array","items":{"type":"object","fields":{"action":{"type":"string"},"label":{"type":"string"},"link":{"type":"string"}}}}}},
  getPartnersPublicInsurers: {"type":"array","items":{"type":"object","fields":{"id":{"type":"string"},"name":{"type":"string"},"sandbox":{"type":"boolean"},"type":{"type":"string"}}}},
};
