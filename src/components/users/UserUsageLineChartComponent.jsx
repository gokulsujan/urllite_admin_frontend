import { Tooltip } from "@mui/material"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const usageData = [
    { month: "Jan", usage: 30 },
    { month: "Feb", usage: 45 },
    { month: "Mar", usage: 28 },
    { month: "Apr", usage: 60 },
    { month: "May", usage: 50 }
];

export const UserUsageLineChartComponent = () => {
    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="usage" stroke="#1976d2" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}
