import React, { createContext, useContext, useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signInWithGoogle = async () => {
    try {
      // In Amplify v5, use federatedSignIn to trigger social sign-in
      await Auth.federatedSignIn({ provider: 'Google' });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const logout = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        setCurrentUser(user);
        setLoading(false);
      })
      .catch(() => {
        setCurrentUser(null);
        setLoading(false);
      });

    const listener = (data) => {
      const { payload } = data;
      if (payload.event === 'signIn') {
        setCurrentUser(payload.data);
      } else if (payload.event === 'signOut') {
        setCurrentUser(null);
      }
    };

    const unsubscribe = Hub.listen('auth', listener);
    return () => unsubscribe();
  }, []);

  const value = { currentUser, signInWithGoogle, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
