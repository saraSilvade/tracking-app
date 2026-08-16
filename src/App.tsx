import React, { useState } from 'react';
import { initialUser } from './data/initialData';
import type { UserProfile } from './types';
import UserProfileBanner from './components/UserBanner';
import Header from './components/Header';
export default function App() {
  const [user, setUser] = useState<UserProfile>(initialUser);

  return (
    <div className="min-h-screen bg-app-bg text-text-main p-6 font-sans">
      <div className="max-w-7xl mx-auto">
     <Header/>
  <UserProfileBanner user={user} />
      </div>
    </div>
  );
}