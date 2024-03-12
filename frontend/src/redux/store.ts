import { configureStore } from '@reduxjs/toolkit'
import ScholarshipsReducer from './reducers/ScholarshipsReducer'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import SearchParamsReducer from './reducers/SearchParamsReducer'
import SubscriberReducer from './reducers/SubscriberReducer'
import ScholarshipDataReducer from './reducers/ScholarshipDataReducer'

const store = configureStore({
  reducer: {
    scholarships: ScholarshipsReducer,
    searchParams: SearchParamsReducer,
    subscriber: SubscriberReducer,
    scholarshipData: ScholarshipDataReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
