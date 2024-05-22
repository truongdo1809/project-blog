import React from "react";
import { FaGithub } from "react-icons/fa6";
import { FaGooglePlusG } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { registerUser } from "~/app/lib/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import "./login.css";
import { signIn } from "next-auth/react";
import authSlice from "~/app/lib/features/authSlice";
import { toast } from "react-toastify";
interface RegisterForm {
  email: string;
  password: string;
  username: string;
}
const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, error, registerErroorMessage } = useSelector(
    authSlice.selectSlice
  );
  const {
    register: registerForm,
    handleSubmit: handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterForm>();

  const handleRegister = (data: RegisterForm) => {
    registerUser(data, dispatch, router);
    reset();
    if (user && user?.user.accessToken) {
      LocalStorage(user?.user.accessToken);
    }
  };
  const LocalStorage = (accessToken: string) => {
    // Kiểm tra xem trình duyệt có hỗ trợ Session Storage không
    if (typeof window !== "undefined" && window.localStorage) {
      // Lưu access token vào Session Storage
      window.localStorage.setItem("accessToken", accessToken);
    } else {
      console.error("Trình duyệt không hỗ trợ Session Storage.");
    }
  };

  const handleLoginGG = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
      toast.success("login success with google!");
    } catch (error) {
      toast.error("login false");
    }
  };
  const handleGithubLogin = async () => {
    try {
      await signIn("github", { callbackUrl: "/" });
      toast.success("login success with github!");
    } catch (error) {
      toast.error("login false");
    }
  };
  const handleFacebookLogin = async () => {
    try {
      await signIn("facebook", { callbackUrl: "/" });
      toast.success("login success with github!");
    } catch (error) {
      toast.error("login false");
    }
  };

  return (
    <div className="form-container sign-up">
      <form onSubmit={handleSubmit(handleRegister)}>
        <h1>Create Account</h1>
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
        <input
          type="text"
          placeholder="Name"
          {...registerForm("username", {
            required: "Username is required !",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters !",
            },
            maxLength: {
              value: 20,
              message: "Username must not exceed 20 characters !",
            },
            pattern: {
              value: /^[A-Z][a-zA-Z0-9]{2,19}$/,
              message: "Username must start with a capital letter",
            },
          })}
        />
        {errors.username && (
          <span className=" text-red ">{errors.username.message}</span>
        )}
        {error && !errors.username && (
          <span className=" text-red ">{registerErroorMessage}</span>
        )}
        <input
          type="email"
          placeholder="Email"
          {...registerForm("email", {
            required: "Email is required!",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "You entered the wrong gmail format",
            },
          })}
        />
        {errors.email && (
          <span className="text-red">{errors.email.message}</span>
        )}
        {error && !errors.email && (
          <span className=" text-red ">{registerErroorMessage}</span>
        )}
        <input
          type="password"
          placeholder="Password"
          {...registerForm("password", {
            required: "Password is required!",
            minLength: {
              value: 1,
              message: "Password must be at least 1 characters!",
            },
            maxLength: {
              value: 20,
              message: "Password must not exceed 20 characters!",
            },
          })}
        />
        {errors.password && (
          <span className="text-red">{errors.password.message}</span>
        )}
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
