import { Button, Popover } from '@nextui-org/react';
import React, { useEffect, useState, useCallback } from 'react';
import { useRef } from 'react';
import PopOver from '../UI/PopOver';

interface Props {
  handleContentChange: (text: string) => void;
  value: string;
}

const FakeEditor: React.FC<Props> = ({ handleContentChange, value }) => {
  const buttons = ['bold', 'italic', 'underline', 'h1', 'h2', 'h3', 'code'];
  const [buttonActive, setButtonActive] = useState<string[]>([]);
  const [fontColor, setFontColor] = useState<string>('');
  const [colorPop, setColorPop] = useState<boolean>(false);
  const [codeActive, setCodeActive] = useState<boolean>(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorValue, setEditorValue] = useState('');
  const [headingActive, setHeadingActive] = useState<number>(0);

  const handleContent = useCallback(() => {
    if (editorRef.current) {
      const textContent = editorRef.current.textContent;
      const innerHTML = editorRef.current.innerHTML;
      setEditorValue(textContent!);
      handleContentChange(innerHTML);
    }
  }, [handleContentChange]);
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        setHeadingActive(-1);
      }
    },
    []
  );
  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLDivElement>) => {
      const clipboardData = event.clipboardData;
      const textContent = clipboardData.getData('text/plain');
      event.preventDefault();
      document.execCommand('insertText', false, textContent);
    },
    []
  );

  const handleTextAction = (action: string) => {
    if (
      action === 'h1' ||
      action === 'h2' ||
      action === 'h3' ||
      action === 'h6'
    ) {
      const headingLevel = Number(action.slice(-1));
      setHeadingActive(headingLevel);
      document.execCommand('formatBlock', true, action);
      setButtonActive([]); // reset all buttonActive states when a heading button is clicked
      setCodeActive(false); // deactivate the code button
    } else if (action === 'code') {
      if (codeActive) {
        document.execCommand('formatBlock', false, '<div>');
        setCodeActive(false);
        setButtonActive([]); // reset all buttonActive states when code button is deactivated
      } else {
        document.execCommand('formatBlock', true, '<pre>');
        setCodeActive(true);
        setButtonActive([]); // reset all buttonActive states when code button is activated
        setHeadingActive(0); // deactivate all heading buttons
      }
    } else {
      const toggle = document.execCommand(action, false);
      if (toggle) {
        setButtonActive((prev) => {
          if (prev.includes(action)) {
            return prev.filter((item) => item !== action);
          } else {
            return [...prev, action];
          }
        });
        setCodeActive(false); // deactivate the code button
      }
    }
  };

  const handleSetFontColor = (color: string) => {
    setFontColor(color);
  };
  // const handleCodeBlock = () => {
  //   if (codeActive) {
  //     document.execCommand('formatBlock', false, '<div>');
  //     setCodeActive(false);
  //     setButtonActive([]); // reset all buttonActive states when code button is deactivated
  //   } else {
  //     document.execCommand('formatBlock', true, '<pre>');
  //     setCodeActive(true);
  //     setButtonActive([]); // reset all buttonActive states when code button is activated
  //     setHeadingActive(0); // deactivate all heading buttons
  //   }
  // };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
      handleContent();
    }
  }, []);

  useEffect(() => {
    document.execCommand('foreColor', false, `${fontColor}`);
  }, [fontColor]);
  return (
    <div className='container mx-auto'>
      {/* <div>{value}</div> */}
      {buttons.map((button, i) => (
        <button
          className={
            button === 'code'
              ? ` ${codeActive ? 'text-red-100' : 'text-black'} m-4`
              : `m-4 ${
                  buttonActive.includes(button) ||
                  headingActive === Number(button.slice(-1))
                    ? 'text-red-100'
                    : 'text-black'
                }`
          }
          key={i}
          onClick={() => {
            handleTextAction(button);
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
      {/* <button
        onClick={handleCodeBlock}
        className={`${codeActive ? 'text-red-100' : 'text-black'} m-4`}
      >
        Code
      </button> */}

      <p
        className='border-2 w-full min-h-[400px] outline-none'
        contentEditable={true}
        role='textbox'
        aria-multiline='true'
        onPaste={handlePaste}
        ref={editorRef}
        onInput={handleContent}
        onKeyDown={handleKeyDown}
      ></p>
    </div>
  );
};

export default FakeEditor;
