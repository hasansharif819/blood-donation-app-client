"use client";

import { Box, Container, Typography, Grid, IconButton } from "@mui/material";
import { useState } from "react";

const SuccessStories = () => {
  const testimonials = [
    {
      name: "Sharif Hasan",
      role: "Blood Donor",
      story:
        "I've been donating blood regularly through this app for the past two years. It's incredibly rewarding to know that my donations have helped save lives. I encourage everyone to join this noble cause.",
    },
    {
      name: "Jaker Hossain",
      role: "Blood Donor",
      story:
        "I've been donating blood regularly through this app for the past two years. It's incredibly rewarding to know that my donations have helped save lives. I encourage everyone to join this noble cause.",
    },
    {
      name: "Kylian MBappe",
      role: "Blood Donor",
      story:
        "I've been donating blood regularly through this app for the past two years. It's incredibly rewarding to know that my donations have helped save lives. I encourage everyone to join this noble cause.",
    },
    {
      name: "John Doe",
      role: "Blood Donor",
      story:
        "I've been donating blood regularly through this app for the past two years. It's incredibly rewarding to know that my donations have helped save lives. I encourage everyone to join this noble cause.",
    },
    {
      name: "Jane Smith",
      role: "Blood Recipient",
      story:
        "When I needed blood urgently due to a medical emergency, this app connected me with generous donors who saved my life. I'm forever grateful for their selfless act of kindness.",
    },
  ];

  // State for controlling the active testimonial index
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(to top, tomato, #ffffff)",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          sx={{ mb: 6, fontSize: {
            xs: "32px",
            sm: "32px",
            md: "32px",
            lg: "48px",
          } }}
          color={"primary.main"}
        >
          Success Stories
        </Typography>
        <Box position="relative">
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            style={{
              transform: `translateX(-${
                activeIndex * (100 / testimonials.length)
              }%)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    p: 4,
                    border: 1,
                    borderRadius: 2,
                    borderColor: "primary.main",
                    boxShadow: 3,
                    height: "100%",
                  }}
                >
                  <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                    {testimonial.name}, {testimonial.role}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {testimonial.story}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default SuccessStories;
