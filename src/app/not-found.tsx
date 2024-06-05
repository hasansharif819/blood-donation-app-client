"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import bloodImage from "@/assets/images/blood1.jpg";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${bloodImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <Container>
        <Box
          sx={{
            position: "relative",
            zIndex: 999,
            width: "100%",
            maxWidth: 500,
            mx: "auto",
            textAlign: "center",
            bgcolor: "rgba(255, 255, 255, 0.8)",
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h1"
            gutterBottom
            sx={{
              fontSize: { xs: "3rem", md: "6rem" },
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            404
          </Typography>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: "300",
              color: "text.secondary",
            }}
          >
            Oops! Page not found.
          </Typography>

          <Stack direction="row" gap={2} justifyContent="center" mt={4}>
            <Link href="/" passHref>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<HomeIcon />}
              >
                Home
              </Button>
            </Link>
            <Button
              variant="contained"
              onClick={() => window.history.back()}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
