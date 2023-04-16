import { useState } from 'react';

import Layout from '../components/Layout/Layout';
import { Button } from '@mui/material';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Session } from 'inspector';
import { useSession } from 'next-auth/react';
import { createPost } from '@/services/post.service';

const TextEditor = dynamic(() => import('../components/TextEditor'), {
  ssr: false,
});
export default function CreatePostPage() {
  const session = useSession();
  const [content, setContent] = useState<string>('');

  function handleContentChange(value: string) {
    setContent(value);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    createPost(content, 'baslik', 4, 1)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      <div className='mx-auto container'></div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <Layout>
        <form onSubmit={handleSubmit} className=''>
          {typeof document !== 'undefined' && typeof window !== 'undefined' ? (
            <TextEditor value={content} onChange={handleContentChange} />
          ) : null}
          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
        </form>
      </Layout>
    </div>
  );
}
