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
        <Stack direction="row" gap={4} justifyContent="center">
          <Typography color="#fff">Donors</Typography>
          <Typography color="#fff">Receiver</Typography>
          <Typography color="#fff">Admin</Typography>
          <Typography color="#fff">General</Typography>
        </Stack>

        <Stack direction="row" gap={2} justifyContent="center" py={3}>
          <Image src={facebookIcon} width={30} height={30} alt="facebook" />
          <Image src={instagramIcon} width={30} height={30} alt="facebook" />
          <Image src={twitterIcon} width={30} height={30} alt="facebook" />
          <Image src={linkedIcon} width={30} height={30} alt="facebook" />
        </Stack>
        {/* <div className="border-b-[1px] border-dashed"></div> */}
        <Box
          sx={{
            border: "1px dashed lightgray",
          }}
        ></Box>

        <Stack
          direction="row"
          gap={2}
          justifyContent="space-between"
          alignItems="center"
          py={3}
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
          >
            Bl
            <Box component="span" color="red">
              oo
            </Box>
            {/* {" "} */}d Do
            <Box component="span" color="primary.main">
              nati
            </Box>
            {/* {" "} */}
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
