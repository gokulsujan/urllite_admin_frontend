import { Domain, LinkOff, Link as LinkIcon } from "@mui/icons-material";
import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../utils/axios";

const loadingStats = [
    { label: 'Active URLs', icon: <LinkIcon fontSize="large" color="primary" />, color: 'primary' },
    { label: 'Active Domains', icon: <Domain fontSize="large" color="warning" />, color: 'warning' },
    { label: 'Domain URLs', icon: <LinkOff fontSize="large" color="secondary" />, color: 'secondary' },
].map(stat => ({ ...stat, value: <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> }));

export const UserDashboardStatsComponent = ({ userID }) => {
    const [isStatsLoading, setIsStatsLoading] = useState(false);
    const [stats, setStats] = useState(loadingStats);

    useEffect(() => {
        const fetchUserStats = async () => {
            let response = await api.get("/api/v1/admin/user/" + userID + "/stats", {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
            })

            if (response.status == 200) {
                let newStats = [
                    { label: 'Active URLs', value: response.data.result.user_stats.TotalActiveUrls, icon: <LinkIcon fontSize="large" color="primary" />, color: 'primary' },
                    { label: 'Active Domains', value: response.data.result.user_stats.TotalActiveCustomDomains, icon: <Domain fontSize="large" color="warning" />, color: 'warning' },
                    { label: 'Domain URLs', value: response.data.result.user_stats.TotalActiveCustomDomainUrls, icon: <LinkOff fontSize="large" color="secondary" />, color: 'secondary' },
                ]
                setStats(newStats)
                setIsStatsLoading(false)
            }
        }

        fetchUserStats()

    }, [userID])

    return (
        <Box sx={{
            display: 'flex',
            gap: 2,
            mb: 4,
            flexWrap: 'wrap'
        }}>
            {stats.map((stat, index) => (
                <Box
                    key={index}
                    sx={{
                        flex: {
                            xs: '1 1 100%',
                            sm: '1 1 50%',
                            md: '1 1 25%',
                        },

                        minWidth: 200,
                    }}
                >
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 2, boxShadow: 2 }}>
                        <Box sx={{ mr: 2 }}>{stat.icon}</Box>
                        <CardContent sx={{ p: 0 }}>
                            <Typography variant="subtitle2" color="text.secondary">{stat.label}</Typography>
                            <Typography variant="h6" color={stat.color}>
                                {isStatsLoading ? (
                                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '60%' }} />
                                ) : (
                                    stat.value
                                )}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            ))}
        </Box>
    );
};
