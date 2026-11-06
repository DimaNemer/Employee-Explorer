# Testing — Employee Explorer

# Environment
- Framework: Next.js 16.4.3
- Router: App Router
- Language: TypeScript
- Testing: Manual testing using npm run dev

# Employee Profile Mission

## Test 1: Successful API Request
Steps:
1. Open http://localhost:3000.
2. Make sure the employee API URL is correct.
3. Refresh the page.

Expected: The employee's name, email, and company name should appear.

Result: Passed. All three fields displayed correctly.

## Test 2: Failed API Request

Steps:
1. Temporarily change the employee API URL to an invalid endpoint.
2. Refresh the page.
3. Check the Employee Profile and Recent Posts sections.
4. Restore the original API URL.

Expected: The Employee Profile should show a friendly error message without affecting the other sections.

Result: Passed. The message "Unable to load employee information. Please try again later." appeared, while Recent Posts continued working normally.

# Recent Posts and Suspense Mission

## Test 3: Loading Fallback

Steps:
1. Add a two-second delay to the Recent Posts fetching function.
2. Wrap the component in its own Suspense boundary.
3. Refresh the page directly.

Expected: The page title should remain visible while Recent Posts shows a loading message.

Result: Passed. The page title and loading message appeared first. After the delay, the loading message was replaced by the three post titles.

## Test 4: Independent Loading

Steps:
1. Add separate Suspense boundaries for Employee Profile and Recent Posts.
2. Refresh the page.
3. Observe how each section loads.

Expected: Both sections should load independently without blocking each other.

Result: Passed. The Employee Profile appeared first, while Recent Posts was still loading. The posts appeared after the delay.

## Additional Notes

- The two-second delay is intentional and is used to demonstrate how Suspense works.
- I used connection() to make sure the preview runs when a request is received instead of being completed during prerendering.
- I tested the loading behavior by refreshing the page directly.
- The artificial delay is kept in the project as required by the assignment.



# Explore All Posts Mission

## Test 5: Load Posts Button

Steps:
1. Open the page.
2. Check that the posts are not loaded yet.
3. Click the Load posts button.

Expected: The posts should only load after clicking the button.

Result: The fetch request is connected to the button click. The request does not run when the component first renders.

## Test 6: Loading State

Steps:
1. Click Load posts.
2. Check the loading message and button.

Expected: A loading message should appear, and the button should be disabled until the request finishes.

Result: The component displays "Loading posts..." and disables the button while loading.

## Test 7: Successful Request

Steps:
1. Use the correct API URL.
2. Click Load posts.
3. Check the posts displayed on the page.

Expected: The post titles and bodies should appear.

Result: The component displays the posts returned by the API.

## Test 8: Empty Response

Steps
1. Temporarily change setPosts(data) to setPosts([]).
2. Click Load posts.
3. Check the message.
4. Restore setPosts(data).

Expected The page should display "No posts found".

Result: Passed. The message "No posts found" appeared when the posts array was empty.

## Test 9: Failed Request

Steps:
1. Temporarily change the API URL to an invalid endpoint.
2. Click Load posts.
3. Check the error message.
4. Restore the correct URL.

Expected: A friendly error message should appear, and the button should allow another attempt.

Result: Passed. The error message appeared after using an invalid URL.

## Test 10: Browser Network Request

Steps:
1. Open Developer Tools and go to Network.
2. Select Fetch/XHR.
3. Refresh the page.
4. Click Load posts.
5. Check the request in the Network panel.

Expected: The posts request should appear after clicking the button. It should be separate from the requests made by the Server Components.
Result:v

## Notes

- Explore All Posts is a Client Component.
- The posts are fetched only when the button is clicked.
- I used React state to handle loading, posts, and errors.
- Suspense is not used for this button-triggered request.

# Error Handling Mission

## Test 11: Demo Scenarios

Steps:
1. Select each scenario from the dropdown.
2. Click Load posts.
3. Check the result.

Result: Passed.
- Success: Real posts appeared.
- Slow: Loading appeared before the posts.
- HTTP 503: A friendly error message appeared.
- Network error: A connection error message appeared.
- Empty: "No posts found" appeared.

## Test 12: Retry After Error

Steps:
1. Select HTTP 503 and click Load posts.
2. Change the scenario to Success.
3. Click Retry.

Result: Passed. The posts loaded successfully after retrying.

## Test 13: Recent Posts Error

Steps:
1. Temporarily change the Recent Posts API URL to an invalid endpoint.
2. Refresh the page.
3. Check the other sections.
4. Restore the correct URL.

Result: Passed. Recent Posts showed a friendly error message, while Employee Profile and Explore All Posts continued working.

## Notes

- I used ApiError to handle HTTP errors.
- Network errors are handled separately.
- The demo errors and empty responses are simulated, not returned by the real API.
- The loading state resets after success or failure.

## Final Testing Summary

| Check | Expected | Actual | Status |
|---|---|---|---|
| Server profile | Show employee details | All details displayed | Pass |
| Server preview | Show loading fallback | Fallback appeared before posts | Pass |
| Client idle | Wait for button click | No request before clicking | Pass |
| Client slow | Show loading, block extra clicks | Loading shown, button disabled | Pass |
| Client success | Show titles and bodies | All posts displayed | Pass |
| HTTP failure | Handle error using `ApiError` | Friendly error shown | Pass |
| Empty response | Show "No posts found" | Message displayed | Pass |
| Recovery | Retry after error | Posts loaded after retry | Pass |
| Section independence | Keep server sections visible | Both sections stayed visible | Pass |
| Usability | Work with keyboard and at 360px | Both checks passed | Pass |

### Notes

- HTTP errors, network errors, and empty responses were simulated.
- Success and Slow used the real API.
- All 10 checks passed.