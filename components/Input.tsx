
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  suffix?: string;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  icon, 
  suffix, 
  containerClassName = "", 
  className = "", 
  required,
  ...props 
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative group flex items-center">
        {icon && (
          <div className="absolute left-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
            {icon}
          </div>
        )}
        <input
          className={`w-full bg-white border border-slate-200/80 rounded-2xl py-3.5 text-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 shadow-sm shadow-slate-200/50 placeholder:text-slate-400 ${icon ? 'pl-11' : 'px-4'} ${suffix ? 'pr-12' : 'pr-4'} ${className}`}
          {...props}
        />
        {suffix && (
          <span className="absolute right-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  icon?: React.ReactNode;
  options: { label: string; value: string }[];
  containerClassName?: string;
}

export const Select: React.FC<SelectProps> = ({ 
  label, 
  icon, 
  options, 
  containerClassName = "", 
  className = "", 
  required,
  ...props 
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative group flex items-center">
        {icon && (
          <div className="absolute left-4 text-slate-400 group-focus-within:text-indigo-500 pointer-events-none transition-colors">
            {icon}
          </div>
        )}
        <select
          className={`w-full appearance-none bg-white border border-slate-200/80 rounded-2xl py-3.5 text-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 shadow-sm shadow-slate-200/50 ${icon ? 'pl-11' : 'px-4'} pr-10 ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 pointer-events-none text-slate-400">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};
