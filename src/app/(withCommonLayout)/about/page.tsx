import { Container, Box, Typography, Stack, Grid, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import team from "@/assets/images/team.jpg";

const AboutUsPage = () => {
  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Image
          src={team}
          alt="Our Team"
          layout="responsive"
          width={1920}
          height={700}
        />
      </Box>
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Box sx={{ mt: 5 }}>
          <Typography variant="h3" gutterBottom>
            About Us
          </Typography>
          <Typography variant="h6" paragraph>
            Welcome to Blood Donation App, where every drop counts.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h4" gutterBottom>
                Our Mission
              </Typography>
              <Typography paragraph>
                Our mission is to facilitate blood donations to save lives. We
                connect donors with those in need and provide resources to make
                the process easy, safe, and effective.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h4" gutterBottom>
                What We Do
              </Typography>
              <Typography paragraph>
                We offer a platform where individuals can register to donate
                blood, find blood donation camps, and connect with those in
                urgent need of blood. Our goal is to bridge the gap between
                donors and recipients, ensuring that no one has to suffer due to
                a lack of available blood.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" gutterBottom>
            Our Team
          </Typography>
          <Typography paragraph>
            Our dedicated team is passionate about making a difference. We are a
            group of healthcare professionals, technologists, and volunteers
            working together to ensure that blood is available whenever and
            wherever its needed.
          </Typography>
        </Box>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" gutterBottom>
            Get Involved
          </Typography>
          <Typography paragraph>
            Join us in our mission to save lives. Whether you are a donor, a
            volunteer, or someone who needs blood, we are here to support you.
            Together, we can make a difference.
          </Typography>
          <Button
            component={Link}
            href="/register"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Become a Donor
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default AboutUsPage;
