import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    FiEye,
    FiEyeOff,
    FiLock,
    FiMail,
    FiShield,
} from "react-icons/fi";

import authService from "../services/authService";

import { useAuth } from "../context/AuthContext";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location=useLocation();
    const from =location.state?.from?.pathname || "/dashboard";
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");

        if (!email.trim() || !password) {
            setError("Please enter your email and password.");
            return;
        }

        setLoading(true);

        try {
            const result = await authService.login(
                email,
                password,
            );



            console.log("Login response:", result);

            await login(
                result.access,
                result.refresh,
            );

            
            navigate(from, { replace: true });

        } catch (err) {
            console.error("Login failed:", err);

            if (err.response?.status === 401) {
                setError("Invalid email or password.");
            } else {
                setError(
                    "Unable to sign you in right now. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">

            <div className="grid min-h-screen lg:grid-cols-2">

                {/* Brand panel */}

                <div
                    className="
                        hidden
                        bg-brand-dark
                        lg:flex
                        lg:flex-col
                        lg:justify-between
                        p-12
                        text-white
                    "
                >

                    <div>
                        <div
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-brand-yellow
                                    text-brand-dark
                                "
                            >
                                <FiShield size={22} />
                            </div>

                            <div>
                                <h1
                                    className="
                                        text-2xl
                                        font-bold
                                        text-brand-yellow
                                    "
                                >
                                    OpenComply
                                </h1>

                                <p
                                    className="
                                        text-xs
                                        text-green-100
                                    "
                                >
                                    Compliance Management System
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="max-w-lg">

                        <p
                            className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-wider
                                text-green-300
                            "
                        >
                            Compliance workspace
                        </p>

                        <h2
                            className="
                                mt-4
                                text-4xl
                                font-bold
                                leading-tight
                            "
                        >
                            Keep every compliance obligation
                            under control.
                        </h2>

                        <p
                            className="
                                mt-5
                                text-base
                                leading-7
                                text-green-100
                            "
                        >
                            Monitor licenses, permits,
                            certificates and insurance
                            renewals from one workspace.
                        </p>

                    </div>


                    <p className="text-xs text-green-200">
                        © {new Date().getFullYear()} OpenComply
                    </p>

                </div>


                {/* Login area */}

                <div
                    className="
                        flex
                        min-h-screen
                        items-center
                        justify-center
                        px-6
                        py-10
                        lg:px-12
                    "
                >

                    <div className="w-full max-w-md">

                        {/* Mobile logo */}

                        <div
                            className="
                                mb-8
                                flex
                                flex-col
                                items-center
                                lg:hidden
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-brand-green
                                    text-white
                                "
                            >
                                <FiShield size={23} />
                            </div>

                            <h1
                                className="
                                    mt-3
                                    text-2xl
                                    font-bold
                                    text-brand-green
                                "
                            >
                                OpenComply
                            </h1>

                            <p className="text-xs text-slate-500">
                                Compliance Management System
                            </p>
                        </div>


                        <div
                            className="
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                p-7
                                shadow-sm
                                sm:p-9
                            "
                        >

                            <div className="mb-8">

                                <h2
                                    className="
                                        text-2xl
                                        font-bold
                                        tracking-tight
                                        text-slate-900
                                    "
                                >
                                    Welcome back
                                </h2>

                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        text-slate-500
                                    "
                                >
                                    Sign in to your compliance
                                    workspace.
                                </p>

                            </div>


                            <form
                                onSubmit={handleLogin}
                                className="space-y-5"
                            >

                                {/* Email */}

                                <div>

                                    <label
                                        htmlFor="email"
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-medium
                                            text-slate-700
                                        "
                                    >
                                        Email address
                                    </label>

                                    <div className="relative">

                                        <FiMail
                                            size={18}
                                            className="
                                                absolute
                                                left-3
                                                top-1/2
                                                -translate-y-1/2
                                                text-slate-400
                                            "
                                        />

                                        <input
                                            id="email"
                                            type="email"
                                            autoComplete="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="you@company.com"
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-slate-200
                                                bg-white
                                                py-3
                                                pl-10
                                                pr-4
                                                text-sm
                                                text-slate-900
                                                outline-none
                                                transition
                                                placeholder:text-slate-400
                                                focus:border-brand-green
                                                focus:ring-2
                                                focus:ring-green-100
                                            "
                                        />

                                    </div>

                                </div>


                                {/* Password & me */}

                                <div>

                                    <div
                                        className="
                                            mb-2
                                            flex
                                            items-center
                                            justify-between
                                        "
                                    >

                                        <label
                                            htmlFor="password"
                                            className="
                                                text-sm
                                                font-medium
                                                text-slate-700
                                            "
                                        >
                                            Password
                                        </label>

                                        <Link
                                            to="/forgot-password"
                                            className="
                                                text-xs
                                                font-semibold
                                                text-brand-green
                                                hover:text-green-700
                                            "
                                        >
                                            Forgot password?
                                        </Link>

                                    </div>


                                    <div className="relative">

                                        <FiLock
                                            size={18}
                                            className="
                                                absolute
                                                left-3
                                                top-1/2
                                                -translate-y-1/2
                                                text-slate-400
                                            "
                                        />

                                        <input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            autoComplete="current-password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter your password"
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-slate-200
                                                bg-white
                                                py-3
                                                pl-10
                                                pr-12
                                                text-sm
                                                text-slate-900
                                                outline-none
                                                transition
                                                placeholder:text-slate-400
                                                focus:border-brand-green
                                                focus:ring-2
                                                focus:ring-green-100
                                            "
                                        />


                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    (prev) => !prev
                                                )
                                            }
                                            className="
                                                absolute
                                                right-3
                                                top-1/2
                                                -translate-y-1/2
                                                text-slate-400
                                                hover:text-slate-600
                                            "
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >
                                            {showPassword ? (
                                                <FiEyeOff size={18} />
                                            ) : (
                                                <FiEye size={18} />
                                            )}
                                        </button>

                                    </div>

                                </div>


                                {/* Remember */}

                                <label
                                    className="
                                        flex
                                        cursor-pointer
                                        items-center
                                        gap-2
                                    "
                                >

                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) =>
                                            setRememberMe(
                                                e.target.checked
                                            )
                                        }
                                        className="
                                            h-4
                                            w-4
                                            rounded
                                            border-slate-300
                                            text-brand-green
                                            focus:ring-brand-green
                                        "
                                    />

                                    <span
                                        className="
                                            text-sm
                                            text-slate-600
                                        "
                                    >
                                        Remember me
                                    </span>

                                </label>


                                {/* Error */}

                                {error && (
                                    <div
                                        className="
                                            rounded-xl
                                            border
                                            border-red-200
                                            bg-red-50
                                            px-4
                                            py-3
                                            text-sm
                                            text-red-700
                                        "
                                    >
                                        {error}
                                    </div>
                                )}


                                {/* Submit */}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-brand-green
                                        px-4
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-white
                                        shadow-sm
                                        transition
                                        hover:bg-green-700
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                >
                                    {loading
                                        ? "Signing in..."
                                        : "Sign in"}
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;