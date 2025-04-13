import React from "react";
import Feed from "./Feed/Feed";
import style from "./Home.module.css";

const Home = ({ user, links }) => {
  React.useEffect(() => {
    localStorage.setItem("usuario", JSON.stringify(user));
  }, []);
  console.log(user);

  return (
    <>
      <Feed user={user} links={links} />
    </>
  );
};
export default Home;
