import storage from 'redux-persist/lib/storage'
import CryptoJS from "crypto-js";

const SecretKey = "my-super-secret-key"

export const decrypt = (encryptedValue: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, SecretKey);
    const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);

    return decryptedValue;
}

export const encrypt = (value: string) => {
    const encryptedValue = CryptoJS.AES.encrypt(value, SecretKey).toString();

    return encryptedValue;
}

storage.getItem = async (key) => {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) return null;

    let decryptedValue = decrypt(encryptedValue);

    return JSON.parse(decryptedValue);
}

storage.setItem = async (key, value) => {
    const stringValue = JSON.stringify(value);
    const encryptedValue = encrypt(stringValue);

    localStorage.setItem(key, encryptedValue);
}

storage.removeItem = async (key) => {
    localStorage.removeItem(key);
}

export default storage;