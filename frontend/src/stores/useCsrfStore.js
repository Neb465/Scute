let token = null

export const csrfToken = {
  get: () => token,
  set: (newToken) => { token = newToken; },
  clear: () => { token = null; }
}