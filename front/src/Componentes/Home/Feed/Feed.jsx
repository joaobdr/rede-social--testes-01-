import React from "react";
import style from "./Feed.module.css";

const Feed = ({ user, links }) => {
  const [pag, setPag] = React.useState(1);
  // console.log(user);

  React.useEffect(() => {
    fetch(`${links.feed}?id=${user.id}&token=${123}&pag=${pag}`)
      .then((x) => x.json())
      .then((x) => console.log(x));
  }, []);

  return (
    <main className={`container ${style.main}`}>
      <h2 className={style.titulo}>Feed</h2>

      <section></section>
    </main>
  );
};

export default Feed;
