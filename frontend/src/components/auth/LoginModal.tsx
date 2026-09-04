import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { Shield, ArrowRight, Truck, User, Info } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { login } = useLogistics();
  const [emailInput, setEmailInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    setErrorMsg('');
    login(emailInput);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-[#f8f9fa] text-neutral-900">
      {/* Container card */}
      <div className="w-full max-w-md bg-white border border-neutral-200 rounded-[8px] p-8 shadow-sm">
        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-neutral-900 text-white rounded-[6px] font-mono text-sm mb-3">
            Æ
          </div>
          <h1 className="text-lg font-normal tracking-tight text-neutral-900">
            AETHER Truth Engine
          </h1>
          <p className="text-xs font-light text-neutral-500 mt-1">
            Logistics Decision Intelligence & Incident Copilot
          </p>
        </div>

        {/* Role Routing Explanation Banner */}
        <div className="mb-6 p-3 bg-neutral-50 border border-neutral-200 rounded-[6px] text-xs font-light text-neutral-600 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-normal text-neutral-900">Role-Based Gateway:</span>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-neutral-500 text-[11px]">
              <li><span className="font-mono text-neutral-800">@company.com</span> → Operations Control Tower</li>
              <li>Standard email → Customer Copilot</li>
            </ul>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-light text-neutral-600 mb-1.5">
              Enter your email address
            </label>
            <input
              id="email"
              type="email"
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="e.g. director@company.com or dr.sunita@fortis.org"
              className="w-full px-3 py-2 text-xs font-light bg-white border border-neutral-300 rounded-[6px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors"
            />
            {errorMsg && (
              <p className="text-[11px] text-red-500 font-light mt-1">{errorMsg}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-neutral-900 hover:bg-black text-white text-xs font-light rounded-[6px] transition-colors shadow-sm"
          >
            <span>Authenticate & Enter System</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick Demo Pre-sets for Hackathon Evaluators */}
        <div className="mt-8 pt-6 border-t border-neutral-100">
          <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-3 text-center">
            One-Click Hackathon Demo Access
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            <button
              type="button"
              onClick={() => login('ops.director@company.com')}
              className="group flex items-center justify-between p-2.5 text-left border border-neutral-200 hover:border-neutral-400 rounded-[6px] bg-neutral-50/50 hover:bg-neutral-50 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-white border border-neutral-200 rounded-[4px] text-neutral-700">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-normal text-neutral-900">
                    Operations Control Tower
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500">
                    ops.director@company.com
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-light text-neutral-400 group-hover:text-neutral-900 transition-colors">
                Launch →
              </span>
            </button>

            <button
              type="button"
              onClick={() => login('dr.sunita@fortis.org')}
              className="group flex items-center justify-between p-2.5 text-left border border-neutral-200 hover:border-neutral-400 rounded-[6px] bg-neutral-50/50 hover:bg-neutral-50 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-white border border-neutral-200 rounded-[4px] text-neutral-700">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-normal text-neutral-900">
                    Customer Copilot (Tracking)
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500">
                    dr.sunita@fortis.org (Parcel #87)
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-light text-neutral-400 group-hover:text-neutral-900 transition-colors">
                Launch →
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Subtle footnote */}
      <div className="mt-6 text-[11px] font-light text-neutral-400">
        World Model • Universal Logistics Event Ontology • Continuous Closed-Loop Feedback
      </div>
    </div>
  );
};
