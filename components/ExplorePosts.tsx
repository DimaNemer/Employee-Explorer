'use client';

import { useState } from 'react';
import type { Post } from '../types/post';
import { ApiError } from '../lib/error';

type DemoScenario =
  | 'success'
  | 'slow'
  | 'http-error'
  | 'network-error'
  | 'empty';

export default function ExplorePosts() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scenario, setScenario] = useState<DemoScenario>('success');
  const [hasAttempted, setHasAttempted] = useState(false);

  async function getPosts(selectedScenario: DemoScenario): Promise<Response> {
    if (selectedScenario === 'http-error') {
      return new Response(null, {
        status: 503,
        statusText: 'Service Unavailable',
      });
    }

    if (selectedScenario === 'empty') {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (selectedScenario === 'network-error') {
      throw new TypeError('Simulated network failure');
    }

    if (selectedScenario === 'slow') {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    return fetch('https://jsonplaceholder.typicode.com/posts');
  }

  async function handleLoadPosts() {
    if (loading) return;

    setLoading(true);
    setError(null);
    setPosts(null);
    setHasAttempted(true);

    try {
      const response = await getPosts(scenario);

      if (!response.ok) {
        throw new ApiError(
          'Failed to fetch posts',
          response.status
        );
      }

      const data: Post[] = await response.json();
      setPosts(data);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 503) {
          setError('The posts service is unavailable. Please try again.');
        } else if (error.status === 404) {
          setError('The requested posts could not be found.');
        } else {
          setError(`Unable to load posts (HTTP ${error.status}).`);
        }
      } else {
        setError(
          'Unable to connect to the posts service. Please try again.'
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2>Explore All Posts</h2>

      <label htmlFor="demo-scenario">Demo scenario: </label>

      <select
        id="demo-scenario"
        value={scenario}
        onChange={(event) =>
          setScenario(event.target.value as DemoScenario)
        }
      >
        <option value="success">Success (real API)</option>
        <option value="slow">Slow (real API with delay)</option>
        <option value="http-error">HTTP 503 (simulated)</option>
        <option value="network-error">Network error (simulated)</option>
        <option value="empty">Empty response (simulated)</option>
      </select>

      <p>
        The selected scenario applies to the next request.
        Simulated scenarios do not contact the real API.
      </p>

      {!hasAttempted && (
        <p>Click the button below to load all posts.</p>
      )}

      <button
        type="button"
        onClick={handleLoadPosts}
        disabled={loading}
      >
        {loading
          ? 'Loading...'
          : error
            ? 'Retry'
            : 'Load posts'}
      </button>

      {loading && <p role="status">Loading posts...</p>}

      {!loading && error && (
        <p role="alert">{error}</p>
      )}

      {!loading &&
        !error &&
        posts !== null &&
        posts.length === 0 && (
          <p>No posts found</p>
        )}

      {!loading &&
        !error &&
        posts !== null &&
        posts.length > 0 && (
          <div>
            {posts.map((post) => (
              <article key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </article>
            ))}
          </div>
        )}
    </section>
  );
}