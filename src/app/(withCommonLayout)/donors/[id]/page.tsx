import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

type PropTypes = {
  params: {
    id: string;
  };
};

const InfoBoxStyles = {
  background:
    "linear-gradient(to bottom, rgba(21,134,253,0.3), rgba(255,255,255,1) 100%)",
  width: "100%",
  p: 3,
  "& h6": {
    color: "primary.main",
  },
  "& p": {
    color: "secondary.main",
  },
};

const DonorsProfilePage = async ({ params }: PropTypes) => {
  //   console.log("params = ", params);
  const res = await fetch(
    `https://blood-donation-server-final-six.vercel.app/api/donor-list/${params.id}`
  );
  const { data: donor } = await res.json();

  //   console.log(donor);

  const placeholder =
    "https://static.vecteezy.com/system/resources/thumbnails/026/489/224/small_2x/muslim-malay-woman-doctor-in-hospital-with-copy-space-ai-generated-photo.jpg";

  return (
    <Container>
      <Box my={5}>
        <Typography variant="h4" fontWeight={700} textAlign="center">
          Donor&apos;s Profile Details
        </Typography>
        <Typography
          textAlign="center"
          mt={2}
          sx={{ width: "70%", margin: "10px auto" }}
          variant="h6"
        >
          Your blood donation is a gift of life that only you can give. A few
          minutes of your time can mean a lifetime for someone else. Feel free
          to use this quote in your materials or on your website to encourage
          blood donation.
        </Typography>
      </Box>

      <Box>
        <Box sx={{ my: 10, p: 3, bgcolor: "#f8f8f8" }}>
          <Stack sx={{ bgcolor: "white", p: 3 }}>
            <Stack direction="row" gap={10}>
              <Box sx={{ width: 480, height: 480, bgcolor: "#808080" }}>
                <Image
                  src={donor?.profilePhoto ? donor?.profilePhoto : placeholder}
                  alt="donor image"
                  width={480}
                  height={480}
                  style={{
                    height: "480px",
                  }}
                />
              </Box>
              <Stack flex={1}>
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    Name: {donor?.name}
                  </Typography>
                  <Typography sx={{ my: "2px", color: "secondary.main" }}>
                    Email: {donor?.email}
                  </Typography>
                  <Typography sx={{ my: "2px", color: "secondary.main" }}>
                    Blood Group: {donor?.bloodType}
                  </Typography>
                  <Typography sx={{ my: "2px", color: "secondary.main" }}>
                    Location: {donor?.location}
                  </Typography>
                  <Typography sx={{ my: "2px", color: "secondary.main" }}>
                    City: {donor?.city}
                  </Typography>
                  <Typography sx={{ my: "2px", color: "secondary.main" }}>
                    Age: {donor?.userProfile?.age}
                  </Typography>
                  <Typography sx={{ my: "2px", color: "secondary.main" }}>
                    Last Donation Date: {donor?.userProfile?.lastDonationDate}
                  </Typography>
                  <Stack direction="row" alignItems="center" gap={2} mb={5}>
                    <Typography
                      noWrap
                      sx={{
                        maxWidth: "45ch",
                      }}
                    >
                      Bio: {donor?.userProfile?.bio}
                    </Typography>
                  </Stack>
                </Box>
                <Button>Request for Blood</Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default DonorsProfilePage;
