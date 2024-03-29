import storage from 'redux-persist/lib/storage'
import CryptoJS from "crypto-js";
import _ from 'lodash';
import { SECRETKEY } from '../constants/secretkey';

export const decrypt = (encryptedValue: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRETKEY);
    const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);

    return decryptedValue;
}

export const encrypt = (value: string) => {
    const encryptedValue = CryptoJS.AES.encrypt(value, SECRETKEY).toString();

    return encryptedValue;
}

const clonedStorage = _.cloneDeep(storage);

clonedStorage.getItem = async (key) => {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) return null;

    let decryptedValue = decrypt(encryptedValue);

    return JSON.parse(decryptedValue);
}

clonedStorage.setItem = async (key, value) => {
    const stringValue = JSON.stringify(value);
    const encryptedValue = encrypt(stringValue);

    localStorage.setItem(key, encryptedValue);
}

clonedStorage.removeItem = async (key) => {
    localStorage.removeItem(key);
}

export default clonedStorage;