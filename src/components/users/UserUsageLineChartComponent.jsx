import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";
import api from "../utils/axios";

// ✅ Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        padding: '8px',
        borderRadius: '4px',
        fontSize: '14px',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
      }}>
        <strong>{label}</strong>
        <div>Usage: {payload[0].value}</div>
      </div>
    );
  }

  return null;
};

export const UserUsageLineChartComponent = ({ userID }) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchUserUsageStats = async () => {
      const today = new Date();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(today.getMonth() - 6);

      const formatDate = (date) => date.toISOString().split("T")[0];
      const startDate = formatDate(sixMonthsAgo);
      const endDate = formatDate(today);

      const response = await api.get(
        `/api/v1/admin/user/${userID}/usage?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status === 200) {
        const rawUsage = response.data.result.user_stats;
        const usageData = [];
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        for (let d = new Date(sixMonthsAgo); d <= today; d.setMonth(d.getMonth() + 1)) {
          const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
          usageData.push({
            month: monthNames[d.getMonth()],
            usage: rawUsage[key] || 0,
          });
        }

        setStats(usageData);
      }
    };

    fetchUserUsageStats();
  }, [userID]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={stats}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <RechartsTooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="usage" stroke="#1976d2" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};
