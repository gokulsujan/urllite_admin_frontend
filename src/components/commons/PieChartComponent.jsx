import * as React from 'react';
import {
    PieChart,
    pieArcLabelClasses
} from '@mui/x-charts/PieChart';
import { Box, Typography } from '@mui/material';

const generateColors = (count) => {
    const colors = [];
    const saturation = 70;
    const lightness = 50;
    for (let i = 0; i < count; i++) {
        const hue = Math.floor((360 / count) * i);
        colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }
    return colors;
};

const PieChartComponent = ({
    data,
    labelKey = "label",
    valueKey = "value",
    title = "Pie Chart",
    dataFormatter
}) => {
    if (!data || data.length === 0) {
        return <div className="text-center text-gray-500 p-4">No data available</div>;
    }

    const total = data.reduce((sum, item) => sum + item[valueKey], 0);
    const colors = generateColors(data.length);

    const chartData = data.map((entry, index) => ({
        id: index,
        label: entry[labelKey],
        value: entry[valueKey],
        color: colors[index],
    }));

    return (
        <Box
            sx={{
                flex: '1 1 300px',
                maxWidth: 400,
                minWidth: 280,
                height: 'auto',
                mt: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Added shadow
            }}
        >
            <Typography variant="h6" align="center" gutterBottom>
                {title}
            </Typography>
            <PieChart
                series={[
                    {
                        data: chartData,
                        arcLabel: (item) => item.label,
                        arcLabelRadius: 120,
                        innerRadius: 0,
                        outerRadius: 100,
                    },
                ]}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                        fontWeight: 'bold',
                        fontSize: 12,
                        whiteSpace: 'pre-line',
                    },
                    '& .MuiChartsLegend-root': {
                        display: 'none',
                    },
                }}
                width={250}
                height={250}
            />

        </Box>
    );

};

export default PieChartComponent;
