import React, { Dispatch, SetStateAction, useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

interface JoditProps {
  contentValue: string,
  contentValueHandler: Dispatch<SetStateAction<string>>,
  imageValue: string[],
  imageValueHandler: Dispatch<SetStateAction<string[]>>,
  editorRef?: any,
}

const Jodit = ({ contentValue, contentValueHandler, imageValue, imageValueHandler, editorRef }: JoditProps) => {

  const imagesStateHandler = (element: any) => {
    const src = element.getAttribute('src');
    console.log(src);
    imageValue.push(src);
    imageValueHandler(imageValue);
  }

  const config = useMemo(() => ({
    readonly: false,
    autofocus: true,
    tabIndex: 1,
    height: "80vh",

    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    enableDragAndDropFileToEditor: true,
    // defaultActionOnPaste: 'insert_clear_html',

    placeholder: '...',
    beautyHTML: true,
    // toolbarButtonSize: "large",
    buttons: [
      'source', 'image',
      '|', 'bold', 'italic',
      '|', 'ul', 'ol',
      '|', 'font', 'fontsize', 'paragraph',
      '|', 'table', 'link',
      '|', 'left', 'center', 'right', 'justify',
      '|', 'undo', 'redo',
      '|', 'hr', 'eraser', 'fullsize'
    ],
    uploader: {
      insertImageAsBase64URI: true
    },
    events: {
      afterInsertImage: imagesStateHandler, // Mengaitkan fungsi dengan acara 'afterInsertImage'
    },
  }), []);

  return (
    <>
      <JoditEditor
        ref={editorRef}
        value={contentValue}
        config={config}
        onBlur={newContent => contentValueHandler(newContent)}
        onChange={newContent => contentValueHandler(newContent)}
      />
    </>
  )
}

export default Jodit;