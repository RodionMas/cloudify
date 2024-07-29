import React from "react";
import style from "./Register.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { changeRegUser, fetchRegister } from "../../../store/authSlice";
import { selectAuth } from "../../../selectors/selectors";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const appDispatch = useAppDispatch();
  const errReducer = useAppSelector(selectAuth).err;
  let userRegister = useAppSelector(selectAuth).userRegister;
  const navigate = useNavigate();
  type Inputs = {
    username: string | undefined;
    password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    appDispatch(fetchRegister(data))
    appDispatch(changeRegUser(data))
    return navigate('/login')
  };
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Create a new account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.registerBlock}>
          <label htmlFor="username">Login</label>
          <input
            className={style.username}
            placeholder="Create your login..."
            id="username"
            {...register("username", {
              required: true,
              minLength: 3,
              maxLength: 20,
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: "Only English letters and numbers are allowed",
              },
            })}
          />
          {errors.username && (
            <span>
              error:{" "}
              {errors.username.message
                ? errors.username.message
                : "min length 3, max length 20"}
            </span>
          )}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className={style.password}
            placeholder="Create your password..."
            id="password"
            {...register("password", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
          {errors.password && (
            <span>
              error:{" "}
              {errors.password.type === "minLength"
                ? "minLength 3"
                : "maxLength 20"}
            </span>
          )}
          {errReducer === "Request failed with status code 409" && (
            <span>Such user already exists</span>
          )}
          <input className={style.create} value={"Create"} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Register;
