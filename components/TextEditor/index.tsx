import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
const Quill = ReactQuill.Quill;
var Font = Quill.import('formats/font');
Font.whitelist = ['Sans-serif', 'Mono-space', 'Montserrat', 'Lato', 'Rubik'];
Quill.register(Font, true);
interface Props {
  value: string;
  onChange: (value: string) => void;
}
export default function TextEditor({ value, onChange }: Props) {
  return (
    <div>
      <ReactQuill
        style={{ minWidth: '350px', maxWidth: '700px' }}
        value={value}
        onChange={onChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }, { font: Font.whitelist }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            [
              { list: 'ordered' },
              { list: 'bullet' },
              { indent: '-1' },
              { indent: '+1' },
            ],
            ['link', 'image'],
            [{ script: 'sub' }, { script: 'super' }],
            ['clean'],
          ],
        }}
        formats={[
          'font',
          'color',
          'header',
          'font',
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'background',
          'code',
          'script',
          'list',
          'bullet',
          'indent',
          'link',
          'image',
          'video',
        ]}
      />
    </div>
  );
}
