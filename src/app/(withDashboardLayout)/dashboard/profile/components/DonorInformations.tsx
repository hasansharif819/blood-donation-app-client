import { Box, Stack, styled, Typography } from "@mui/material";

const StyledInformationBox = styled(Box)(({ theme }) => ({
  background: "#f4f7fe",
  borderRadius: theme.spacing(1),
  width: "45%",
  padding: "8px 16px",
  "& p": {
    fontWeight: 600,
  },
}));

const DonorInformation = ({ data }: any) => {
  return (
    <>
      <Typography variant="h5" color="primary.main" mb={2}>
        Personal Information
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} gap={2} flexWrap={"wrap"}>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Name
          </Typography>
          <Typography>{data?.name}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Email
          </Typography>
          <Typography>{data?.email}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Blood Group
          </Typography>
          <Typography>{data?.bloodType}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Total Donation
          </Typography>
          <Typography>{data?.totalDonations}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Location
          </Typography>
          <Typography>{data?.location}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            City
          </Typography>
          <Typography>{data?.city || "Not Given"}</Typography>
        </StyledInformationBox>
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        flexWrap={"wrap"}
        gap={2}
        mt={5}
      >
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Age
          </Typography>
          <Typography>{data?.userProfile?.age} Years</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Last Donation Date
          </Typography>
          <Typography>{data?.userProfile?.lastDonationDate}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Bio
          </Typography>
          <Typography>{data?.userProfile?.bio}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
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
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Current Status
          </Typography>
          <Typography>{data?.status || "Active"}</Typography>
        </StyledInformationBox>
      </Stack>
    </>
  );
};

export default DonorInformation;
