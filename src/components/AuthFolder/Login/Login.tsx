import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import style from "./Login.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchLogin } from "../../../store/authSlice";
import { selectAuth } from "../../../selectors/selectors";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const appDispatch = useAppDispatch();
  const { err } = useAppSelector(selectAuth);
  const [checkUser, setCheckUser] = React.useState(false)
  // Обработка ошибки, если она не строка
  const errorMessage: string | undefined = 
    typeof err === 'string' ? err : undefined;

  const { userRegister } = useAppSelector(selectAuth);

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
      username: `${userRegister.username || ""}`,
      password: `${""}`,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    appDispatch(fetchLogin(data));
    if (err) {
      setCheckUser(prev => prev = true)
    }
  };

  const { isAuth } = useSelector(selectAuth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuth) navigate("/home");
    window.scrollTo(0, 0);
  }, [isAuth, navigate]);
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Log in to your account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.registerBlock}>
          <label htmlFor="username">Login</label>
          <input
            className={style.username}
            placeholder="Enter your login..."
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
            <span className={style.errorInpValue}>
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
            placeholder="Enter your password..."
            id="password"
            {...register("password", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
          {errors.password && (
            <span className={style.errorInpValue}>
              error:{" "}
              {errors.password.type === "minLength"
                ? "minLength 3"
                : "maxLength 20"}
            </span>
          )}
          <input className={style.create} value={"Log in"} type="submit" />
          {errorMessage && checkUser && <span className={style.nonUser}>{errorMessage.includes('401') ? `incorrect login or password` : errorMessage}</span>}
        </div>
      </form>
    </div>
  );
};

export default Login;