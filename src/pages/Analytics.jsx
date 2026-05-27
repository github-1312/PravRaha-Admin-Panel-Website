import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Database, Download, Calendar } from 'lucide-react';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30d');

  const userGrowthData = [
    { month: 'Jan', users: 1200, active: 980 },
    { month: 'Feb', users: 1450, active: 1180 },
    { month: 'Mar', users: 1680, active: 1350 },
    { month: 'Apr', users: 1920, active: 1580 },
    { month: 'May', users: 2150, active: 1780 },
    { month: 'Jun', users: 2400, active: 2020 },
  ];

  const dataUploadStats = [
    { month: 'Jan', uploads: 450, records: 125000 },
    { month: 'Feb', uploads: 520, records: 142000 },
    { month: 'Mar', uploads: 680, records: 189000 },
    { month: 'Apr', uploads: 750, records: 205000 },
    { month: 'May', uploads: 820, records: 228000 },
    { month: 'Jun', uploads: 950, records: 267000 },
  ];

  const planDistribution = [
    { name: 'Starter', value: 45, color: '#8b5cf6' },
    { name: 'Professional', value: 35, color: '#3b82f6' },
    { name: 'Enterprise', value: 20, color: '#10b981' },
  ];

  const industryData = [
    { industry: 'Technology', users: 850 },
    { industry: 'Healthcare', users: 620 },
    { industry: 'Finance', users: 480 },
    { industry: 'Manufacturing', users: 350 },
    { industry: 'Retail', users: 280 },
    { industry: 'Education', users: 220 },
  ];

  const stats = [
    { 
      label: 'Total Revenue', 
      value: '$124,500', 
      change: '+12.5%', 
      icon: TrendingUp, 
      color: 'text-green-600',
      trend: 'up'
    },
    { 
      label: 'Active Users', 
      value: '2,847', 
      change: '+8.2%', 
      icon: Users, 
      color: 'text-blue-600',
      trend: 'up'
    },
    { 
      label: 'Data Records', 
      value: '1.2M', 
      change: '+15.3%', 
      icon: Database, 
      color: 'text-purple-600',
      trend: 'up'
    },
    { 
      label: 'Conversion Rate', 
      value: '3.2%', 
      change: '-2.1%', 
      icon: TrendingUp, 
      color: 'text-orange-600',
      trend: 'down'
    },
  ];

  const topUsers = [
    { name: 'TechCorp Inc.', uploads: 45, records: 12500, revenue: '$2,400' },
    { name: 'Global Solutions', uploads: 38, records: 9800, revenue: '$1,950' },
    { name: 'Innovation Labs', uploads: 32, records: 8200, revenue: '$1,680' },
    { name: 'Future Systems', uploads: 28, records: 7100, revenue: '$1,420' },
    { name: 'Digital Dynamics', uploads: 25, records: 6500, revenue: '$1,250' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Track performance and user engagement</p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="select"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          <button className="btn-outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last period
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} name="Total Users" />
              <Line type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2} name="Active Users" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Data Uploads */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Upload Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataUploadStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="uploads" fill="#8b5cf6" name="Uploads" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Plan Distribution */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Plan Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={planDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {planDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Industry Breakdown */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Users by Industry</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={industryData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="industry" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="users" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Users Table */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Users</h3>
          <button className="btn-outline text-sm">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Company</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Uploads</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Records</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topUsers.map((user, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{user.uploads}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{user.records.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{user.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;