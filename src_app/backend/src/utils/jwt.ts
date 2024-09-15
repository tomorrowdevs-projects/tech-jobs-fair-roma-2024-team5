import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Non usare una chiave segreta statica in produzione

export const signJwt = (userId: number) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};


export function verifyJwt(token: string): string | JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET);  // Restituisce string | JwtPayload
  } catch (e) {
    return null;
  }
}
