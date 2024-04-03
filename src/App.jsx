
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Upload } from './pages/Upload';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { ProtectedRoute } from './components/protectedRoute/protectedRoute';
import { auth } from './firebase';

function App() {

  const [ user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user ) => {
      if (user) {
        setUser(user);

        return;
      }

      setUser(null);
    })
    return () => unsubscribe();
  }, [])
 
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home user={user}/>}></Route>
        <Route index path="/upload" element={
          <ProtectedRoute user={user}>
            <Upload/>
          </ProtectedRoute>
          }>
          
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
