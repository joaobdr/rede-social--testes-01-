import { Link } from "react-router-dom";
import style from "./Header.module.css";

const Header = ({ links, user }) => {
  console.log(user);
  console.log('teste =', links.base + user.foto_perfil);
  
  
  return (
    <header className={style.header}>
      <section className={`container ${style.section_header}`}>
        <Link to="/" className={style.logo}>
          Logo
        </Link>
        <ul className={style.ul_header}>
          <li>
            <Link to="/">
              <img src={links.base + user.foto_perfil} alt="" />
            </Link>
          </li>
        </ul>
      </section>
    </header>
  );
};

export default Header;
