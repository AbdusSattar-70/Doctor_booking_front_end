import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';

const loggerMiddleware = createLogger();

const middleware = [thunkMiddleware, loggerMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    thunk: false, // We're manually adding thunkMiddleware, so we disable the default one
    serializableCheck: false, // To alzable values like Immutable.js objects
  }).concat(middleware),
});

export default store;
