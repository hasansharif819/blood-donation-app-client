import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
// import assets from "@/assets"; // Assuming you have similar assets for blood donation
import blood1 from "@/assets/images/blood1.jpg";

const HeroSection = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        my: 16,
      }}
    >
      <Box
        sx={{
          flex: 1,
          position: "relative",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography variant="h2" component="h1" fontWeight={600}>
          Donate Blood,
        </Typography>
        <Typography variant="h2" component="h1" fontWeight={600}>
          Save Lives
        </Typography>
        <Typography
          variant="h2"
          component="h1"
          fontWeight={600}
          color="primary.main"
        >
          Be a Hero Today
        </Typography>
        <Typography sx={{ my: 4 }}>
          Every donation helps save up to three lives. Your contribution is
          vital and can make a significant difference in someone’s life. Join us
          in this noble cause and become a hero by donating blood.
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <Button variant="contained" color="primary">
            Donate Now
          </Button>
          <Button variant="outlined" color="primary">
            Learn More
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          p: 1,
          flex: 1,
          display: "flex",
          justifyContent: "center",
          position: "relative",
          mt: { xs: 4, md: 0 },
        }}
      >
        <Image
          src={blood1} // Replace with your single image path
          width={500} // Adjust width as needed
          height={500} // Adjust height as needed
          alt="blood donation hero"
        />
      </Box>
    </Container>
  );
};

export default HeroSection;
