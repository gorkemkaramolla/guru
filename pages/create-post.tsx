import { useState } from 'react';

import Layout from '../components/Layout/Layout';
import { Button } from '@mui/material';
import dynamic from 'next/dynamic';

const TextEditor = dynamic(() => import('../components/TextEditor'), {
  ssr: false,
});
export default function CreatePostPage() {
  const [content, setContent] = useState('');

  function handleContentChange(value: string) {
    setContent(value);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    // TODO: submit the content to the server
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        {typeof document !== 'undefined' && typeof window !== 'undefined' ? (
          <TextEditor value={content} onChange={handleContentChange} />
        ) : null}
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
    </Layout>
  );
}
