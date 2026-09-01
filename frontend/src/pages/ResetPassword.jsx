import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ResetPassword() {

    const { uid, token } = useParams();

    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");
        setMessage("");

        try {

            const response = await api.post(
                "/auth/reset-password/",
                {
                    uid,
                    token,
                    new_password: newPassword,
                    confirm_password: confirmPassword,
                }
            );

            setMessage(
                response.data.message ||
                "Password reset successfully."
            );

            /*
             * Give the user a moment to see the success
             * message, then return to login.
             */
            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {

            console.error(err);

            const backendMessage =
                err.response?.data?.message;

            if (Array.isArray(backendMessage)) {
                setError(backendMessage.join(" "));
            } else {
                setError(
                    backendMessage ||
                    "Unable to reset your password. Please try again."
                );
            }

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
                            Reset Password
                        </h1>

                        <p className="text-sm text-gray-500 mt-2">
                            Create a new password for your account.
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

                        {/* New Password */}

                        <div>

                            <label
                                htmlFor="new-password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                New Password
                            </label>

                            <input
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                placeholder="Enter new password"
                                minLength={8}
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

                            <p className="text-xs text-gray-500 mt-1">
                                Password must be at least 8 characters.
                            </p>

                        </div>

                        {/* Confirm Password */}

                        <div>

                            <label
                                htmlFor="confirm-password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Confirm Password
                            </label>

                            <input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="Confirm new password"
                                minLength={8}
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

                        {/* Submit */}

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
                                ? "Resetting..."
                                : "Reset Password"
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

export default ResetPassword;