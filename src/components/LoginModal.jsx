"use client";
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginModal({ isOpen, onClose }) {
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (!phoneOrEmail) {
      setError('Please enter valid Email ID/Mobile number');
      return;
    }
    if (isSignUpMode && !name) {
      setError('Please enter your name');
      return;
    }
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_or_email: phoneOrEmail })
      });
      const data = await res.json();
      if (res.ok) {
        setStep(2);
      } else {
        setError(data.error);
      }
    } catch (e) {
      setError('Something went wrong. Please try again.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_or_email: phoneOrEmail, otp, name: name || undefined })
      });
      const data = await res.json();
      if (res.ok) {
        login({ id: data.user.id, name: data.user.name, emailOrPhone: data.user.phone_or_email });
        onClose();
        setStep(1);
        setPhoneOrEmail('');
        setOtp('');
        setName('');
        setIsSignUpMode(false);
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (e) {
      setError('Something went wrong.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
      <div className="flex w-[750px] h-[528px] bg-white rounded-sm overflow-hidden relative shadow-lg">
        <button onClick={onClose} className="absolute right-4 top-4 text-3xl font-light text-black hover:text-gray-700 z-10 w-8 h-8 flex items-center justify-center leading-none">
          &times;
        </button>

        <div className="w-[40%] bg-[#2874f0] px-[35px] py-[40px] flex flex-col justify-between text-white relative">
          <div>
            <h2 className="text-[28px] font-medium mb-4">{isSignUpMode ? 'Sign Up' : 'Login'}</h2>
            <p className="text-[18px] text-[#dbe1e1] leading-tight pr-4">
              {isSignUpMode ? "Looks like you're new here! Sign up to get started" : "Get access to your Orders, Wishlist and Recommendations"}
            </p>
          </div>
          <div className="flex justify-center -mb-8">
            <img 
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" 
              alt="Login illustration" 
              className="w-full object-contain"
            />
          </div>
        </div>

        <div className="w-[60%] px-[35px] py-[50px] bg-white flex flex-col justify-between relative">
          <div>
            {step === 1 ? (
              <form onSubmit={handleRequestOtp} className="mt-4">
                <div className="relative mb-6">
                  <input 
                    type="text" 
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    className="w-full border-b border-gray-300 py-2 outline-none focus:border-fk-blue transition-colors peer bg-transparent text-[15px]"
                    placeholder=" "
                    required
                  />
                  <label className="absolute left-0 top-3 text-[15px] text-[#878787] transition-all peer-focus:-top-3 peer-focus:text-[12px] peer-focus:text-fk-blue peer-valid:-top-3 peer-valid:text-[12px]">
                    Enter Email/Mobile number
                  </label>
                  {error && <div className="text-[#ff6161] text-[12px] mt-1">{error}</div>}
                </div>

                {isSignUpMode && (
                  <div className="relative mb-6">
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border-b border-gray-300 py-2 outline-none focus:border-fk-blue transition-colors peer bg-transparent text-[15px]"
                      placeholder=" "
                      required
                    />
                    <label className="absolute left-0 top-3 text-[15px] text-[#878787] transition-all peer-focus:-top-3 peer-focus:text-[12px] peer-focus:text-fk-blue peer-valid:-top-3 peer-valid:text-[12px]">
                      Enter your Name
                    </label>
                  </div>
                )}
                
                <p className="text-[12px] text-[#878787] mt-8 mb-4 tracking-wide font-medium">
                  By continuing, you agree to Flipkart's <a href="#" className="text-[#2874f0]">Terms of Use</a> and <a href="#" className="text-[#2874f0]">Privacy Policy</a>.
                </p>

                <button 
                  type="submit" 
                  className="w-full bg-[#fb641b] text-white py-[14px] text-[15px] font-medium shadow-sm rounded-[2px]"
                >
                  Request OTP
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="mt-4">
                 <div className="text-[14px] text-gray-700 mb-6">
                   Please enter the OTP sent to <b>{phoneOrEmail}</b>. (Hint: Use 1234)
                   <span className="text-fk-blue ml-2 cursor-pointer text-xs font-medium" onClick={() => setStep(1)}>Change</span>
                 </div>
                 
                 <div className="relative mb-6">
                  <input 
                    type="text" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border-b border-gray-300 py-2 outline-none focus:border-fk-blue transition-colors peer bg-transparent text-[15px]"
                    placeholder=" "
                    required
                  />
                  <label className="absolute left-0 top-3 text-[15px] text-[#878787] transition-all peer-focus:-top-3 peer-focus:text-[12px] peer-focus:text-fk-blue peer-valid:-top-3 peer-valid:text-[12px]">
                    Enter OTP
                  </label>
                </div>

                {error && <div className="text-[#ff6161] text-[12px] mt-1">{error}</div>}

                <button 
                  type="submit" 
                  className="w-full bg-[#fb641b] text-white py-[14px] text-[15px] font-medium shadow-sm rounded-[2px]"
                >
                  Verify
                </button>
              </form>
            )}
          </div>

          <div className="text-center mt-auto pb-4">
            <button 
              onClick={() => { setIsSignUpMode(!isSignUpMode); setStep(1); setError(''); }}
              className="text-fk-blue font-medium text-[14px] hover:underline cursor-pointer"
            >
              {isSignUpMode ? 'Existing User? Log in' : 'New to Flipkart? Create an account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
