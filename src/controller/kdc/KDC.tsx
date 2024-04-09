import Aes from "react-native-aes-crypto";

// Function to generate keys
export const generateKeys = async () => {
  const userKey = await Aes.randomKey(16); // 128 bits = 16 bytes
  return { userKey };
};

// Function to establish a session
const establishSession = async ({ userKey, employeeKey }) => {
  const nonce = await Aes.randomKey(8); // 64 bits = 8 bytes

  // Encrypt the nonce using the employee key
  const encryptedNonce = await Aes.encrypt(nonce, employeeKey);
  const decryptedNonce = await Aes.decrypt(encryptedNonce, employeeKey);

  // Encrypt the user key using the employee key
  const sessionKey = await Aes.randomKey(16); // 128 bits = 16 bytes
  const encryptedSessionKey = await Aes.encrypt(sessionKey, userKey);
  const decryptedSessionKey = await Aes.decrypt(encryptedSessionKey, userKey);

  return decryptedSessionKey;
};

// Function to encrypt a message
const encryptMessage = async ({ sessionKey, message }) => {
  const encrypted = await Aes.encrypt(message, sessionKey);
  return encrypted;
};

// Function to decrypt a message
const decryptMessage = async ({ sessionKey, encryptedMessage }) => {
  const decrypted = await Aes.decrypt(encryptedMessage, sessionKey);
  return decrypted;
};

// Function to encrypt a token
const encryptData = (text, key) => {
    return Aes.randomKey(16).then(iv => {
        return Aes.encrypt(text, key, iv, 'aes-256-cbc').then(cipher => ({
            cipher,
            iv,
        }))
    });
};

// Function to decrypt a token
const decryptData = (encryptedData, key) => Aes.decrypt(encryptedData.cipher, key, encryptedData.iv, 'aes-256-cbc');


// Function to encrypt a token
export const encryptToken = async ({ userKey, token }) => {
    const encJson = JSON.stringify(token);
    return encryptData(encJson, userKey);
};

// Function to decrypt a token
export const decryptToken = async ({ userKey, encryptedToken }) => {
  try {

    const decryptedData = await decryptData(encryptedToken, userKey);
    const decJson = JSON.parse(decryptedData);

    return decJson;
  } catch (error) {
  }
};


export default { establishSession, encryptMessage, decryptMessage, encryptToken, decryptToken, generateKeys };
