// @flow

import { createStore, applyMiddleware } from 'redux'
import reducer from '../domain/redux/reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import middleware from './middleware'

const persistConfig = {
  key: 'domainState',
  storage,
}
const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(persistedReducer, applyMiddleware(middleware))
export const persistor = persistStore(store)

store.subscribe(() => console.log(store.getState()))
