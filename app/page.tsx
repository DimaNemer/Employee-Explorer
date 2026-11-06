
import { Suspense } from 'react';
import EmployeeProfile from '../components/EmployeeProfile';
import RecentPosts from '../components/RecentPosts';
import ExplorePosts from '../components/ExplorePosts';

export default function Home() {
  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Employee Explorer</h1>
        <p>
          A simple dashboard to explore server and client data fetching.
        </p>
      </header>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <Suspense fallback={<p>Loading employee profile...</p>}>
            <EmployeeProfile />
          </Suspense>
        </div>

        <div className="dashboard-card">
          <Suspense fallback={<p>Loading recent posts...</p>}>
            <RecentPosts />
          </Suspense>
        </div>
      </div>

      <div className="dashboard-card explore-section">
        <ExplorePosts />
      </div>
    </main>
  );
}
