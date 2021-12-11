import React, { useRef } from 'react'
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import Highlighter from 'monaco-jsx-highlighter';
import codeShift from 'jscodeshift';
import Resizable from './resizable';
interface IEditor{
   compiler:(code:string)=>void,
   initialValue:string
}
const CodeEditor: React.FC<IEditor> = ({ compiler, initialValue})=> {



   const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor>();
   const formatCode = () => {
      if (editorRef.current) {
         const unformattedCode = editorRef.current.getValue()
         const formattedCode = prettier.format(unformattedCode, {
            parser: "babel",
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true,

         });
         editorRef.current.setValue(formattedCode);
      }
   }


   const onEditorMount: EditorDidMount = (getValue, monaco) => {
      monaco.onDidChangeModelContent(() => {
         compiler(getValue());
      })
      editorRef.current = monaco;
      const highlighter = new Highlighter(
         // @ts-ignore
         window.monaco,
         codeShift,
         monaco

      );
      try {
         highlighter.highLightOnDidChangeModelContent(
            () => { },
            () => { },
            undefined,
            () => { },
         )

      } catch (error) {
         console.log(error);

      }
      // console.log("🚀 ~ file: preview.tsx ~ line 152 ~ Preview ~ highlighter", highlighter.highLightOnDidChangeModelContent)
   }
   return (
      <div className="editor_code relative ">

         
         <MonacoEditor
            editorDidMount={onEditorMount}
            value={initialValue}
            height="100%"
            width="100%"
            language="javascript"
            className="border-4 border-white border-opacity-100"
            theme="vs-dark"
            options={{
               wordWrap: 'on',
               lineNumbersMinChars: 3,
               scrollBeyondLastLine: false,
               showUnused: false,
               automaticLayout: true,
               tabIndex: 3,
               fontSize: 16,

            }
            }
         />
         
         <button onClick={formatCode} className="uppercase bg-brass text-[20px] px-2 py-1 absolute top-2 right-2 text-black ">format</button>

      </div>
   )
}

export default CodeEditor
