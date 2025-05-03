import React, { useEffect, useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
    Tooltip,
    TablePagination,
    Chip
} from '@mui/material';
import {
    Link as LinkIcon,
    People,
    Person,
    Block,
    Domain,
    LinkOff,
    Edit,
    Assessment,
    WhatsApp,
    Call,
    MailOutline,
    ContentCopy
} from '@mui/icons-material';
import api from '../utils/axios';
import { useSnackbar } from '../commons/SnackbarComponent';

const loadingStats = [
    { label: 'Active URLs', icon: <LinkIcon fontSize="large" color="primary" />, color: 'primary' },
    { label: 'Active Users', icon: <People fontSize="large" color="success" />, color: 'success' },
    { label: 'Total Users', icon: <Person fontSize="large" color="info" />, color: 'info' },
    { label: 'Suspended Users', icon: <Block fontSize="large" color="error" />, color: 'error' },
    { label: 'Active Domains', icon: <Domain fontSize="large" color="warning" />, color: 'warning' },
    { label: 'Domain URLs', icon: <LinkOff fontSize="large" color="secondary" />, color: 'secondary' },
].map(stat => ({ ...stat, value: <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> }));

export const DashboardComponent = () => {
    const showSnackbar = useSnackbar();
    const [stats, setStats] = useState(loadingStats);
    const [isLoadingStats, setIsLoadingStats] = useState(true);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const response = await api.get('/api/v1/admin/dashboard', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
                });

                if (response.status === 200) {
                    const d = response.data.result.dashboard;
                    setStats([
                        { label: 'Active URLs', value: d.TotalActiveUrls, icon: <LinkIcon fontSize="large" color="primary" />, color: 'primary' },
                        { label: 'Active Users', value: d.TotalActiveUsers, icon: <People fontSize="large" color="success" />, color: 'success' },
                        { label: 'Total Users', value: d.TotalUsers, icon: <Person fontSize="large" color="info" />, color: 'info' },
                        { label: 'Suspended Users', value: d.TotalSuspendedUsers, icon: <Block fontSize="large" color="error" />, color: 'error' },
                        { label: 'Active Domains', value: d.TotalActiveCustomDomains, icon: <Domain fontSize="large" color="warning" />, color: 'warning' },
                        { label: 'Domain URLs', value: d.TotalActiveCustomDomainUrls, icon: <LinkOff fontSize="large" color="secondary" />, color: 'secondary' },
                    ]);
                    setIsLoadingStats(false);
                }
            } catch (error) {
                showSnackbar('Error fetching dashboard stats', 'error', 'bottom', 'right');
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await api.get('/api/v1/user/', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
                });

                if (response.status === 200) {
                    const fetchedUsers = response.data.result.users || [];
                    setUsers(fetchedUsers);
                    setFilteredUsers(fetchedUsers);
                    setIsLoadingUsers(false);
                }
            } catch (error) {
                showSnackbar('Error fetching user data', 'error', 'bottom', 'right');
            }
        };

        fetchDashboardStats();
        fetchUsers();
    }, []);

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(searchText) || user.email.toLowerCase().includes(searchText)
        );
        setFilteredUsers(filtered);
    };

    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    // Function to copy text to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            showSnackbar('Copied to clipboard', 'success', 'bottom', 'right');
        }).catch(() => {
            showSnackbar('Failed to copy', 'error', 'bottom', 'right');
        });
    };

    return (
        <>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Grid container spacing={2}>
                    {stats.map((stat, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
                            <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                                <Box sx={{ mr: 2 }}>{stat.icon}</Box>
                                <CardContent>
                                    <Typography variant="subtitle2" color="textSecondary">{stat.label}</Typography>
                                    <Typography variant="h6" color={stat.color}>
                                        {isLoadingStats ? <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> : stat.value}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h5" gutterBottom>User Management</Typography>
                <Paper sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <input
                            type="text"
                            placeholder="Search by name or email"
                            onChange={handleSearch}
                            style={{
                                padding: '8px 12px',
                                fontSize: '1rem',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                                width: '300px',
                            }}
                        />
                    </Box>
                    <TableContainer sx={{ maxHeight: 500 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#c20e3e' }}>
                                    {['Sl No', 'Name', 'Email', 'Verified Email', 'Mobile', 'Status', 'Role', 'Actions'].map((col) => (
                                        <TableCell key={col} sx={{ backgroundColor: '#c20e3e', color: 'white' }}>
                                            {col}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {isLoadingUsers ? (
                                    Array.from(new Array(5)).map((_, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            {Array(8).fill(0).map((_, colIndex) => (
                                                <TableCell key={colIndex}><Skeleton /></TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                                        <TableRow key={user.id} hover sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Tooltip title={user.email}>
                                                        <IconButton
                                                            color="primary"
                                                            onClick={() => window.location.href = `mailto:${user.email}`}
                                                        >
                                                            <MailOutline fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Copy Email">
                                                        <IconButton
                                                            color="default"
                                                            onClick={() => copyToClipboard(user.email)}
                                                        >
                                                            <ContentCopy fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </TableCell>

                                            <TableCell>{user.verified_email ? 'Yes' : 'No'}</TableCell>
                                            <TableCell>
                                                {user.mobile ? (
                                                    <>
                                                        <Tooltip title={`Send WhatsApp to ${user.mobile}`}>
                                                            <IconButton
                                                                color="primary"
                                                                onClick={() => window.open(`https://wa.me/${user.mobile}`, '_blank')}
                                                            >
                                                                <WhatsApp fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title={`Call ${user.mobile}`}>
                                                            <IconButton
                                                                color="primary"
                                                                onClick={() => window.open(`tel:${user.mobile}`, '_blank')}
                                                            >
                                                                <Call fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Copy to Clipboard">
                                                            <IconButton
                                                                color="default"
                                                                onClick={() => copyToClipboard(user.mobile)}
                                                            >
                                                                <ContentCopy fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </>
                                                ) : (
                                                    'N/A'
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {user.status === 'active' ? (
                                                    <Chip label="Active" color="success" size="small" />
                                                ) : (
                                                    <Chip label="Suspended" color="error" size="small" />
                                                )}
                                            </TableCell>
                                            <TableCell>{user.role}</TableCell>
                                            <TableCell>
                                                <Tooltip title="View User Stat"><IconButton color="success"><Assessment /></IconButton></Tooltip>
                                                <Tooltip title="Edit User"><IconButton color="info"><Edit /></IconButton></Tooltip>
                                                <Tooltip title="Suspend User"><IconButton color="error"><Block /></IconButton></Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={filteredUsers.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                </Paper>
            </Box>
        </>
    );
};
