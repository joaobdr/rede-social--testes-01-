import React from "react";
import style from "./Feed.module.css";
import Post from "./Post/Post";
import Load from "../../Load/Load";

const Feed = ({ user, links }) => {
  const [pag, setPag] = React.useState(1);
  const [conteudos, setConteudos] = React.useState(null);
  // console.log(user);

  React.useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        id: user.id,
        token: user.token,
        pag,
      },
    };
    fetch(links.feed, options)
      .then((x) => x.json())
      .then((x) => setConteudos(x));
  }, []);

  return (
    <main className={`container ${style.main}`}>
      <h2 className={style.titulo}>Feed</h2>

      <section className={style.section_posts}>
        {conteudos ? (
          conteudos.map((x, y) => <Post key={y} links={links} content={x} />)
        ) : (
          <Load />
        )}
      </section>
    </main>
  );
};

export default Feed;
