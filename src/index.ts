import * as jwt from 'jsonwebtoken';

export interface EmbedTokenOptions {
  secret: string;
  videoId: string;
  applicationId: string;
  expiresIn?: number;
  allowedOrigins?: string[];
  viewerId?: string;
  sessionId?: string;
  keyId?: string;
}

export interface EmbedTokenClaims {
  vid: string;
  app: string;
  iat: number;
  exp: number;
  org?: string[];
  ses?: string;
  sub?: string;
}

/**
 * Signs an embed token locally for the Gallop Video Player.
 * No HTTP calls are made to ScaleMule.
 */
export function signEmbedToken(options: EmbedTokenOptions): string {
  const {
    secret,
    videoId,
    applicationId,
    expiresIn = 3600,
    allowedOrigins,
    viewerId,
    sessionId,
    keyId = 'k1'
  } = options;

  const now = Math.floor(Date.now() / 1000);

  const claims: EmbedTokenClaims = {
    vid: videoId,
    app: applicationId,
    iat: now,
    exp: now + expiresIn,
    org: allowedOrigins,
    ses: sessionId,
    sub: viewerId
  };

  return jwt.sign(claims, secret, {
    algorithm: 'HS256',
    keyid: keyId,
  });
}
