### Demo Scenarios

The Explore All Posts section includes a Demo scenario selector to test different API responses.

- **Success:** Fetches posts from the real JSONPlaceholder API.
- **Slow:** Fetches posts from the real API after a two-second delay.
- **HTTP 503:** Simulates a failed HTTP response using `new Response()`.
- **Network error:** Simulates a rejected request.
- **Empty response:** Simulates a successful response with an empty array using `new Response()`.

The simulated scenarios are only for testing. They do not represent actual responses from JSONPlaceholder.

To test recovery, select HTTP 503, click Load posts, then switch to Success and click Retry.