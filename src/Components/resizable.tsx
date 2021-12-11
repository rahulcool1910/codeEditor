import React, { useEffect, useState } from 'react'
import { ResizableBox, ResizableProps } from 'react-resizable';
interface resizableProps {
   direction: "Horizontal" | "Vertical",
}
const Resizable: React.FC<resizableProps> = ({ direction, children }) => {
   let resizableProp: ResizableProps;
   const [innerWidth, setInnerWidth] = useState(window.innerWidth)
   const [innerHeight, setInnerHeight] = useState(window.innerHeight);
   useEffect(() => {
      let timer: any;
      const listener=()=>{

         if(timer){
            clearTimeout(timer);
         }
         
         timer=setTimeout(()=>{
            setInnerWidth(window.innerWidth);
            setInnerHeight(window.innerHeight);
         },100)
      }
      window.addEventListener("resize",listener)
      return () => {
         window.removeEventListener("resize",listener);
      }
   }, [])
   if (direction == "Horizontal") {
      resizableProp = {
         height: Infinity,
         width: innerWidth*0.75,
         resizeHandles: ['e'],
         minConstraints: [innerWidth*0.2, Infinity],
         maxConstraints: [Infinity, Infinity]
      }
   }
   else {
      resizableProp = {
         height: 400,
         width: Infinity,
         resizeHandles: ['s'],
         minConstraints: [Infinity, 400],
         maxConstraints: [Infinity, window.innerHeight * 0.8]
      }
   }
   return (
      <ResizableBox {...resizableProp}>
         {children}
      </ResizableBox>
   )
}

export default Resizable
