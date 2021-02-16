import { ethers } from 'ethers';
import { sign } from 'jsonwebtoken';

const audience = 'drop.nifti.es';
const issuer = 'ootmm';

const DECIMALS = ethers.BigNumber.from(2);
const ONE = ethers.BigNumber.from(1);
const SATS_PER_STICKER = ethers.BigNumber.from(10).pow(DECIMALS);
const ONE_WITH_DECIMALS = ethers.utils.hexlify(ONE.mul(SATS_PER_STICKER));

export function signMintGrant(id: string) {
  return sign(
    { grant: { type: 'mint', ids: [id], amounts: [ONE_WITH_DECIMALS] } },
    process.env.SIGNER_PRIVATE_KEY,
    { algorithm: 'ES256', audience, issuer },
  );
}
