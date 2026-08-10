import React from 'react';
import { BookOpen } from 'lucide-react';

interface HeaderProps {
  totalProcedures: number;
}

export const Header: React.FC<HeaderProps> = ({ totalProcedures }) => {
  return (
    <header className="bg-black text-white py-3.5 px-4 sm:px-6 lg:px-8 border-b border-gray-800 shadow-md">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-900/80 p-2 rounded-lg text-white shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-sm sm:text-base md:text-lg font-black uppercase tracking-wide text-white leading-tight">
              HỆ THỐNG TRA CỨU QUY TRÌNH HỌC TẬP & VẬN HÀNH
            </h1>
            <span className="hidden sm:inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-900 text-blue-100 border border-blue-700">
              {totalProcedures} Quy trình
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};


