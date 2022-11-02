import { ActionType } from '../actions-types'
import { cellType } from '../cell'
export type IDirection = 'up' | 'down'
export interface DeleteCellAction {
   type: ActionType.DELETE_CELL
   payload: {
      id: string
   }
}
export interface updateCellAction {
   type: ActionType.UPDATE_CELL
   payload: {
      id: string,
      data: string
   }
}
export interface insertCellBeforeAction {
   type: ActionType.INSERT_CELL_BEFORE
   payload: {
      id: String
   }
}
export interface moveCellAction {
   type: ActionType.MOVE_CELL
   payload: {
      id: string,
      direction: IDirection
   }
}
export interface addCellAction {
   type: ActionType.ADD_CELL
   payload: {
      id: string,
      type: cellType,
      content: string
   }
}
export interface fetchCellAction {
   type: ActionType.FETCH_CELL
   payload: {
      id: String
   }
}


export type Action =
   DeleteCellAction |
   updateCellAction |
   insertCellBeforeAction |
   moveCellAction |
   fetchCellAction |
   addCellAction
