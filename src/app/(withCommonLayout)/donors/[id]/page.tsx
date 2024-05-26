// import DonorDetailsCard from "@/components/UI/Donor/DonorDetailsCard";
import {
  Box,
  Button,
  CardActions,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import avatar from "@/assets/images/avatar.png";

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
  const handleRequestBlood = (id: string) => {
    console.log("Request for bllod id = ", id);
  };

  // const placeholder = "https://i.ibb.co/C9R8GrS/IMG-20200803-183036.jpg";

  return (
    // <DonorDetailsCard />
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
              <Box sx={{ width: 400, height: 500, bgcolor: "#808080" }}>
                <Image
                  src={donor?.profilePicture ? donor?.profilePicture : avatar}
                  alt="donor image"
                  width={400}
                  height={500}
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
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    href={`/donors/${donor.id}/blood-request`}
                  >
                    Request for Blood
                  </Button>
                </CardActions>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default DonorsProfilePage;
