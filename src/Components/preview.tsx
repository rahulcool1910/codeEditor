import React, { useCallback, useEffect, useRef, useState } from 'react'
import '../assets/syntax.css';
import * as esBuild from 'esbuild-wasm'
import { unpkgPathPlugin } from '../plugin/esBuildPlugin';
import localforage from 'localforage'
import { v4 } from 'uuid'
import CodeEditor from './codeEditor';
import Resizable from './resizable';


localforage.createInstance({
   name: 'fileCache'
})
function Preview() {
   const ref = useRef<HTMLIFrameElement | null>(null);
   const esbuildRef = useRef<esBuild.Service | null>(null);
   const initialValue = `
import React from 'react'
import ReactDOM from 'react-dom'
const App=()=>{
    return <div>
        <h1>hello world</h1>
    </div>
}
ReactDOM.render(
    <App/>,
    document.querySelector("#root")
)

`
   const startService = async () => {
      esbuildRef.current = await esBuild.startService({
         worker: true,
         wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm"
      });
      console.time()


   }
   useEffect(() => {



      const initializeApp = async () => {
         startService();
      }


      initializeApp();


      setTimeout(() => {
         compiler(initialValue)

      }, 3000)
   }, [])




   const compiler = async (event: string = "") => {
      if (!esbuildRef.current) {
         return
      }
      const text = event;
      try {
         // const result=await esbuildRef.current.transform(text,{
         //    loader:"jsx",
         //    target:"es2015"
         // })
         if (ref.current) ref.current.srcdoc = html

         const result = await esbuildRef.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(text)],
            define: {
               'process.env.NODE_ENV': '"production"',
               Global: 'window'
            }
         });


         // setData(result.outputFiles[0].text);
         if (ref.current?.contentWindow) {
            ref.current.contentWindow.postMessage(result.outputFiles[0].text, '*')
         }
     
      } catch (error) {
         console.log(error);
         

      }
   }




   const html = `
   <!DOCTYPE html>
   <html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
   </head>
   <body>
      <div id="root"></div>
   </body>
   <style>
      body{
         color:white;
      }
   </style>
   <script>
   window.addEventListener("message",(event)=>{
      try {
         eval(event.data)
      } catch (error) {
         document.querySelector("#root").innerHTML= '<h1>' +  error + '</h1>'
      }
   },false)
   </script>
   </html>
   `


   return (
      <Resizable direction="Horizontal">

      <div className="editor-wrapper">
         <CodeEditor compiler={compiler} initialValue={initialValue} />
         <iframe title={v4()} ref={ref} srcDoc={html} width="100%" height="100%" sandbox='allow-scripts' className="border-4 border-white border-opacity-100 bg-black "></iframe>
      </div>
      </Resizable>
   )
}



export default Preview
