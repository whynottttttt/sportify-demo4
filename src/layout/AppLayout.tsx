import { Box, styled, Typography } from '@mui/material'
import React from 'react'
import { NavLink, Outlet } from 'react-router'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryHead from './components/LibraryHead';
import Library from './components/Library';
import Navbar from './components/Navbar';

const Layout = styled("div")(({ theme }) => ({
    display: "flex",
    height: "100vh",
    padding: "8px",
    maxWidth: "100vw",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
        padding: "4px",
    },
}))

const Sidebar = styled("div")(({ theme }) => ({
    width: "331px",
    height: "100%", // 100vh
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
        display: "none",
    },
}));

const ContentBox = styled(Box)(({ theme }) => ({
    borderRadius: "8px",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width: "100%",
    padding: "8px",
    marginBottom: "8px",
    marginRight: "8px",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
        padding: "4px",
        marginRight: "0px",
    },
}))

const NavList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
})


const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    color: theme.palette.text.secondary,
    "&:hover": {
        color: theme.palette.text.primary,
    },
    "&:activate": {
        color: theme.palette.text.primary,
    }
}));

const AppLayout = () => {
    return (
        <Layout>
            <Sidebar>
                <ContentBox>
                    <NavList>
                        <StyledNavLink to="/">
                            <HomeIcon />
                            <Typography variant="h2" fontWeight={700}>Home</Typography>
                        </StyledNavLink>
                        <StyledNavLink to="/search">
                            <SearchIcon />
                            <Typography variant="h2" fontWeight={700}>search</Typography>
                        </StyledNavLink>
                    </NavList>
                </ContentBox>
                <ContentBox height="100%">
                    <LibraryHead />
                    <Library />
                </ContentBox>
            </Sidebar>
            <ContentBox>
                <Navbar />
                <Outlet />
            </ContentBox>
        </Layout>
    )
}

export default AppLayout