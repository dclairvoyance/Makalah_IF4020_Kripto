import {
  gcd,
  lcm,
  modInv,
  modPow,
  randBetween,
  prime,
} from "bigint-crypto-utils";

const L = (x: bigint, n: bigint) => (x - BigInt(1)) / n;

const generatePQ = async (bits: number) => {
  let p = await prime(bits);
  let q = await prime(bits);

  while (gcd(p * q, (p - BigInt(1)) * (q - BigInt(1))) !== BigInt(1)) {
    p = await prime(bits);
    q = await prime(bits);
  }
  return { p, q };
};

const generatePublicKey = (p: bigint, q: bigint) => {
  const n = p * q;
  const g = randBetween(n * n);
  return { n, g };
};

const generatePrivateKey = (
  p: bigint,
  q: bigint,
  publicKey: { n: bigint; g: bigint }
) => {
  const lambda = lcm(p - BigInt(1), q - BigInt(1));
  const mu = modInv(
    L(modPow(publicKey.g, lambda, publicKey.n * publicKey.n), publicKey.n),
    publicKey.n
  );
  return { lambda, mu };
};

const generateRandomKeys = async (bits: number) => {
  const { p, q } = await generatePQ(bits);
  const { n, g } = generatePublicKey(p, q);
  const { lambda, mu } = generatePrivateKey(p, q, { n, g });
  return { publicKey: { n, g }, privateKey: { lambda, mu } };
};

const generateRandomR = (n: bigint) => {
  let r;
  do {
    r = randBetween(n);
  } while (gcd(r, n) !== BigInt(1));
  return r;
};

export const encrypt = (
  publicKey: { n: bigint; g: bigint },
  message: bigint
) => {
  const r = generateRandomR(publicKey.n);
  const g_m = modPow(publicKey.g, message, publicKey.n * publicKey.n);
  const r_n = modPow(r, publicKey.n, publicKey.n * publicKey.n);
  return (g_m * r_n) % (publicKey.n * publicKey.n);
};

export const decrypt = (
  publicKey: { n: bigint; g: bigint },
  privateKey: { lambda: bigint; mu: bigint },
  cipherText: bigint
) => {
  const c_lambda = modPow(
    cipherText,
    privateKey.lambda,
    publicKey.n * publicKey.n
  );
  const L_c_lambda = L(c_lambda, publicKey.n);
  return (L_c_lambda * privateKey.mu) % publicKey.n;
};

export const addition = (
  publicKey: { n: bigint; g: bigint },
  cipherText1: bigint,
  cipherText2: bigint
) => {
  return (cipherText1 * cipherText2) % (publicKey.n * publicKey.n);
};
