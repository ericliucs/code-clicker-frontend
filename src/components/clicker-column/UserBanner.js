import { useState, useEffect } from 'react';
import eventService from "../../services/events";

export default function UserRepository() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setUsername(user.username);
      }
    } catch (error) {
      console.error('Error getting username:', error);
    }

    const loginUnsub = eventService.subscribe('auth:login', (user) => {
      setUsername(user.username);
    });

    const logoutUnsub = eventService.subscribe('auth:logout', () => {
      setUsername(null);
    });

    return () => {
      loginUnsub();
      logoutUnsub();
    };
  }, []);

  if (!username) return null;

  return (
    <h2 className="mt-4 p-4 text-2xl bg-slate-800/50 font-bold rounded-xl ">
      {`${username}'s repository`}
    </h2>
  );
}