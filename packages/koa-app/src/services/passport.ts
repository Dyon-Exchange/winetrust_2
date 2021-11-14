import { sign, verify } from "jsonwebtoken";
import Passport from "koa-passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import Admin from "../models/Admin";

interface RefreshToken {
  id: string;
  iat: number;
  exp: number;
}

export default (p: { use: (arg0: Strategy) => void }) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET,
  };

  p.use(
    new Strategy(opts, async (payload, done) => {
      const user = await Admin.findById(payload.id);

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })
  );
};

// wrapper to protect routes where user auth is required
export function authRequired(router: any): void {
  router.use(Passport.authenticate("jwt", { session: false }));
}

// function to process new tokens from a refresh token
export async function processRefreshToken(refreshToken: any) {
  const decoded: RefreshToken = await new Promise((resolve, reject) => {
    verify(
      refreshToken,
      process.env.REFRESH_SECRET,
      (err: Error, d: RefreshToken) => {
        if (err) {
          reject(err);
        } else {
          resolve(d);
        }
      }
    );
  });

  const admin = await Admin.findById(decoded.id);

  const payload = {
    id: admin._id,
  };

  const token = sign(payload, process.env.TOKEN_SECRET, { expiresIn: 36000 });
  const newRefreshToken = sign(payload, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { token, refreshToken: newRefreshToken };
}
