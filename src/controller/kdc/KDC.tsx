import Aes from "react-native-aes-crypto";

// Function to generate keys
export const generateKeys = async () => {
  const userKey = await Aes.randomKey(16); // 128 bits = 16 bytes
  return { userKey };
};

// encryptSessionKey  used to encrypt session key 
export const encryptSessionKey = async ({ sessionKey, session }) => {
  return Aes.randomKey(16).then(iv => {
    return Aes.encrypt(session, sessionKey, iv, 'aes-256-cbc').then(cipher => ({
        cipher,
        iv,
    }))
});
};

// Function to decrypt a session key
export const decryptSessionKey = (encryptedSession, sessionKey) => Aes.decrypt(encryptedSession.cipher, sessionKey, encryptedSession.iv, 'aes-256-cbc');

// Function to encrypt a message
export const encryptMessage = async ({ sessionKey, message }) => {
  return Aes.randomKey(16).then(iv => {
    return Aes.encrypt(message, sessionKey, iv, 'aes-256-cbc').then(cipher => ({
        cipher,
        iv,
    }))
});
};

// Function to decrypt a message
export const decryptMessage = (encryptedMessage, sessionKey) => Aes.decrypt(encryptedSession.cipher, sessionKey, encryptedSession.iv, 'aes-256-cbc');

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


export default { encryptSessionKey, decryptSessionKey, encryptMessage, decryptMessage, encryptToken, decryptToken, generateKeys };
