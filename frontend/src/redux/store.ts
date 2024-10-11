import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistReducer, persistStore } from 'redux-persist'
import encryptedStorage from '../utils/encryptedStorage'
import IsAuthenticatedReducer from './reducers/IsAuthenticatedReducer'
import ProfileReducer from './reducers/ProfileReducer'
import ScholarshipApplicationFormReducer from './reducers/ScholarshipApplicationFormReducer'
import ScholarshipDataReducer from './reducers/ScholarshipDataReducer'
import ScholarshipsReducer from './reducers/ScholarshipsReducer'
import SearchParamsReducer from './reducers/SearchParamsReducer'
import SubscriberReducer from './reducers/SubscriberReducer'
import UserReducer from './reducers/UserReducer'
import reduxPersistMiddleware from './reduxPersistMiddleware'

const persistConfig = {
  key: 'root',
  storage: encryptedStorage,
  // whitelist: ['user', 'otherReducer'],
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    scholarships: ScholarshipsReducer,
    subscriber: SubscriberReducer,
    scholarshipData: ScholarshipDataReducer,
    profile: ProfileReducer,
    user: UserReducer,
    isAuthenticated: IsAuthenticatedReducer,
    scholarshipApplicationForm: ScholarshipApplicationFormReducer,
  })
)

const store = configureStore({
  reducer: {
    persistedReducer,
    searchParams: SearchParamsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxPersistMiddleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
