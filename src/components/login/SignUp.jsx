import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { loginApi } from "../../api/loginApi";
import Cookies from "js-cookie";
import { access_token } from "../../store/login";
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

  //   const [accessToken, setAccessToken] = useRecoilState(access_token);

  const onSubmit = (data) => {
    const getToken = async () => {
      try {
        const response = await loginApi.signUp(data);
        // setAccessToken(response.data.data[0].accessToken);
        // sessionStorage.setItem("token", response.data.data[0].accessToken);
        alert("Đăng ký thành công");
        navigate("/home");
      } catch (error) {
        alert("Đăng ký thất bại");
      }
    };
    getToken();
  };
  //   const link = "/forgot-pasword";
  const linkLogin = "/login";

  return (
    <div id="wrapper">
      <form action="" id="form-login" onSubmit={handleSubmit(onSubmit)}>
        <h1 class="form-heading">Form đăng nhập</h1>
        <div class="form-group">
          <i class="fa fa-envelope"></i>
          <input
            type="text"
            class="form-input"
            placeholder="Email"
            defaultValue=""
            {...register("email")}
          />
        </div>
        <div class="form-group">
          <i class="fas fa-user"></i>
          <input
            type="text"
            class="form-input"
            placeholder="Username"
            defaultValue=""
            {...register("username")}
          />
        </div>

        <div class="form-group">
          <i class="fas fa-key"></i>
          <input
            type="password"
            class="form-input"
            placeholder="Password"
            defaultValue=""
            {...register("password")}
          />
          <div id="eye">
            <i class="far fa-eye"></i>
          </div>
        </div>

        <input
          type="submit"
          value="Đăng ký"
          class="form-submit"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}

export default Form;
