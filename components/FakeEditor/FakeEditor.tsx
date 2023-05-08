import { Button, Popover } from '@nextui-org/react';
import React, { useEffect, useState, useCallback } from 'react';
import { useRef } from 'react';
import PopOver from '../UI/PopOver';

interface Props {
  handleContentChange: (text: string) => void;
  value: string;
}

const FakeEditor: React.FC<Props> = ({ handleContentChange, value }) => {
  const [buttonActive, setButtonActive] = useState<string[]>([]);
  const [fontColor, setFontColor] = useState<string>('');
  const [colorPop, setColorPop] = useState<boolean>(false);
  const [codeActive, setCodeActive] = useState<boolean>(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const buttons = ['bold', 'italic', 'underline', 'h1', 'h2', 'h3'];
  const [editorValue, setEditorValue] = useState('');
  const handleContent = useCallback(() => {
    if (editorRef.current) {
      const textContent = editorRef.current.textContent;
      const innerHTML = editorRef.current.innerHTML;
      setEditorValue(textContent!);
      handleContentChange(innerHTML);
    }
  }, [handleContentChange]);
  //   const handlePaste = useCallback(
  //     (event: React.ClipboardEvent<HTMLDivElement>) => {
  //       const clipboardData = event.clipboardData;
  //       const htmlContent = clipboardData.getData('text/html');
  //       if (editorRef.current) {
  //         editorRef.current.innerHTML = htmlContent;
  //         handleContent();
  //       }
  //     },
  //     [handleContent]
  //   );

  const handleTextAction = (action: string) => {
    if (
      action === 'h1' ||
      action === 'h2' ||
      action === 'h3' ||
      action === 'h6'
    ) {
      document.execCommand('formatBlock', true, `<h${action.split('')[1]}>`);
    } else {
      document.execCommand(action, false);
    }
  };
  const handleSetFontColor = (color: string) => {
    setFontColor(color);
  };
  const handleCodeBlock = () => {
    setCodeActive(!codeActive);
    codeActive
      ? document.execCommand('formatBlock', false, '<div>')
      : document.execCommand('formatBlock', false, '<pre>');
  };

  // Add event listener

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
      handleContent();
    }
  }, []);
  useEffect(() => {
    document.execCommand('foreColor', false, `${fontColor}`);
  }, [fontColor]);
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
      handleContent();
    }
  }, []);
  return (
    <div className='container mx-auto'>
      <div>{value}</div>
      {buttons.map((button, i) => (
        <button
          className={`m-4 ${
            buttonActive.includes(button) ? 'text-red-100' : 'text-black'
          }`}
          key={i}
          onClick={() => {
            handleTextAction(button);
            setButtonActive((prev) => {
              if (prev.includes(button)) {
                const filtered = buttonActive.filter((item) => {
                  return item !== button;
                });
                return filtered;
              } else {
                return [...prev, button];
              }
            });
          }}
        >
          {button}
        </button>
      ))}

      <button
        onClick={() => {
          setColorPop(true);
        }}
        className='m-4'
      >
        <PopOver popIsOpen={colorPop} handleColor={handleSetFontColor} />
      </button>
      <button onClick={handleCodeBlock} className='m-4'>
        Code
      </button>

      <p
        className='border-2 w-full min-h-[400px] outline-none'
        contentEditable={true}
        role='textbox'
        aria-multiline='true'
        // onPaste={handlePaste}
        ref={editorRef}
        onInput={handleContent}
      ></p>
    </div>
  );
};

export default FakeEditor;
