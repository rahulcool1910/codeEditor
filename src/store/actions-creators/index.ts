import { ActionType } from '../actions-types'
import { Action, addCellAction, DeleteCellAction, IDirection, insertCellBeforeAction, moveCellAction, updateCellAction } from '../actions'
import { cellType } from '../cell'


export const updateCell = (id: string, data: string): updateCellAction => {
   return {
      type: ActionType.UPDATE_CELL,
      payload: {
         id,
         data
      }
   }
}
export const deleteCell = (id: string): DeleteCellAction => {
   return {
      type: ActionType.DELETE_CELL,
      payload: {
         id
      }
   }
}
export const moveCell = (id: string, direction: IDirection): moveCellAction => {
   return {
      type: ActionType.MOVE_CELL,
      payload: {
         id,
         direction
      }
   }
}
export const addCell = (id: string, type: cellType, content: string): addCellAction => {
   return {
      type: ActionType.ADD_CELL,
      payload: {
         id,
         type,
         content
      }
   }
}
// export const insertCellBeforeAction = (): insertCellBeforeAction => {
// }
