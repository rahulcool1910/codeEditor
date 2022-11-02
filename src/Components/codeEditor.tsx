import React, { useCallback, useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import Highlighter from 'monaco-jsx-highlighter';
import codeShift from 'jscodeshift';
import Resizable from './resizable';
import { useDispatch } from 'react-redux';
import { updateCell } from '../store/actions-creators';
import { debounce } from 'lodash';
interface IEditor {
  id: String;
  initialValue: string;
}
const CodeEditor: React.FC<IEditor> = ({ id, initialValue }) => {
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor>();
  const dispatch = useDispatch();
  const formatCode = () => {
    if (editorRef.current) {
      const unformattedCode = editorRef.current.getValue();
      const formattedCode = prettier.format(unformattedCode, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      });
      editorRef.current.setValue(formattedCode);
    }
  };
  const debouncedSave = useCallback(
    debounce(
      (nextValue) => dispatch(updateCell(id as string, nextValue)),
      1000
    ),
    [] // will be created only once initially
  );
  const onEditorMount: EditorDidMount = (getValue, monaco) => {
    monaco.onDidChangeModelContent(() => {
      const value = getValue();
      debouncedSave(value);
    });
    editorRef.current = monaco;
    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monaco
    );
    try {
      highlighter.highLightOnDidChangeModelContent(
        () => {},
        () => {},
        undefined,
        () => {}
      );
    } catch (error) {
      console.log(error);
    }
  };
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
        }}
      />
      <button
        onClick={formatCode}
        className="uppercase bg-brass text-[20px] px-2 py-1 absolute top-2 right-2 text-black "
      >
        format
      </button>
    </div>
  );
};

export default CodeEditor;
