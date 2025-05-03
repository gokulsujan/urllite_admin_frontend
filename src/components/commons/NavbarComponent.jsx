import { AccountCircle, AdminPanelSettings, Logout, Person } from "@mui/icons-material"
import { AppBar, Box, Divider, IconButton, Link, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { useState } from "react"
import { useAuth } from "../auth/AuthContextProviderComponent"

const NavbarComponent = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const { isLoggedIn, login, logout } = useAuth();

    const handleMenu = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleProfile = () => {
        handleClose()
        // TODO -> Navigate to profile page
    }

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        handleClose();
        // Todo -> Navigate to signin
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{ backgroundColor: '#c20e3e' }}>
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Typography variant="h6" component={Link}
                            sx={{
                                fkexGrow: 1,
                                textDecoration: 'none',
                                color: "inherit",
                                fontWeight: "bold",
                                cursor: "pointer"
                            }}
                        >
                            <Box display="flex" alignItems="center">URLlite&nbsp;<AdminPanelSettings /></Box>
                        </Typography>
                        {isLoggedIn && (<div>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                sx={{ mt: 1.5 }}
                            >
                                <MenuItem onClick={handleProfile}>
                                    <ListItemIcon>
                                        <Person fontSize="small" />
                                    </ListItemIcon>
                                    Profile
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>)}

                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}
export default NavbarComponent
