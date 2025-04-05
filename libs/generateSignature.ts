import CryptoJS from 'crypto-js';

const generateSignature = (params:any) => {
  // 1. Create parameter string
  const paramString = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');

  // 2. Append merchant key
  const rawSignature = `${paramString}&key=${'PLACEHOLDER_MERCHANT_KEY'}`;

  // 3. Generate SHA-256 hash
  return CryptoJS.SHA256(rawSignature).toString(CryptoJS.enc.Hex);
};