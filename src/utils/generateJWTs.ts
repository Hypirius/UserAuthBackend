import jwt, { type SignOptions } from 'jsonwebtoken';
import config from '../config/env.js';

// TODO: Create payload ts type

type accessTokenPayload = {
  username: string;
  fullName: string;
  email: string;
};

function generateAccessToken(payload: accessTokenPayload, options: SignOptions) {
  return jwt.sign(
    {
      typ: 'access',
      ...payload,
      exp_at: Date.now() + config.JWT_ACCESS_DURATION_MINS * 60000,
      iat: Date.now(),
    },

    config.JWT_ACCESS_SECRET,
    options
  );
}

type refreshTokenPayload = {
  userId: number;
};

function generateRefreshToken(payload: refreshTokenPayload, options: SignOptions) {
  return jwt.sign(
    {
      typ: 'refresh',
      ...payload,
      jti: crypto.randomUUID(), // Hash and pass this to db
      revoked: false,
      exp_at: Date.now() + config.JWT_REFRESH_DURATION_DAYS * 8.64e7,
      iat: Date.now(),
    },
    config.JWT_REFRESH_SECRET,
    options
  );
}

export default { generateAccessToken, generateRefreshToken };
