// import DashedLine from "@/components/UI/Doctor/DashedLine";
import DonorCard from "@/components/UI/Doctor/DonorCard";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const Donors = async () => {
  const res = await fetch(
    `https://blood-donation-server-final-six.vercel.app/api/donor-list`
  );

  const { data } = await res.json();

  // console.log(data);

  return (
    <Container>
      {/* <DashedLine /> */}

      <Box sx={{ mt: 2, p: 3, bgcolor: "secondary.light" }}>
        <Grid container spacing={3}>
          {data?.map((donor: any, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={donor.id}>
              <DonorCard donor={donor} />
            </Grid>
          ))}
        </Grid>

        {data.length === 0 && (
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography>No Donors Found With This Name</Typography>
          </Box>
        )}
      </Box>
      {/* <DashedLine /> */}
    </Container>
  );
};

export default Donors;
