import { Middleware } from 'redux'
import { User } from './types'

const reduxPersistMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action)
  saveUserToIndexedDB(store.getState())

  return result
}

const saveUserToIndexedDB = (user: User) => {
  const request = indexedDB.open('user', 1)

  request.onupgradeneeded = (event: any) => {
    const db = event.target.result
    const objectStore = db.createObjectStore('user', {
      keyPath: 'id',
    })
    objectStore.createIndex('id', 'id', { unique: true })
  }

  request.onerror = (event: any) => {
    console.error('Error opening indexedDB:', event.target.errorCode)
  }

  request.onsuccess = (event: any) => {
    const db = event.target.result
    console.log('db', db)
    const transaction = db.transaction(['user'], 'readwrite')
    const objectStore = transaction.objectStore('user')
    const getUserRequest = objectStore.get(1)

    getUserRequest.onsuccess = (event: any) => {
      const existingState = getUserRequest.result
      const newState = { id: 1, user }

      if (existingState) {
        objectStore.put(newState)
      } else {
        objectStore.add(newState)
      }
    }

    transaction.onerror = (event: any) => {
      console.error(
        'Error saving user state to indexedDB:',
        event.target.errorCode
      )
    }

    transaction.oncomplete = () => {
      console.log('User state saved to IndexedDB')
    }
  }
}

export default reduxPersistMiddleware
