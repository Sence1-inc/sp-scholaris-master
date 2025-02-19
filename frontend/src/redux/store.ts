/**
 * @file store.ts
 * @description Defines the Redux store for the application along with configuration for state persistence.
 * @remarks
 * This file creates the Redux store using Redux Toolkit's <code>configureStore</code>
 * and enhances it with state persistence via <code>redux-persist</code>. It combines multiple reducers
 * responsible for various slices of the application state, such as scholarships, subscriber, profile, user,
 * authentication, and form data for scholarship applications. The persisted state is rehydrated via a custom
 * encrypted storage mechanism.
 */

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

/**
 * Configuration object for redux-persist.
 *
 * @remarks
 * Specifies the persist key, the storage engine (encryptedStorage in this case),
 * and a whitelist of individual reducer keys whose state should be persisted.
 *
 * @constant
 */
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

/**
 * Combines the application's individual reducers into a single root reducer.
 *
 * @remarks
 * Maps each slice of the application state to its corresponding reducer. Note that
 * the <code>searchParams</code> reducer is included here but is not part of the persistence whitelist.
 *
 * @returns {Function} A combined reducer function that returns the application state.
 */
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

/**
 * Enhances the root reducer with persistence capabilities using redux-persist.
 *
 * @remarks
 * Wraps the root reducer with <code>persistReducer</code> to automatically
 * persist and rehydrate the specified slices of state based on <code>persistConfig</code>.
 *
 * @typeParam RootState - The shape of the application's state.
 */
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer)

/**
 * The Redux store instance for the application.
 *
 * @remarks
 * Created using Redux Toolkit's <code>configureStore</code>. Includes the persisted reducer and additional middleware
 * (including a custom reduxPersistMiddleware) for handling side effects related to persistence.
 */
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    }).concat(reduxPersistMiddleware),
})

/**
 * The persistor object responsible for persisting the Redux store's state.
 *
 * @remarks
 * This is used with <code>PersistGate</code> from redux-persist to delay the rendering of the app's UI
 * until the persisted state has been retrieved and saved to Redux.
 */
export const persistor = persistStore(store)

/**
 * Defines the root state type for the application.
 *
 * @remarks
 * Each property in the interface corresponds to a slice of the state managed by its respective reducer.
 */
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

/**
 * Type representing the Redux dispatch function for the application.
 *
 * @remarks
 * Useful for dispatching actions with proper type safety.
 */
export type AppDispatch = typeof store.dispatch

/**
 * Type representing the complete state of the Redux store.
 *
 * @remarks
 * This type is derived from the store's <code>getState</code> method.
 */
export type StoreState = ReturnType<typeof store.getState>

/**
 * Custom hook to dispatch actions to the Redux store.
 *
 * @returns {AppDispatch} The dispatch function for the application.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>()

/**
 * A typed version of the <code>useSelector</code> hook from react-redux.
 *
 * @remarks
 * Provides type-safe access to the Redux store state throughout the application.
 *
 * @typeParam T - The type of state to be selected.
 * @returns {TypedUseSelectorHook<StoreState>} The typed selector hook.
 */
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector

export default store
