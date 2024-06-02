"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SideBar from "../SideBar/SideBar";
import { Avatar, Badge, Stack } from "@mui/material";
import AccountMenu from "../AccountMenu/AccountMenu";
import avatar from "@/assets/images/avatar.png";
import { useGetMYProfileQuery } from "@/redux/api/myProfile";

const drawerWidth = 240;

export default function DashboardDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const { data, isLoading } = useGetMYProfileQuery({});
  // console.log(data);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "#F4F7FE",
          boxShadow: 0,
          borderBottom: "1px solid #ddd",
          py: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon sx={{ color: "primary.main" }} />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box>
              <Typography
                variant="body2"
                noWrap
                component="div"
                sx={{ color: "rgba(11, 17, 52, 0.6)" }}
              >
                Hi, {isLoading ? "Loading..." : data?.name},
              </Typography>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  color: "primary.main",
                  fontSize: {
                    sm: "16px",
                    md: "16px",
                    lg: "24px",
                    xl: "32px",
                  },
                  maxWidth: {
                    sm: "205px",
                    md: "205px",
                    lg: "100%",
                  },
                  textWrap: "wrap",
                }}
              >
                Welcome to Blood Donation App
              </Typography>
            </Box>
            <Stack direction="row" gap={3}>
              <Avatar
                alt={data?.name}
                src={data?.profilePicture ? data?.profilePicture : avatar}
              />
              <AccountMenu />
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <SideBar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <SideBar />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box>{children}</Box>
      </Box>
    </Box>
  );
}
