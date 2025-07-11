
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MoreVertical, TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard = () => {
  const riskData = [
    { name: 'Jan', threats: 300 },
    { name: 'Feb', threats: 280 },
    { name: 'Mar', threats: 350 },
    { name: 'Apr', threats: 400 },
    { name: 'May', threats: 450 },
    { name: 'Jun', threats: 420 },
    { name: 'Jul', threats: 380 },
    { name: 'Aug', threats: 450 },
    { name: 'Sep', threats: 400 },
    { name: 'Oct', threats: 350 },
    { name: 'Nov', threats: 300 },
    { name: 'Dec', threats: 200 },
  ];

  const virusData = [
    { name: 'ILOVEYOU', value: 25, color: '#8b5cf6' },
    { name: 'Melissa', value: 20, color: '#ec4899' },
    { name: 'MyDoom', value: 30, color: '#06b6d4' },
    { name: 'Sasser', value: 25, color: '#10b981' },
  ];

  const threatDetails = [
    { date: '12.05.2024', deviceId: 'crazyfish228', virus: 'Code Red', path: 'C:\\Users\\speed...', type: 'Jpeg' },
    { date: '11.05.2024', deviceId: 'angryswan732', virus: 'Stuxnet', path: '\\\\192.168.10.5\\...', type: 'Zip' },
  ];

  const riskMetrics = [
    { 
      title: 'Total Threats', 
      value: '132%', 
      icon: '🛡️', 
      color: 'bg-pink-500',
      trend: 'up'
    },
    { 
      title: 'Video File Risk', 
      value: '16%', 
      icon: '🎥', 
      color: 'bg-purple-500',
      trend: 'down'
    },
    { 
      title: 'Image File Risk', 
      value: '43%', 
      icon: '🖼️', 
      color: 'bg-pink-500',
      trend: 'up'
    },
    { 
      title: 'Docs File Risk', 
      value: '7%', 
      icon: '📄', 
      color: 'bg-blue-500',
      trend: 'down'
    },
    { 
      title: 'Folder File Risk', 
      value: '66%', 
      icon: '📁', 
      color: 'bg-cyan-500',
      trend: 'up'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <select className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 text-sm">
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
      </div>

      {/* Risk Metrics */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Current Risk</h2>
          <select className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 text-sm">
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {riskMetrics.map((metric, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 card-hover">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center text-2xl`}>
                  {metric.icon}
                </div>
                <button className="text-gray-400 hover:text-white">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-gray-400 text-sm">{metric.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Score */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Risk Score</h3>
            <button className="text-gray-400 hover:text-white">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#374151"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2.83 * 74.1} ${2.83 * (100 - 74.1)}`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-white">741</div>
                <div className="text-sm text-orange-400 bg-orange-400/20 px-2 py-1 rounded">High</div>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-4">
            <span>0</span>
            <span>1000</span>
          </div>
        </div>

        {/* Threat Summary Chart */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Threat Summary</h3>
            <select className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 text-sm">
              <option>Yearly</option>
              <option>Monthly</option>
              <option>Weekly</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Area
                  type="monotone"
                  dataKey="threats"
                  stroke="#8b5cf6"
                  fill="url(#colorThreats)"
                />
                <defs>
                  <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Threats by Virus */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Threats By Virus</h3>
            <button className="text-gray-400 hover:text-white">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={virusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {virusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-xl font-bold text-white">65%</div>
                <div className="text-xs text-gray-400">Total</div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {virusData.map((virus, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: virus.color }}
                  ></div>
                  <span className="text-sm text-gray-300">{virus.name}</span>
                </div>
                <span className="text-sm text-gray-400">{virus.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Threat Details Table */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Threat by device</h3>
          <div className="flex items-center space-x-2">
            <select className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 text-sm">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
            <button className="text-gray-400 hover:text-white">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {threatDetails.map((threat, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-gray-300 text-sm">💻</span>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Device ID</div>
                  <div className="text-white font-medium">{threat.deviceId}</div>
                </div>
              </div>
              <div className="flex items-center space-x-8 text-sm">
                <div>
                  <div className="text-gray-400">Date</div>
                  <div className="text-white">{threat.date}</div>
                </div>
                <div>
                  <div className="text-gray-400">Virus name</div>
                  <div className="text-white">{threat.virus}</div>
                </div>
                <div>
                  <div className="text-gray-400">File Path</div>
                  <div className="text-white">{threat.path}</div>
                </div>
                <div>
                  <div className="text-gray-400">File Type</div>
                  <div className="text-white">{threat.type}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
