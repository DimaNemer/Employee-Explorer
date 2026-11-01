# Initial Predictions
1. Where will each of the three requests run?
- employee profile i will use the server components async await since i need to retrive the employee information for api 
- Recent Posts Preview i will use async server component since i also need to retrive info from apip 
- Explore All Posts i will use client component since there is client interaction by clicking the button 

2. What should remain visible while the server posts preview loads?
employee profile information reamin visible while the Recent Posts Preview is loading.

3. Will wrapping a click-handler fetch in Suspense automatically display its fallback?
No, it doesn't automatically handle fetching when clicking a button. I will use useState to manage the loading state.

4. If an HTTP response has status 503, will fetch automatically throw?
yes it will be throw an error