// "use client";

// import useUserInfo from "@/hooks/useUserInfo";
// import { logoutUser } from "@/services/actions/logoutUser";
// import { Box, Button, Container, Stack, Typography } from "@mui/material";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import bloodLogo from "@/assets/images/blood-logo.png";
// import BloodtypeIcon from "@mui/icons-material/Bloodtype";

// const Navbar = () => {
//   const userInfo = useUserInfo();
//   // console.log("User info from navbar = ", userInfo);
//   const router = useRouter();

//   const handleLogOut = () => {
//     logoutUser(router);
//   };

//   return (
//     <Box
//       sx={{
//         bgcolor: "primary.main",
//       }}
//     >
//       <Container>
//         <Stack
//           py={2}
//           direction="row"
//           justifyContent="space-between"
//           alignItems="center"
//         >
//           <Stack direction="row" alignItems="center" gap={1}>
//             <Box
//               sx={{
//                 borderRadius: "50%",
//                 overflow: "hidden",
//                 width: 80,
//                 height: 80,
//               }}
//             >
//               <Link href="/">
//                 <Image
//                   src={bloodLogo}
//                   alt="Logo"
//                   width={80}
//                   height={80}
//                   style={{ objectFit: "cover" }}
//                 />
//               </Link>
//             </Box>
//             <Typography variant="h4" component={Link} href="/" fontWeight={600}>
//               Bl
//               <Box component="span" color="red">
//                 <BloodtypeIcon fontSize="large" sx={{ color: "red" }} />
//                 <BloodtypeIcon fontSize="large" sx={{ color: "red" }} />
//               </Box>
//               d Dona
//               <Box component="span" color="tomato">
//                 tion
//               </Box>{" "}
//               App
//             </Typography>
//           </Stack>

//           <Stack direction="row" justifyContent="space-between" gap={4}>
//             <Typography component={Link} href="/" color="#ffffff">
//               Home
//             </Typography>

//             <Typography component={Link} href="/donors" color="#ffffff">
//               Donors
//             </Typography>

//             <Typography component={Link} href="/about" color="#ffffff">
//               About Us
//             </Typography>

//             {userInfo?.userId ? (
//               <Typography component={Link} href="/dashboard" color="#ffffff">
//                 Dashboard
//               </Typography>
//             ) : null}
//           </Stack>

//           {userInfo?.userId ? (
//             <Stack sx={{ flexDirection: "row", gap: 2 }}>
//               <Button component={Link} href="/dashboard/profile">
//                 My Profile
//               </Button>
//               <Button
//                 color="error"
//                 onClick={handleLogOut}
//                 sx={{ boxShadow: 0 }}
//               >
//                 Logout
//               </Button>
//             </Stack>
//           ) : (
//             <Button component={Link} href="/login">
//               Login
//             </Button>
//           )}
//         </Stack>
//       </Container>
//     </Box>
//   );
// };

// export default Navbar;

///////////////////////////////////////////////////////

"use client";

import useUserInfo from "@/hooks/useUserInfo";
import { logoutUser } from "@/services/actions/logoutUser";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import bloodLogo from "@/assets/images/blood-logo.png";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import { useState } from "react";

const Navbar = () => {
  const userInfo = useUserInfo();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogOut = () => {
    logoutUser(router);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ my: 2 }}>
        <Link href="/">
          <Image src={bloodLogo} alt="Logo" width={80} height={80} />
        </Link>
      </Box>
      <Divider />
      <List>
        <ListItem button component={Link} href="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} href="/donors">
          <ListItemText primary="Donors" />
        </ListItem>
        <ListItem button component={Link} href="/about">
          <ListItemText primary="About Us" />
        </ListItem>
        {userInfo?.userId && (
          <ListItem button component={Link} href="/dashboard">
            <ListItemText primary="Dashboard" />
          </ListItem>
        )}
        {userInfo?.userId ? (
          <>
            <ListItem button component={Link} href="/dashboard/profile">
              <ListItemText primary="My Profile" />
            </ListItem>
            <ListItem button onClick={handleLogOut}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem button component={Link} href="/login">
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{ bgcolor: "primary.main", position: "sticky", top: 0, zIndex: 999 }}
    >
      <Container>
        <Stack
          py={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                borderRadius: "50%",
                overflow: "hidden",
                width: 80,
                height: 80,
                display: { xs: "none", sm: "block" },
              }}
            >
              <Link href="/">
                <Image
                  src={bloodLogo}
                  alt="Logo"
                  width={80}
                  height={80}
                  style={{ objectFit: "cover" }}
                />
              </Link>
            </Box>
            <Box>
              <Typography
                variant="h4"
                component={Link}
                href="/"
                fontWeight={600}
                sx={{
                  fontSize: {
                    xs: "20px",
                    sm: "20px",
                    md: "24px",
                    lg: "32px",
                  },
                }}
              >
                Bl
                <Box
                  component="span"
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  <BloodtypeIcon sx={{ color: "red", fontSize: "inherit" }} />
                  <BloodtypeIcon sx={{ color: "red", fontSize: "inherit" }} />
                </Box>
                d Donati
                <Box
                  component="span"
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  <BloodtypeIcon sx={{ color: "red", fontSize: "inherit" }} />
                </Box>
                n App
              </Typography>
            </Box>
          </Box>

          <Stack
            direction="row"
            justifyContent="space-between"
            gap={4}
            sx={{
              display: { xs: "none", md: "flex" },
              marginRight: {
                lg: 5,
              },
            }}
          >
            <Typography component={Link} href="/" color="#ffffff">
              Home
            </Typography>
            <Typography component={Link} href="/donors" color="#ffffff">
              Donors
            </Typography>
            <Typography component={Link} href="/about" color="#ffffff">
              About Us
            </Typography>
            {userInfo?.userId && (
              <Typography component={Link} href="/dashboard" color="#ffffff">
                Dashboard
              </Typography>
            )}
          </Stack>

          {userInfo?.userId ? (
            <Stack
              direction="row"
              gap={2}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <Button component={Link} href="/dashboard/profile">
                My Profile
              </Button>
              <Button
                color="error"
                onClick={handleLogOut}
                sx={{ boxShadow: 0 }}
              >
                Logout
              </Button>
            </Stack>
          ) : (
            <Button
              component={Link}
              href="/login"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              Login
            </Button>
          )}

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
      </Container>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navbar;
