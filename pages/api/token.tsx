import { NextApiRequest, NextApiResponse } from 'next';
import { signMintGrant } from 'server/lib/grant';
import weighted from 'weighted';

function nope(res: NextApiResponse, status: number, message: string) {
  return res.status(status).json({ message });
}

function yup(res: NextApiResponse, body: Record<string, any>) {
  return res.status(200).json(body);
}

// map of token id to relative weight.
// i plan to add future stickers to the end of this map, effectively making the earlier tokens even rarer
const ITEMS = {
  '0x0': 1,
  '0x1': 2,
};

export default function token(req: NextApiRequest, res: NextApiResponse) {
  // only post
  if (req.method !== 'POST') return nope(res, 400, 'Only POST allowed.');

  // password shit
  // TODO: use wallet connect and ecrecover for max crypto hacker points
  const password = req.body.password as string;
  if (!process.env.ADMIN_PASSWORD) return nope(res, 400, 'Password not set at all.');
  if (password !== process.env.ADMIN_PASSWORD) return nope(res, 400, 'Password does not match.');

  // select the right id
  const id = weighted(ITEMS) as string;

  // build the token
  const token = signMintGrant(id);

  // return
  return yup(res, { token });
}
