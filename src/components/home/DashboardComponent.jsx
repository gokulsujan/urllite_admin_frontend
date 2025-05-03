import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
import {
    Link as LinkIcon,
    People,
    Person,
    Block,
    Domain,
    LinkOff,
} from '@mui/icons-material';
import api from '../utils/axios';
import { useSnackbar } from '../commons/SnackbarComponent';
const lodingStats = [
    {
        label: 'Active URLs',
        value: <Skeleton variant="text" sx={{ fontSize: '1rem' }} />,
        icon: <LinkIcon fontSize="large" color="primary" />,
        color: 'primary',
    },
    {
        label: 'Active Users',
        value: <Skeleton variant="text" sx={{ fontSize: '1rem' }} />,
        icon: <People fontSize="large" color="success" />,
        color: 'success',
    },
    {
        label: 'Total Users',
        value: <Skeleton variant="text" sx={{ fontSize: '1rem' }} />,
        icon: <Person fontSize="large" color="info" />,
        color: 'info',
    },
    {
        label: 'Suspended Users',
        value: <Skeleton variant="text" sx={{ fontSize: '1rem' }} />,
        icon: <Block fontSize="large" color="error" />,
        color: 'error',
    },
    {
        label: 'Active Domains',
        value: <Skeleton variant="text" sx={{ fontSize: '1rem' }} />,
        icon: <Domain fontSize="large" color="warning" />,
        color: 'warning',
    },
    {
        label: 'Domain URLs',
        value: <Skeleton variant="text" sx={{ fontSize: '1rem' }} />,
        icon: <LinkOff fontSize="large" color="secondary" />,
        color: 'secondary',
    },
]

export const DashboardComponent = () => {
    const showSnackbar = useSnackbar()
    const [stats, setStats] = useState(lodingStats)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const response = await api.get("/api/v1/admin/dashboard", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                })

                if (response.status == 200) {
                    setStats([
                        {
                            label: 'Active URLs',
                            value: response.data.result.dashboard.TotalActiveUrls,
                            icon: <LinkIcon fontSize="large" color="primary" />,
                            color: 'primary',
                        },
                        {
                            label: 'Active Users',
                            value: response.data.result.dashboard.TotalActiveUsers,
                            icon: <People fontSize="large" color="success" />,
                            color: 'success',
                        },
                        {
                            label: 'Total Users',
                            value: response.data.result.dashboard.TotalUsers,
                            icon: <Person fontSize="large" color="info" />,
                            color: 'info',
                        },
                        {
                            label: 'Suspended Users',
                            value: response.data.result.dashboard.TotalSuspendedUsers,
                            icon: <Block fontSize="large" color="error" />,
                            color: 'error',
                        },
                        {
                            label: 'Active Domains',
                            value: response.data.result.dashboard.TotalActiveCustomDomains,
                            icon: <Domain fontSize="large" color="warning" />,
                            color: 'warning',
                        },
                        {
                            label: 'Domain URLs',
                            value: response.data.result.dashboard.TotalActiveCustomDomainUrls,
                            icon: <LinkOff fontSize="large" color="secondary" />,
                            color: 'secondary',
                        },
                    ])

                    setIsLoading(false)

                } else {
                    showSnackbar(response.data.message, "warning", "bottom", "right")
                }
            } catch (error) {
                if (error.response.data.message) {
                    showSnackbar("Login failed: " + error.response.data.message, "error", "bottom", "right")
                } else {
                    showSnackbar("⚠️ Network error: " + error, "error", "bottom", "right")
                }
            }
        }
        fetchDashboardStats()
    }, [])
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={0} justifyContent="space-between">
                {stats.map((stat, index) => (
                    <Grid
                        item
                        key={index}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={2}
                    >
                        <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                            <Box sx={{ mr: 2 }}>{stat.icon}</Box>
                            <CardContent>
                                <Typography variant="subtitle2" color="textSecondary">
                                    {stat.label}
                                </Typography>
                                <Typography variant="h6" color={stat.color}>
                                    {stat.value}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
