import React, { useState } from "react";
import {
    Box,
    Tabs,
    Tab,
    Paper,
} from "@mui/material";
import {
    InsertChart,
    Link as LinkIcon
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { UserProfileCardComponent } from "./UserProfileCardComponent";
import { UserDashboardStatsComponent } from "./UserDashboardStatsComponent";
import { UserUsageLineChartComponent } from "./UserUsageLineChartComponent";
import { UserUrlsComponent } from "./UserUrlsComponent";

export const UserDashboardComponent = () => {
    const { id } = useParams();
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (_, newValue) => setTabIndex(newValue);

    return (
        <Box sx={{ p: 3 }}>
            <UserProfileCardComponent userID={id} />
            <UserDashboardStatsComponent userID={id} />
            <Paper elevation={3} sx={{ p: 2 }}>
                <Tabs value={tabIndex} onChange={handleTabChange} centered>
                    <Tab icon={<InsertChart />} label="Usage Analytics" />
                    <Tab icon={<LinkIcon />} label="Short URLs" />
                </Tabs>
                <Box sx={{ mt: 3 }}>
                    {tabIndex === 0 && (
                        <UserUsageLineChartComponent userID={id} />
                    )}
                    {tabIndex === 1 && (
                        <UserUrlsComponent userID={id} />
                    )}
                </Box>
            </Paper>
        </Box>
    );
};
