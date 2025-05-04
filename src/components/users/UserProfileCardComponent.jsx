import { AdminPanelSettings, Block, Edit } from "@mui/icons-material"
import { Avatar, Box, Button, Card, CardContent, Stack, Typography } from "@mui/material"

const sampleUser = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    role: "user",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?img=3"
};

export const UserProfileCardComponent = () => {
    return (
        <Card
            sx={{
                p: 2,
                mb: 4,
                boxShadow: 3,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: 'space-between',
                gap: 2
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ width: 72, height: 72, mr: 3 }} src={sampleUser.avatar}>
                    {sampleUser.name.charAt(0)}
                </Avatar>
                <CardContent sx={{ px: 0 }}>
                    <Typography variant="h6">{sampleUser.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{sampleUser.email}</Typography>
                    <Typography variant="body2" color="text.secondary">Phone: {sampleUser.phone}</Typography>
                    <Typography variant="body2" color="text.secondary">Role: {sampleUser.role}</Typography>
                    <Typography variant="body2" color={sampleUser.status === 'Active' ? 'green' : 'error'}>
                        Status: {sampleUser.status}
                    </Typography>
                </CardContent>
            </Box>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1}
                sx={{ width: { xs: '100%', sm: 'auto' }, mt: { xs: 2, sm: 0 } }}
            >
                <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
                <Button variant="outlined" size="small" color="warning" startIcon={<Block />}>Suspend</Button>
                <Button variant="outlined" size="small" color="secondary" startIcon={<AdminPanelSettings />}>Make Admin</Button>
            </Stack>
        </Card>
    );
}
