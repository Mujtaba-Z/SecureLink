import CryptoJS from "react-native-crypto-js";

export const generateKeys = () => {
  const userKey = CryptoJS.lib.WordArray.random(128 / 8).toString();
  return { userKey };
};

const establishSession = ({ userKey, employeeKey }) => {
  const nonce = CryptoJS.lib.WordArray.random(8).toString();

  const encryptedNonce = CryptoJS.AES.encrypt(nonce, employeeKey).toString();
  const decryptedNonce = CryptoJS.AES.decrypt(encryptedNonce, employeeKey).toString(CryptoJS.enc.Utf8);

  const sessionKey = CryptoJS.lib.WordArray.random(128 / 8).toString();
  const encryptedSessionKey = CryptoJS.AES.encrypt(sessionKey, userKey).toString();
  const decryptedSessionKey = CryptoJS.AES.decrypt(encryptedSessionKey, userKey).toString(CryptoJS.enc.Utf8);

  return decryptedSessionKey;
};

const encryptMessage = ({ sessionKey, message }) => {
  const encrypted = CryptoJS.AES.encrypt(message, sessionKey).toString();
  return encrypted;
};

const decryptMessage = ({ sessionKey, encryptedMessage }) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedMessage, sessionKey).toString(CryptoJS.enc.Utf8);
  return decrypted;
};

export const encryptToken = ({ userKey, token }) => {
    let encJson = CryptoJS.AES.encrypt(JSON.stringify(token), userKey).toString();
    let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson));
    return encData;
};

export const decryptToken = ({ userKey, encryptedToken }) => {
    let decData = CryptoJS.enc.Base64.parse(encryptedToken).toString(CryptoJS.enc.Utf8);
    let bytes = CryptoJS.AES.decrypt(decData, userKey).toString(CryptoJS.enc.Utf8);
    return JSON.parse(bytes);
};

export default { establishSession, encryptMessage, decryptMessage, encryptToken, decryptToken, generateKeys };
