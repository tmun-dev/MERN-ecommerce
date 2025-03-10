import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useUserStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email, password);
    login(email, password);
  };

  return (
    <div className="h-screen flex items-start justify-center bg-white px-4 pt-20">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <h2 className="text-3xl text-center font-playfair text-[#0f2810] mb-1 font-light">
            Welcome Back
          </h2>
          <p className="text-center text-[#0f2810] text-sm">
            Sign in to your account
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6 border border-[#9ca]/20"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#0f2810] mb-1"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#9ca]" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 bg-white border border-[#9ca]/30 
                    rounded-md text-[#0f2810] placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-[#9ca] focus:border-transparent
                    transition duration-200"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#0f2810] mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#9ca]" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 bg-white border border-[#9ca]/30 
                    rounded-md text-[#0f2810] placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-[#9ca] focus:border-transparent
                    transition duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center py-2 px-4 
                bg-[#0f2810] hover:bg-[#1a3a1a] text-white rounded-md
                transition duration-200 disabled:opacity-50 mt-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                  Loading...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#0f2810]">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-medium text-[#0f2810] hover:text-[#9ca] transition duration-200"
            >
              Create an account <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
