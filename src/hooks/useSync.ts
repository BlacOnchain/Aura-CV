import { useEffect, useRef } from 'react';
import { SavedResume } from '../types/resume';
import { useAuth } from '../components/Auth/AuthContext';

export const useSync = (savedResumes: SavedResume[]) => {
  const { user, getToken } = useAuth();
  const initialSyncDone = useRef(false);
  const apiUrl = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    if (!user || initialSyncDone.current) return;
    
    // Initial fetch from Laravel (if we wanted to merge, but prompt says sync local to laravel)
    initialSyncDone.current = true;
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const syncToLaravel = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        // Use the new bulk-sync endpoint to avoid N requests
        await fetch(`${apiUrl}/api/v1/resumes/bulk-sync`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          },
          body: JSON.stringify({ resumes: savedResumes })
        });
      } catch (error) {
        console.error('Auto-sync failed', error);
      }
    };

    const timer = setTimeout(syncToLaravel, 2000); // Debounce sync
    return () => clearTimeout(timer);
  }, [savedResumes, user]);
};
