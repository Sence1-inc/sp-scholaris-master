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
  whitelist: [
    'scholarships',
    'subscriber',
    'scholarshipData',
    'profile',
    'user',
    'isAuthenticated',
    'scholarshipApplicationForm'
  ],
}

const rootReducer = combineReducers({
  scholarships: ScholarshipsReducer,
  subscriber: SubscriberReducer,
  scholarshipData: ScholarshipDataReducer,
  profile: ProfileReducer,
  user: UserReducer,
  isAuthenticated: IsAuthenticatedReducer,
  scholarshipApplicationForm: ScholarshipApplicationFormReducer,
  searchParams: SearchParamsReducer
})

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    }).concat(reduxPersistMiddleware),
})

export const persistor = persistStore(store)

interface RootState {
  scholarships: ReturnType<typeof ScholarshipsReducer>;
  subscriber: ReturnType<typeof SubscriberReducer>;
  scholarshipData: ReturnType<typeof ScholarshipDataReducer>;
  profile: ReturnType<typeof ProfileReducer>;
  user: ReturnType<typeof UserReducer>;
  isAuthenticated: ReturnType<typeof IsAuthenticatedReducer>;
  scholarshipApplicationForm: ReturnType<typeof ScholarshipApplicationFormReducer>;
  searchParams: ReturnType<typeof SearchParamsReducer>;
}

export type AppDispatch = typeof store.dispatch
export type StoreState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector

export default store
