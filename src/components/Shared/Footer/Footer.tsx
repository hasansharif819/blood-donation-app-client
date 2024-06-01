import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import facebookIcon from "@/assets/landing_page/facebook.png";
import instagramIcon from "@/assets/landing_page/instagram.png";
import twitterIcon from "@/assets/landing_page/twitter.png";
import linkedIcon from "@/assets/landing_page/linkedin.png";

const Footer = () => {
  return (
    <Box bgcolor="rgb(17, 26, 34)" py={5}>
      <Container>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={4}
          justifyContent="center"
          alignItems="center"
          textAlign={{ xs: "center", sm: "left" }}
        >
          <Typography color="#fff">Donors</Typography>
          <Typography color="#fff">Receiver</Typography>
          <Typography color="#fff">Admin</Typography>
          <Typography color="#fff">General</Typography>
        </Stack>

        <Stack
          direction="row"
          gap={2}
          justifyContent="center"
          py={3}
        >
          <Image src={facebookIcon} width={30} height={30} alt="facebook" />
          <Image src={instagramIcon} width={30} height={30} alt="instagram" />
          <Image src={twitterIcon} width={30} height={30} alt="twitter" />
          <Image src={linkedIcon} width={30} height={30} alt="linkedin" />
        </Stack>

        <Box
          sx={{
            border: "1px dashed lightgray",
            mt: 3,
            mb: 3,
          }}
        ></Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={2}
          justifyContent="space-between"
          alignItems="center"
          textAlign={{ xs: "center", sm: "left" }}
        >
          <Typography component="p" color="white">
            &copy;2024 Blood Donation App. All Rights Reserved.
          </Typography>
          <Typography
            variant="h4"
            component={Link}
            href="/"
            fontWeight={600}
            color="white"
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem" }
            }}
          >
            Bl
            <Box component="span" color="red">
              oo
            </Box>
            d Do
            <Box component="span" color="primary.main">
              nati
            </Box>
            on App
          </Typography>
          <Typography component="p" color="white">
            Privacy Policy! Terms & Conditions
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
