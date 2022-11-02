export type cellType = 'code' | 'text'
export interface Cell {
   id: String;
   type: cellType;
   content: string;
}