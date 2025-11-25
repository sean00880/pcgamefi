'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { TOKENOMICS } from '@/lib/constants';

const data = [
  { name: 'Buy Tax', value: 4, color: '#7FF252' },
  { name: 'Sell Tax', value: 4, color: '#1A1C1E' },
  { name: 'Transfer Tax', value: 0, color: '#CCCCCC' },
  { name: 'Liquidity/Holder', value: 92, color: '#FFFFFF' },
];

export const Tokenomics: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 display-font">PC GAMEFI TOKENOMICS</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">{TOKENOMICS.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 bg-[#F0FDF4] p-8 rounded-2xl border border-green-100 shadow-sm text-center">
              <h3 className="text-lg text-gray-500 font-medium uppercase tracking-wider mb-2">Total Supply</h3>
              <p className="text-4xl md:text-5xl font-bold text-black display-font tracking-tight">{TOKENOMICS.supply}</p>
            </div>

            <div className="bg-[#1A1C1E] p-6 rounded-2xl text-white flex flex-col items-center justify-center aspect-square shadow-[8px_8px_0px_0px_rgba(127,242,82,1)]">
              <span className="text-4xl font-bold text-[#7FF252] display-font">{TOKENOMICS.buyTax}</span>
              <span className="text-sm font-medium uppercase mt-2 tracking-widest text-gray-400">Buy Tax</span>
            </div>

            <div className="bg-white border-2 border-black p-6 rounded-2xl text-black flex flex-col items-center justify-center aspect-square shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-4xl font-bold display-font">{TOKENOMICS.sellTax}</span>
              <span className="text-sm font-medium uppercase mt-2 tracking-widest text-gray-600">Sell Tax</span>
            </div>
          </div>

          {/* Visual Representation */}
          <div className="bg-gray-50 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="inline-block bg-[#7FF252] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">0% Transfer Tax</span>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.name === 'Liquidity/Holder' ? '#E5E7EB' : 'none'} strokeWidth={1}/>
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
              <p className="font-semibold text-gray-900">Tax Distribution</p>
              <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#7FF252]"></div> Marketing</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-black"></div> Dev</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
