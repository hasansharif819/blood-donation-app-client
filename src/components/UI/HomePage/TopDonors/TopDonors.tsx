import DonorCard from "@/components/UI/Donor/DonorCard";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";

const TopDonors = async () => {
  const res = await fetch(
    `https://blood-donation-server-final-six.vercel.app/api/donor-list`
  );

  const { data } = await res.json();

  return (
    <Container>
      <Typography variant="h3" color={"primary.main"} textAlign={"center"}>
        Top Donors
      </Typography>

      <Box sx={{ mt: 2, p: 3, bgcolor: "secondary.light" }}>
        <Grid container spacing={3}>
          {data?.slice(0, 6).map((donor: any, index: number) => (
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
    </Container>
  );
};

export default TopDonors;
