import { Domain, LinkOff, Link as LinkIcon } from "@mui/icons-material";
import { Box, Card, CardContent, Grid, Skeleton, Typography } from "@mui/material"
import { useState } from "react";

const loadingStats = [
    { label: 'Active URLs', icon: <LinkIcon fontSize="large" color="primary" />, color: 'primary' },
    { label: 'Active Domains', icon: <Domain fontSize="large" color="warning" />, color: 'warning' },
    { label: 'Domain URLs', icon: <LinkOff fontSize="large" color="secondary" />, color: 'secondary' },
].map(stat => ({ ...stat, value: <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> }));

export const UserDashboardStatsComponent = () => {
    const [isStatsLoading, setIsStatsLoading] = useState(false);
    const [stats, setStats] = useState(loadingStats);
    return (
        <>
            <Grid container spacing={2} mb={4}>
                {stats.map((stat, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
                        <Card sx={{ display: 'flex', alignItems: 'center', p: 2, boxShadow: 2 }}>
                            <Box sx={{ mr: 2 }}>{stat.icon}</Box>
                            <CardContent>
                                <Typography variant="subtitle2" color="textSecondary">{stat.label}</Typography>
                                <Typography variant="h6" color={stat.color}>
                                    {isStatsLoading ? <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> : stat.value}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}
