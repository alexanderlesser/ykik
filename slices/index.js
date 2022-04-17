// src/slices/index.js
import { combineReducers } from 'redux'

import triviaReducer from './trivia'

const rootReducer = combineReducers({
  trivia: triviaReducer,
})

export default rootReducer