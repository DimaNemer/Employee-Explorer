import type { Post } from '../types/post';
import { ApiError } from '../lib/error';
import { connection } from 'next/server';

async function getRecentPosts(): Promise<Post[]> {
  await connection();

  await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await fetch(
  'https://jsonplaceholder.typicode.com/posts?userId=1'
);

  if (!response.ok) {
    throw new ApiError(
      'Failed to fetch recent posts',
      response.status
    );
  }

  return response.json();
}

export default async function RecentPosts() {
  let posts: Post[];

  try {
    posts = await getRecentPosts();
  } catch (error) {
    let message = 'Unable to load recent posts. Please try again later.';

    if (error instanceof ApiError) {
      if (error.status === 503) {
        message = 'Recent posts are temporarily unavailable. Please try again later.';
      } else if (error.status === 404) {
        message = 'Recent posts could not be found.';
      }
    }

    return (
      <section>
        <h2>Recent Posts</h2>
        <p role="alert">{message}</p>
      </section>
    );
  }

  const firstThreePosts = posts.slice(0, 3);

  return (
    <section>
      <h2>Recent Posts</h2>

      {firstThreePosts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        <ul>
          {firstThreePosts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
