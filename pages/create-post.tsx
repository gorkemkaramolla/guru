import { useState } from 'react';

import Layout from '../components/Layout/Layout';
import { Button } from '@mui/material';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Session } from 'inspector';
import { useSession } from 'next-auth/react';
import { createPost } from '@/services/post.service';
import FakeEditor from '@/components/FakeEditor/FakeEditor';
import PostPage from './post/[post]';
import PostClient from '@/components/Post/PostClient';

const TextEditor = dynamic(() => import('../components/TextEditor'), {
  ssr: false,
});
export default function CreatePostPage() {
  const [content, setContent] = useState<string>('');
  const [editorMode, setEditorMode] = useState<string>('editor');

  const session = useSession();
  function handleContentChange(value: string) {
    setContent(value);
  }

  function handleSubmit(event: any) {
    const preRegex = /<pre>(.*?)<\/pre>/gs;
    const brRegex = /<br>/g;

    const modifiedContent = content.replace(preRegex, (match, p1) => {
      // replace <br> tags with new <pre> tags
      const modifiedPre = p1.replace(brRegex, '</pre><pre>');
      return `<pre>${modifiedPre}</pre>`;
    });

    createPost(
      modifiedContent,
      '"This is an EXAMPLE of a string with $pecial characters"',
      session.data?.user?.at!,
      1,
      'Bu yazıda NextJS ile nasıl getServerSideProps yazılır onu öğreneceğiz'
    )
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className='mx-auto grid grid-cols-12 '>
      <div className='col-span-6 flex flex-col justify-center items-center'>
        <div className='flex gap-5'>
          <button
            onClick={() => {
              setEditorMode('editor');
            }}
          >
            Editor
          </button>
          <button
            onClick={() => {
              setEditorMode('preview');
            }}
          >
            Preview
          </button>
        </div>

        {editorMode === 'editor' && (
          <>
            {/* <div>
              {typeof document !== 'undefined' &&
              typeof window !== 'undefined' ? (
                <TextEditor value={content} onChange={handleContentChange} />
              ) : null}
            </div> */}

            <FakeEditor
              value={content}
              handleContentChange={handleContentChange}
            />
            <button onClick={handleSubmit}>Submit</button>
          </>
        )}
      </div>

      {editorMode === 'preview' && (
        <div className=' col-span-12'>
          <h1 className='text-2xl text-blue-500'>Preview</h1>
          <PostClient
            post={{
              id: 1,
              category_id: 2,
              title: 'Sample Post',
              content: content,
              created_at: new Date(),
              updated_at: new Date(),
              at: 'some_at_value',
              description: 'some_description_value',
              user_id: 1,
              tags: 'tag1',
            }}
          />
        </div>
      )}
    </div>
  );
}
