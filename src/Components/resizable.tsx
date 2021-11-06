import React from 'react'
import { ResizableBox } from 'react-resizable';
interface resizableProps{
   direction:"Horizontal"|"Vertical",
}
const Resizable:React.FC<resizableProps>=({direction,children})=> {
   return (
      <ResizableBox height={400} width={Infinity} resizeHandles={['s','se']}>
         {children}
      </ResizableBox>
   )
}

export default Resizable
