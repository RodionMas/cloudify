import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import style from './Login.module.css'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchLogin } from '../../../store/authSlice';
import { selectAuth } from '../../../selectors/selectors';

const Login: React.FC = () => {
  const appDispatch = useAppDispatch()
  const {userRegister} = useAppSelector(selectAuth)
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
          username: `${userRegister.username || ''}`,
          password: `${userRegister.password || ''}`,
        },
      });
      const onSubmit: SubmitHandler<Inputs> = (data) => {
        appDispatch(fetchLogin(data))
      };
      console.log(userRegister)
      React.useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
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
                <span>
                  error:{" "}
                  {errors.username.message
                    ? errors.username.message
                    : 'min length 3, max length 20'}
                </span>
              )}
              <label htmlFor="password">Password</label>
              <input
                type='password'
                className={style.password}
                placeholder="Enter your password..."
                id="password"
                {...register("password", {
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                })}
              />
              {errors.password && <span>error: {errors.password.type === 'minLength' ? 'minLength 3' : 'maxLength 20'}</span>}
              <input  className={style.create} value={"Log in"} type="submit" />
            </div>
          </form>
        </div>
      );
    };

export default Login;