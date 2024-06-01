import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import blood1 from "@/assets/images/blood1.jpg";
import bloodgift from "@/assets/images/blood-gift.jpg";
import Link from "next/link";

const HeroSection = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${blood1.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
      }}
    >
      <Container
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          py: 16,
        }}
      >
        <Box
          sx={{
            flex: 1,
            textAlign: { xs: "center", md: "left" },
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box sx={{
            textAlign: "center",
            margin: "20px auto",
            fontSize: {
              xs: "24px",
              sm: "24px",
              md: "32px",
              lg: "40px",
            },
          }}>
          <Typography
            variant="h2"
            component="h1"
            fontWeight={700}
            color="white"
            sx={{ mb: 2, fontSize: {
              xs: "24px",
              sm: "24px",
              md: "32px",
              lg: "40px",
            }, }}
          >
            Donate Blood,
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            fontWeight={700}
            color="tomato"
            sx={{ mb: 2, fontSize: {
              xs: "24px",
              sm: "24px",
              md: "32px",
              lg: "40px",
            }, }}
          >
            Save Lives.
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            fontWeight={700}
            color="primary.main"
            sx={{ mb: 4, fontSize: {
              xs: "24px",
              sm: "24px",
              md: "32px",
              lg: "40px",
            }, }}
          >
            Be a Hero Today
          </Typography>
          </Box>
          <Typography variant="body1" color="white" sx={{ mb: 4 }}>
            Every donation helps save up to three lives. Your contribution is
            vital and can make a significant difference in someone’s life. Join
            us in this noble cause and become a hero by donating blood.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: {
                xs: "center",
                md: "flex-start",
                color: "white",
              },
              flexDirection: {
                xs: "column",
                sm: "column",
                md: "column",
                lg: "row",
              },
              width: {
                xs: "100%",
                sm: "100%",
                md: "100%",
              },
            }}
          >
            <Link href="/donors" passHref>
              <Button
                variant="contained"
                // color="primary"
                sx={{ py: 1.5, px: 3 }}
              >
                Donate Now
              </Button>
            </Link>
            <Link href="/about" passHref>
              <Button
                variant="outlined"
                // color="primary"
                sx={{ py: 1.5, px: 3, borderWidth: 2 }}
              >
                Learn More
              </Button>
            </Link>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: { xs: 4, md: 0 },
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: { xs: 300, sm: 400, md: 500 },
              height: { xs: 300, sm: 400, md: 500 },
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: 6,
            }}
          >
            <Image
              src={bloodgift}
              layout="responsive"
              alt="blood donation hero"
              width={500}
              height={500}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
