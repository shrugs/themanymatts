import { sign } from 'jsonwebtoken';

const AUD = 'drop.nifti.es';
const ISS = 'ootmm';

export function signMintGrant(id: string) {
  return sign(
    { grant: { type: 'mint', ids: [id], amounts: ['0x1'] } },
    process.env.SIGNER_PRIVATE_KEY,
    { algorithm: 'ES256', audience: AUD, issuer: ISS },
  );
}
