import storage from 'redux-persist/lib/storage'
import CryptoJS from "crypto-js";
import _ from 'lodash';
import { SECRETKEY } from '../constants/secretkey';
import { decrypt, encrypt } from './SecureAsyncStorage';

const clonedStorage = _.cloneDeep(storage);

clonedStorage.getItem = async (key) => {
    const encryptedValue = sessionStorage.getItem(key);
    if (!encryptedValue) return null;

    let decryptedValue = decrypt(encryptedValue);

    return JSON.parse(decryptedValue);
}

clonedStorage.setItem = async (key, value) => {
    const stringValue = JSON.stringify(value);
    const encryptedValue = encrypt(stringValue);

    sessionStorage.setItem(key, encryptedValue);
}

clonedStorage.removeItem = async (key) => {
    sessionStorage.removeItem(key);
}

export default clonedStorage;