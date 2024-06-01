"use client";

import { Box, Container, Grid, Typography } from "@mui/material";

const Stats = () => {
  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(to top, black, tomato)",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundImage: "linear-gradient(45deg, blue, cyan)",
            borderRadius: "20px",
            margin: "50px auto",
          }}
        >
          <Grid
            container
            spacing={2}
            textAlign="center"
            p={{ xs: 2, sm: 3, md: 5 }}
          >
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h3"
                component="h1"
                fontWeight={500}
                color="white"
              >
                20000+
              </Typography>
              <Typography
                variant="h6"
                component="h1"
                fontWeight={500}
                color="white"
              >
                Active Donors
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h3"
                component="h1"
                fontWeight={500}
                color="white"
              >
                6+
              </Typography>
              <Typography
                variant="h6"
                component="h1"
                fontWeight={500}
                color="white"
              >
                Emergency Services
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h3"
                component="h1"
                fontWeight={500}
                color="white"
              >
                10K+
              </Typography>
              <Typography
                variant="h6"
                component="h1"
                fontWeight={500}
                color="white"
              >
                Happy Blood Receivers
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h3"
                component="h1"
                fontWeight={500}
                color="white"
              >
                150+
              </Typography>
              <Typography
                variant="h6"
                component="h1"
                fontWeight={500}
                color="white"
              >
                Best Award Winners Donors
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Stats;
