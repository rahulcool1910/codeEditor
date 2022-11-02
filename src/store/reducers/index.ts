import { combineReducers } from 'redux'
import cellReducers from './cellReducers'



const reducers = combineReducers({
   cells: cellReducers
})
export default reducers;
export type rootState = ReturnType<typeof reducers>;