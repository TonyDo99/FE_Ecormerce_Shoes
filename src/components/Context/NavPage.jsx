import React, { useState, useEffect } from "react";

import { fetchCart } from "../../api/clientAPI";
import { Nav } from "../../pages/client/Home";

const UsersContext = React.createContext();

function NavPage() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let data = await fetchCart();
        setInfo([data] || []);
      } catch (error) {
        console.log(`%c ${error}`, "color: red");
      }
    })();
  }, []);
  return (
    <UsersContext.Provider value={info}>
      <Nav />
    </UsersContext.Provider>
  );
}

export { NavPage, UsersContext };
