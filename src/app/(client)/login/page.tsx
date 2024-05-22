"use client";
import React, { useEffect, useState } from "react";
import "./login.css";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { FaGooglePlusG } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { loginUser } from "~/app/lib/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Register from "./register";
import { signIn, useSession } from "next-auth/react";
import authSlice from "~/app/lib/features/authSlice";
import { toast } from "react-toastify";

interface Login {
  username: string;
  password: string;
}
const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, error, errorMessage } = useSelector(authSlice.selectSlice);
  const {
    register: LoginForm,
    handleSubmit: handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Login>();

  const handleRegisterClick = () => {
    setIsActive(true);
  };
  const session = useSession();

  useEffect(() => {
    if (
      ((user || session) && user) ||
      (session && session.data && session.data.user)
    ) {
      router.push("/");
    }
  }, [user, session, router]);

  // login
  const handleLogin = (data: Login) => {
    loginUser(data, dispatch);
    reset();
    if (user && user?.user.accessToken) {
      localStorage.setItem("accessToken", user.user.accessToken);
    }
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleLoginGG = async () => {
    try{

      await signIn("google", { callbackUrl: "/" });
      toast.success("login success with google!");
    }catch(error){
      toast.error("login false")
    }
  };
  const handleGithubLogin = async () => {
    try{

      await signIn("github", { callbackUrl: "/" });
      toast.success("login success with github!");
    }catch(error){
      toast.error("login false")
    }
  };
  const handleFacebookLogin = async () => {
    try{

      await signIn("facebook", { callbackUrl: "/" });
      toast.success("login success with github!");
    }catch(error){
      toast.error("login false")
    }
  };

  return (
    <div className="py-[100px] flex justify-center items-center">
      <div
        className={isActive ? "active container" : "container"}
        id="container"
      >
        <Register />
        <div className="form-container sign-in">
          <form onSubmit={handleSubmit(handleLogin)}>
            <h1>Sign In</h1>
            <div className="social-icons">
              <Link href="#" className="icon" onClick={handleLoginGG}>
                <FaGooglePlusG />
              </Link>

              <Link href="#" className="icon" onClick={handleFacebookLogin}>
                <FaFacebookF />
              </Link>
              <Link href="#" className="icon" onClick={handleGithubLogin}>
                <FaGithub />
              </Link>
              <Link href="#" className="icon">
                <FaLinkedinIn />
              </Link>
            </div>
            <span>or use your email and password</span>
            <input
              type="email"
              placeholder="Email"
              {...LoginForm("username", {
                required: "Email is required!",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "You entered the wrong gmail format",
                },
              })}
            />
            {errors.username && (
              <span className="text-red">{errors.username.message}</span>
            )}
            {error && !errors.username && (
              <span className="text-red">{errorMessage}</span>
            )}
            <input
              type="password"
              placeholder="Password"
              {...LoginForm("password", {
                required: "Password is required!",
              })}
            />
            {errors.password && (
              <span className="text-red">{errors.password.message}</span>
            )}

            {error && !errors.password && (
              <span className="text-red">{errorMessage}</span>
            )}
            <Link href="#">Forget Your Password?</Link>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all site features</p>
              <button className="" id="login" onClick={handleLoginClick}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all site features
              </p>
              <button className="" id="register" onClick={handleRegisterClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
