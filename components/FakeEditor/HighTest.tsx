import { useRef, useEffect } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/monokai.css';

hljs.registerLanguage('javascript', javascript);

export default function HighTest() {
  const codeRef = useRef(null);

  useEffect(() => {
    hljs.highlightBlock(codeRef?.current!);
  }, []);

  return (
    <pre>
      <code ref={codeRef}>
        {`function hello() {
  console.log('Hello, world!');
}`}
      </code>
    </pre>
  );
}
