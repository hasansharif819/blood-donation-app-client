"use client";

import useUserInfo from "@/hooks/useUserInfo";
import { logoutUser } from "@/services/actions/logoutUser";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import bloodLogo from "@/assets/images/blood-logo.png";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";

const Navbar = () => {
  const userInfo = useUserInfo();
  const router = useRouter();

  const handleLogOut = () => {
    logoutUser(router);
  };

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
      }}
    >
      <Container>
        <Stack
          py={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <Box
              sx={{
                borderRadius: "50%",
                overflow: "hidden",
                width: 80,
                height: 80,
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
            <Typography variant="h4" component={Link} href="/" fontWeight={600}>
              Bl
              <Box component="span" color="red">
                <BloodtypeIcon fontSize="large" sx={{ color: "red" }} />
                <BloodtypeIcon fontSize="large" sx={{ color: "red" }} />
              </Box>
              d Dona
              <Box component="span" color="tomato">
                tion
              </Box>{" "}
              App
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" gap={4}>
            <Typography component={Link} href="/" color="#ffffff">
              Home
            </Typography>

            <Typography component={Link} href="/donors" color="#ffffff">
              Donors
            </Typography>

            <Typography component={Link} href="/about" color="#ffffff">
              About Us
            </Typography>

            {userInfo?.userId ? (
              <Typography component={Link} href="/dashboard" color="#ffffff">
                Dashboard
              </Typography>
            ) : null}
          </Stack>

          {userInfo?.userId ? (
            <Stack sx={{ flexDirection: "row", gap: 2 }}>
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
            <Button component={Link} href="/login">
              Login
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
