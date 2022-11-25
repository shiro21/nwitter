import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { auth } from "fbase";
import "style.scss";
import "_reset.scss";

function App() {

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
        });
      }
      else {
        setUserObj(null);
        setIsLoggedIn(false);
      }

      setInit(true);
    })
  }, []);

  const refreshUser = () => {
    // setUserObj({...auth.currentUser});
    setUserObj(Object.assign({}, auth.currentUser));
  };


  return (
    <>
      { init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser} /> : "Initializing(초기화 중)...!" }
      <footer>&copy; {new Date().getFullYear()} Nwittrer</footer>
    </>
  );
}

export default App;
