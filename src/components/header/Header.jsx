import React from "react";

import { Link, useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { access_token, username } from "../../store/login";

import "./header.scss";

import logo from "../../assets/tmovie.png";

const headerNav = [
  {
    display: "Trang Chủ",
    path: "/home",
  },
  {
    display: "Danh sách truyện",
    path: "/comics",
  },
];

const Header = () => {
  const [accessToken, setAccessToken] = useRecoilState(access_token);
  const [user, setUser] = useRecoilState(username);

  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const active = headerNav.findIndex((e) => e.path === pathname);
  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  const signOut = () => {
    sessionStorage.removeItem("token");
    setAccessToken("");
    setUser("");
  };
  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="123" />
          <Link to="/home">Truyện Hay</Link>
        </div>
        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
          {user ? <li>Hello {user}</li> : ""}
          <li>
            <Link to="/login" onClick={signOut}>
              {accessToken ? "Đăng xuất " : "Đăng nhập"}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
