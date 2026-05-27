import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../services/auth.context';
import Logo from '../../assets/logo_with_name.webp';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await login(email, password);
      if (res?.token) {
        navigate('/');
      } else {
        console.log(res, 'check this');
        setError(res?.response?.data?.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#051b28] flex relative overflow-hidden">
      {/* Animated background effects - subtle enhancements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#70878d]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#958260]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#70878d]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Left branding panel */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative z-10 p-12">
        <div className="backdrop-blur-xl bg-[#70878d]/10 border border-[#958260]/20 rounded-3xl p-12 shadow-2xl max-w-lg transition-all duration-500 hover:scale-105 hover:shadow-[#958260]/20">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <img
                src={Logo}
                alt="Pravraha Logo"
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="text-xl text-[#958260] font-semibold">
              Next-Generation Admin Dashboard
            </p>
            <ul className="space-y-4 text-left text-[#70878d]">
              <li className="flex items-center space-x-3 group">
                <span className="w-2 h-2 bg-[#958260] rounded-full group-hover:scale-150 transition-transform"></span>
                <span className="text-sm font-medium">Advanced Analytics & Insights</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <span className="w-2 h-2 bg-[#958260] rounded-full group-hover:scale-150 transition-transform"></span>
                <span className="text-sm font-medium">Real-time Data Management</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <span className="w-2 h-2 bg-[#958260] rounded-full group-hover:scale-150 transition-transform"></span>
                <span className="text-sm font-medium">Enterprise Security</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right login panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <img
              src={Logo}
              alt="Pravraha Logo"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Login Card */}
          <div className="backdrop-blur-xl bg-[#70878d]/15 border border-[#958260]/30 rounded-3xl p-8 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-[#958260]/30">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#958260] mb-2">Welcome Back</h2>
              <p className="text-[#70878d]">Sign in to continue to your dashboard</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-[#958260]">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#70878d] pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-[#051b28]/60 border border-[#70878d]/30 rounded-2xl text-white placeholder-[#70878d]/60 focus:outline-none focus:ring-2 focus:ring-[#958260] focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-[#958260]">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#70878d] pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-12 py-4 bg-[#051b28]/60 border border-[#70878d]/30 rounded-2xl text-white placeholder-[#70878d]/60 focus:outline-none focus:ring-2 focus:ring-[#958260] focus:border-transparent transition-all duration-300"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#70878d] hover:text-[#958260] transition-colors focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-900/30 border border-red-500/40 rounded-2xl p-4 animate-pulse">
                  <p className="text-sm text-red-300 text-center">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full relative overflow-hidden group bg-gradient-to-r from-[#958260] via-[#70878d] to-[#958260] hover:from-[#70878d] hover:via-[#958260] hover:to-[#70878d] text-[#051b28] font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl hover:shadow-[#958260]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-[#958260] focus:ring-offset-2 focus:ring-offset-[#051b28]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10">
                  {loading ? (
                    <span className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-[#051b28]/30 border-t-[#051b28] rounded-full animate-spin"></div>
                      <span>Signing you in...</span>
                    </span>
                  ) : (
                    'Sign In to Dashboard'
                  )}
                </span>
              </button>

              {/* Footer */}
              <div className="text-center pt-6 border-t border-[#70878d]/30">
                <p className="text-xs text-[#70878d]">Protected by enterprise-grade security</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;