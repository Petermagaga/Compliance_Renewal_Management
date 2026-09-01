import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {

            const response = await api.post(
                "/auth/forgot-password/",
                {
                    email: email.trim(),
                }
            );

            setMessage(
                response.data.message ||
                "If an account exists with this email, a password reset link has been sent."
            );

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                "Unable to process your request. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">

                    <div className="text-center mb-8">

                        <h1 className="text-2xl font-bold text-gray-900">
                            Forgot Password?
                        </h1>

                        <p className="text-sm text-gray-500 mt-2">
                            Enter your email address and we'll send you a
                            password reset link.
                        </p>

                    </div>

                    {message && (
                        <div className="mb-5 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>

                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email address
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="
                                    w-full
                                    rounded-lg
                                    border border-gray-300
                                    px-4 py-3
                                    text-sm
                                    outline-none
                                    focus:ring-2
                                    focus:ring-brand-green
                                    focus:border-brand-green
                                "
                            />

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full
                                rounded-lg
                                bg-brand-green
                                px-4 py-3
                                text-sm
                                font-semibold
                                text-white
                                hover:bg-green-700
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >
                            {loading
                                ? "Sending..."
                                : "Send Reset Link"
                            }
                        </button>

                    </form>

                    <div className="text-center mt-6">

                        <Link
                            to="/login"
                            className="
                                text-sm
                                font-semibold
                                text-brand-green
                                hover:text-green-700
                            "
                        >
                            ← Back to Login
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ForgotPassword;