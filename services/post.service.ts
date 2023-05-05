import axios from 'axios';

async function createPost(
  content: string,
  title: string,
  at: string,
  category_id: number,
  description: string
) {
  try {
    const response = await axios.post('/api/post/createpost', {
      content,
      title,
      at,
      category_id,
      description,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
async function getPosts() {
  try {
    const response = await axios.get('/api/post/createpost');

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export { createPost, getPosts };
