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
      'source', '|',
      'bold',
      'strikethrough',
      'underline',
      'italic', '|',
      'ul',
      'ol', '|',
      'outdent', 'indent',  '|',
      'font',
      'fontsize',
      'lineHeight',
      'brush',
      'paragraph', '|',
      'image',
      'video',
      'table',
      'link', '|',
      'align', 'undo', 'redo', '|',
      'hr',
      'eraser',
      'copyformat', '|',
      'symbol',
      'fullsize',
      'print',
      'about'
    ],
    buttonsXS: [
      'bold',
      'image', '|',
      'brush',
      'paragraph', '|',
      'align', '|',
      'undo', 'redo', '|',
      'eraser',
      'dots'
  ],
    colors: {
      greyscale: ['#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF'],
      palette: ['#980000', '#FF0000', '#FF9900', '#FFFF00', '#00F0F0', '#00FFFF', '#4A86E8', '#0000FF', '#9900FF', '#FF00FF'],
      full: [
        '#E6B8AF', '#F4CCCC', '#FCE5CD', '#FFF2CC', '#D9EAD3', '#D0E0E3', '#C9DAF8', '#CFE2F3', '#D9D2E9', '#EAD1DC',
        '#DD7E6B', '#EA9999', '#F9CB9C', '#FFE599', '#B6D7A8', '#A2C4C9', '#A4C2F4', '#9FC5E8', '#B4A7D6', '#D5A6BD',
        '#CC4125', '#E06666', '#F6B26B', '#FFD966', '#93C47D', '#76A5AF', '#6D9EEB', '#6FA8DC', '#8E7CC3', '#C27BA0',
        '#A61C00', '#CC0000', '#E69138', '#F1C232', '#6AA84F', '#45818E', '#3C78D8', '#3D85C6', '#674EA7', '#A64D79',
        '#85200C', '#990000', '#B45F06', '#BF9000', '#38761D', '#134F5C', '#1155CC', '#0B5394', '#351C75', '#733554',
        '#5B0F00', '#660000', '#783F04', '#7F6000', '#274E13', '#0C343D', '#1C4587', '#073763', '#20124D', '#4C1130'
      ]
    },
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
      // onChange={newContent => contentValueHandler(newContent)}
      />
    </>
  )
}

export default Jodit;