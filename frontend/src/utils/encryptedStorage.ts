import storage from 'redux-persist/lib/storage'
import { encrypt, decrypt } from './crypto'

const ENCRYPTION_KEY = process.env.REACT_SERVICE_KEY

const encryptedStorage = {
  getItem: async (key: string) => {
    const encryptedData = await storage.getItem(key)
    if (encryptedData) {
      try {
        return decrypt(encryptedData, ENCRYPTION_KEY)
      } catch (error) {
        console.error('Failed to decrypt data:', error)
        return null
      }
    }
    return null
  },
  setItem: async (key: string, value: string) => {
    const encryptedValue = encrypt(value, ENCRYPTION_KEY)
    await storage.setItem(key, encryptedValue)
  },
  removeItem: async (key: string) => {
    await storage.removeItem(key)
  },
}

export default encryptedStorage
