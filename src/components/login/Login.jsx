import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { loginApi } from "../../api/loginApi";
import Cookies from "js-cookie";
import { access_token, username } from "../../store/login";
import { useRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { loginApi } from "../../api/loginApi";

function Form(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useRecoilState(access_token);
  const [user, setUser] = useRecoilState(username);

  const onSubmit = (data) => {
    const getToken = async () => {
      try {
        const response = await loginApi.getToken(data);

        setAccessToken(response.data.data[0].accessToken);
        setUser(response.data.data[0].user.username);

        sessionStorage.setItem("token", response.data.data[0].accessToken);
        navigate("/home");
        // console.log(response);
      } catch (error) {
        alert("Sai tên đăng nhập hoặc mật khẩu");
      }
    };
    getToken();
  };
  const link = "/forgot-pasword";
  const linkRegister = "/signup";
  const [dataLogin, setDataLogin] = useState({});

  return (
    <div id="wrapper">
      <form action="" id="form-login" onSubmit={handleSubmit(onSubmit)}>
        <h1 class="form-heading">Form đăng nhập</h1>
        <div class="form-group">
          <i class="far fa-user"></i>
          <input
            type="text"
            class="form-input"
            placeholder="Tên đăng nhập"
            defaultValue=""
            {...register("username")}
          />
        </div>
        <div class="form-group">
          <i class="fas fa-key"></i>
          <input
            type="password"
            class="form-input"
            placeholder="Mật khẩu"
            defaultValue=""
            {...register("password")}
          />
          <div id="eye">
            <i class="far fa-eye"></i>
          </div>
        </div>
        <input
          type="submit"
          value="Đăng nhập"
          class="form-submit"
          onClick={handleSubmit}
        />
        <Link to={linkRegister}>
          <input
            type="submit"
            value="Đăng ký"
            class="form-submit"
            onClick={handleSubmit}
          />
        </Link>

        <Link to={link}>Quên mật khẩu?</Link>
      </form>
    </div>
  );
}

export default Form;
