import { ActionType } from '../actions-types'
import { Action } from '../actions'
import { Cell } from '../cell';
import produce from 'immer';


export interface cellState {
   loading: boolean;
   error: String | null;
   order: String[],
   data: {
      [key: string]: Cell
   }
}

const initialState: cellState = {
   loading: false,
   error: null,
   order: [],
   data: {}
}

const defaultcellValue: Cell = {
   id: "test",
   type: 'code',
   content: "content"
}

const reducer = produce((state: cellState = initialState, action: Action): cellState => {
   switch (action.type) {
      case ActionType.UPDATE_CELL:
         const { id, data } = action.payload;
         state.data[id].content = data;
         return state;
      case ActionType.ADD_CELL:
         const { id: cellId, type, content } = action.payload;
         state.data[cellId] = {
            id: cellId,
            type,
            content
         }
         return state;
      case ActionType.DELETE_CELL:
         return state;
      case ActionType.INSERT_CELL_BEFORE:
         return state;
      case ActionType.MOVE_CELL:
         return state;
      case ActionType.FETCH_CELL:
         return state;
      default:
         return state
   }
})
export default reducer