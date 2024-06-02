import { Box, Grid, Typography } from "@mui/material";

const DonorInformation = ({ data }: any) => {
  return (
    <>
      <Typography variant="h5" color="primary.main" mb={2}>
        Personal Information for {data?.name || "Donors"}.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ backgroundColor: "#f4f7fe", p: 2 }}>
            <Typography color="secondary" variant="caption">
              Name
            </Typography>
            <Typography>{data?.name}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ backgroundColor: "#f4f7fe", p: 2 }}>
            <Typography color="secondary" variant="caption">
              Email
            </Typography>
            <Typography>{data?.email}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ backgroundColor: "#f4f7fe", p: 2 }}>
            <Typography color="secondary" variant="caption">
              Blood Group
            </Typography>
            <Typography>{data?.bloodType}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ backgroundColor: "#f4f7fe", p: 2 }}>
            <Typography color="secondary" variant="caption">
              Total Donation
            </Typography>
            <Typography>{data?.totalDonations}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ backgroundColor: "#f4f7fe", p: 2 }}>
            <Typography variant="caption" color="secondary">
              Location
            </Typography>
            <Typography>{data?.location}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ backgroundColor: "#f4f7fe", p: 2 }}>
            <Typography variant="caption" color="secondary">
              City
            </Typography>
            <Typography>{data?.city || "Not Given"}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ backgroundColor: "#f4f7fe", p: 2 }}>
            <Typography variant="caption" color="secondary">
              Age
            </Typography>
            <Typography>{data?.userProfile?.age} Years</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ backgroundColor: "#f4f7fe", p: 2 }}>
            <Typography variant="caption" color="secondary">
              Last Donation Date
            </Typography>
            <Typography>{data?.userProfile?.lastDonationDate}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ backgroundColor: "#f4f7fe", p: 2 }}>
            <Typography variant="caption" color="secondary">
              Bio
            </Typography>
            <Typography>{data?.userProfile?.bio}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ backgroundColor: "#f4f7fe", p: 2 }}>
            <Typography variant="caption" color="secondary">
              Joined
            </Typography>
            <Typography>
              {data
                ? new Date(data.createdAt).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "2-digit",
                  })
                : null}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ backgroundColor: "#f4f7fe", p: 2 }}>
            <Typography variant="caption" color="secondary">
              Current Status
            </Typography>
            <Typography>{data?.status || "Active"}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ backgroundColor: "#f4f7fe", p: 2 }}>
            <Typography variant="caption" color="secondary">
              Contact Number
            </Typography>
            <Typography>
              {data?.userProfile?.contactNumber || "Not set"}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default DonorInformation;
