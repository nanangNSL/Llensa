'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'

export default function Chart() {
  const data = [
    { name: 'Mar 1', requests: 2400, pv: 2400 },
    { name: 'Mar 3', requests: 3210, pv: 1398 },
    { name: 'Mar 5', requests: 2290, pv: 9800 },
    { name: 'Mar 7', requests: 2000, pv: 3908 },
    { name: 'Mar 9', requests: 2181, pv: 4800 },
    { name: 'Mar 11', requests: 2500, pv: 3800 },
    { name: 'Mar 13', requests: 2100, pv: 4300 },
    { name: 'Mar 15', requests: 2200, pv: 2000 },
    { name: 'Mar 17', requests: 1600, pv: 9221 },
    { name: 'Mar 19', requests: 2100, pv: 9500 },
    { name: 'Mar 21', requests: 2400, pv: 3200 },
    { name: 'Mar 23', requests: 2800, pv: 2908 },
    { name: 'Mar 25', requests: 3500, pv: 1398 },
    { name: 'Mar 27', requests: 3200, pv: 3800 },
    { name: 'Mar 29', requests: 2900, pv: 3908 },
    { name: 'Mar 31', requests: 3100, pv: 4800 },
  ]

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 600 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 600 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #F1F5F9',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
              padding: '12px'
            }}
            itemStyle={{ fontSize: '12px', fontWeight: '700', color: '#1E293B' }}
            labelStyle={{ fontSize: '10px', fontWeight: '800', color: '#64748B', marginBottom: '4px', textTransform: 'uppercase' }}
          />
          <Area
            type="monotone"
            dataKey="requests"
            stroke="#4F46E5"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorRequests)"
            dot={{ r: 4, fill: '#4F46E5', strokeWidth: 2, stroke: '#FFFFFF' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
