import { doubleCsrf } from "csrf-csrf";

export const { generateCsrfToken, doubleCsrfProtection } = doubleCsrf({
  getSecret = (req) => process.env.CSRFCSRF_SECRET || "supersecretkey",
  getSessionIdentifier = (req) => req.user.sid,
  cookieName: "__Host-psifi.x-csrf-token",
  cookieOptions: {
    sameSite = "None",
    path = "/",
    secure = true,
    httpOnly = true,
  }
});