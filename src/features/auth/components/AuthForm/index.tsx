import { LogoIcon } from "@/assets/icons";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./AuthForm.module.css";
import axios from "axios";
const AuthForm = ({ btnText, type, title }: any) => {
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      const respons = await signIn("credentials", {
        email: data.username,
        password: data.password,
        redirect: false,
      })
        .then((res) => res)
        .catch((err) => err);
      console.log(respons);
      if (respons.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
    }
  };

  const handleSignUp = async (event: any) => {
    event.preventDefault();
    try {
      // Отправляем данные на сервер
      const response = await axios.post("exaple/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Устанавливаем заголовок Content-Type для указания формата данных
        },
        body: JSON.stringify({
          email: data.username,
          password: data.password,
        }),
      });
      // Если запрос выполнен успешно (статус 200), перенаправляем пользователя на главную страницу
      if (response.status === 201) {
        router.push("/auth"); // Предполагается, что у вас есть объект router с методом push для перенаправления
      } else {
        // Обрабатываем другие возможные статусы ответа
        console.error("Ошибка регистрации:", response.statusText);
      }
    } catch (error) {
      console.error("Ошибка при выполнении регистрации:", error);
    }
  };

  return (
    <div className={styles.auth_section}>
      <form
        className={styles.form}
        onSubmit={type === "sign" ? handleSignUp : handleLogin}>
        <Image src={LogoIcon} width={60} height={60} alt='#' />
        <h2>{title}</h2>
        <div className={styles.form_input}>
          <input
            className={styles.input}
            name='username'
            placeholder='Username'
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
        </div>
        <div className={styles.form_input}>
          <input
            className={styles.input}
            type='password'
            name='password'
            placeholder='Password'
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <button className={styles.btn} type='submit'>
          {btnText}
        </button>
        {type!=="sign" ?<p className={styles.form_forgot_password}>Forgot password</p>:<></>}
      </form>
      {type === "sign" ? (
          <p>
            Already have an account <a href='/auth'>Login</a>
          </p>
        ) : (
          <p>
            Don't have an account <a href='/auth/sign-up'>Sign-up</a>
          </p>
        )}
    </div>
  );
};

export default AuthForm;
