import { useState, useEffect } from 'react';
import crypto from 'crypto';

const NeedhamSchroeder = () => {
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [sessionKey, setSessionKey] = useState('');

  const userKey = "UserSecretKey";
  const employeeKey = "EmployeeSecretKey";

  const establishSession = () => {
    const nonce = crypto.randomBytes(8).toString('hex');

    const employeeCipher = crypto.createCipheriv('aes-256-cbc', employeeKey, '16bytesrandomiv');
    let encryptedNonce = employeeCipher.update(nonce, 'utf8', 'hex');
    encryptedNonce += employeeCipher.final('hex');

    const employeeDecipher = crypto.createDecipheriv('aes-256-cbc', employeeKey, '16bytesrandomiv');
    const decryptedNonce = employeeDecipher.update(encryptedNonce, 'hex', 'utf8');
    const finalDecryptedNonce = decryptedNonce + employeeDecipher.final('utf8');

    const sessionKey = crypto.randomBytes(16).toString('hex');
    const userCipher = crypto.createCipheriv('aes-256-cbc', userKey, '16bytesrandomiv');
    let encryptedSessionKey = userCipher.update(sessionKey, 'utf8', 'hex');
    encryptedSessionKey += userCipher.final('hex');

    const userDecipher = crypto.createDecipheriv('aes-256-cbc', userKey, '16bytesrandomiv');
    const decryptedSessionKey = userDecipher.update(encryptedSessionKey, 'hex', 'utf8');
    const finalDecryptedSessionKey = decryptedSessionKey + userDecipher.final('utf8');

    setSessionKey(finalDecryptedSessionKey);
  };

  const encryptMessage = () => {
    if (!sessionKey) {
      console.error('Session key not established');
      return;
    }
    const cipher = crypto.createCipheriv('aes-256-cbc', sessionKey, '16bytesrandomiv');
    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    setEncryptedMessage(encrypted);
  };

  const decryptMessage = () => {
    if (!sessionKey) {
      console.error('Session key not established');
      return;
    }
    const decipher = crypto.createDecipheriv('aes-256-cbc', sessionKey, '16bytesrandomiv');
    let decrypted = decipher.update(encryptedMessage, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    setDecryptedMessage(decrypted);
  };

  useEffect(() => {
    establishSession();
  }, []);

  return (
    <>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={encryptMessage}>Encrypt</button>
      <p>Encrypted Message: {encryptedMessage}</p>
      <button onClick={decryptMessage}>Decrypt</button>
      <p>Decrypted Message: {decryptedMessage}</p>
    </>
  );
};

export default NeedhamSchroeder;
