import React, { useEffect, useRef } from 'react';
import { BookOpen, LogOut, User as UserIcon } from 'lucide-react';
import { GoogleUser } from '../types';

interface HeaderProps {
  totalProcedures: number;
  user: GoogleUser | null;
  onLogout: () => void;
  oauthClientId: string;
  onLoginCredential: (credential: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalProcedures,
  user,
  onLogout,
  oauthClientId,
  onLoginCredential,
}) => {
  const googleBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) return; // No need to render GIS button if logged in

    const interval = setInterval(() => {
      if (window.google?.accounts?.id && googleBtnRef.current) {
        clearInterval(interval);
        try {
          window.google.accounts.id.initialize({
            client_id: oauthClientId,
            callback: (res) => {
              if (res.credential) {
                onLoginCredential(res.credential);
              }
            },
          });

          // Render official Google button
          googleBtnRef.current.innerHTML = '';
          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: 'outline',
            size: 'medium',
            text: 'signin_with',
            shape: 'pill',
            locale: 'vi',
          });
        } catch (err) {
          console.error('Failed to initialize GIS in Header:', err);
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [user, oauthClientId, onLoginCredential]);

  return (
    <header className="bg-black text-white py-3 px-4 sm:px-6 lg:px-8 border-b border-gray-800 shadow-md">
      <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left Side: Top-Left Login/User status + Title */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          
          {/* Top-Left Login Position */}
          <div className="shrink-0 flex items-center">
            {user ? (
              <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 px-3 py-1 rounded-full text-xs">
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.email}
                    className="w-5 h-5 rounded-full object-cover border border-blue-400"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-blue-900 flex items-center justify-center text-white text-[10px] font-bold">
                    <UserIcon className="w-3 h-3" />
                  </div>
                )}
                <span className="font-semibold text-blue-200 text-[11px] truncate max-w-[140px] sm:max-w-[180px]">
                  {user.email}
                </span>
                <button
                  onClick={onLogout}
                  title="Đăng xuất khỏi tài khoản Google"
                  className="ml-1 text-gray-400 hover:text-red-400 p-1 rounded-full transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="min-h-[36px] flex items-center">
                <div ref={googleBtnRef} id="google-signin-btn-container" />
              </div>
            )}
          </div>

          {/* Title */}
          <div className="flex items-center space-x-2.5">
            <div className="bg-blue-900/80 p-1.5 rounded-lg text-white shrink-0 hidden md:block">
              <BookOpen className="w-4 h-4" />
            </div>
            <h1 className="text-xs sm:text-sm md:text-base font-black uppercase tracking-wide text-white leading-tight">
              HỆ THỐNG TRA CỨU QUY TRÌNH HỌC TẬP & VẬN HÀNH
            </h1>
          </div>
        </div>

        {/* Right Side: Total Procedures Count */}
        <div className="shrink-0 flex items-center gap-2">
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-900 text-blue-100 border border-blue-700 shadow-2xs">
            {totalProcedures} Quy trình
          </span>
        </div>
      </div>
    </header>
  );
};



