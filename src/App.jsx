import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from './lib/supabase';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AdminLayout from './pages/admin/AdminLayout';

function App() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      // If the user logged in without "autoLogin", we sign them out when they leave
      if (sessionStorage.getItem('temp_session') === 'true') {
        supabase.auth.signOut();
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
