export interface Email {
  address: string;
  email: string;
  artist_address: string | null;
  username: string | null;
}

export interface EmailsResponse {
  emails: Email[];
  next_cursor: string | null;
}

export enum EMAIL_VERIFICATION_STATUS {
  ENTER_EMAIL,
  ENTER_CODE,
  VERIFIED,
}

export interface OtpLoginResponse {
  token: string;
  social_wallet: string;
}
