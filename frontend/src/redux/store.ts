import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import ScholarshipsReducer from './reducers/ScholarshipsReducer'
import SearchParamsReducer from './reducers/SearchParamsReducer'
import SubscriberReducer from './reducers/SubscriberReducer'
import ScholarshipDataReducer from './reducers/ScholarshipDataReducer'
import ProfileReducer from './reducers/ProfileReducer'
import UserReducer from './reducers/UserReducer'
import reduxPersistMiddleware from './reduxPersistMiddleware'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import IsAuthenticatedReducer from './reducers/IsAuthenticatedReducer'

const persistConfig = {
  key: 'root',
  storage,
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
