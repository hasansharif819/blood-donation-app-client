import React from 'react';
import { Box, Container, Typography, TextField, Button, Grid, IconButton, Link, Stack } from '@mui/material';
import Image from "next/image";
import facebookIcon from "@/assets/landing_page/facebook.png";
import linkedIcon from "@/assets/landing_page/linkedin.png";
import githubIcon from "@/assets/landing_page/git.png";
import youtubeIcon from "@/assets/landing_page/youtube1.png";


const FooterHeader = () => {
    return (
        <Box component="footer">
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            BLOOD DONATION APP
                        </Typography>
                        <Typography variant="body1" color="white">
                            Connecting donors with those in need, our blood donation app makes saving lives easier. Find nearby centers, track your donations, and get alerts for urgent needs—all in one place
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Services
                        </Typography>
                        <Box>
                            <Link href="/donors" color="inherit" underline="hover" display="block">Find Donation Centers</Link>
                            <Link href="/register" color="inherit" underline="hover" display="block">Register as a Donor</Link>
                            <Link href="/donors" color="inherit" underline="hover" display="block">Blood Donation History</Link>
                            <Link href="/donors" color="inherit" underline="hover" display="block">Urgent Blood Requests</Link>
                            <Link href="/donors" color="inherit" underline="hover" display="block">Blood Type Matching </Link>
                            <Link href="/donors" color="inherit" underline="hover" display="block">Donation Reminders</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Company
                        </Typography>
                        <Box>
                            <Link href="/about" color="inherit" underline="hover" display="block">About us</Link>
                            <Link href="/contact" color="inherit" underline="hover" display="block">Contact</Link>
                            <Link href="/contact" color="inherit" underline="hover" display="block">Jobs</Link>
                            <Link href="/contact" color="inherit" underline="hover" display="block">Press kit</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Legal
                        </Typography>
                        <Box>
                            <Link href="/" color="inherit" underline="hover" display="block">Terms of use</Link>
                            <Link href="/" color="inherit" underline="hover" display="block">Privacy policy</Link>
                            <Link href="/" color="inherit" underline="hover" display="block">Cookie policy</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" fontWeight="bold" align="center" gutterBottom>
                            BLOOD DONATION APP
                        </Typography>
                        <Box color="#fff">
                            <Typography variant="body1" align="center" color="white">
                                Enter your email address
                            </Typography>
                            <TextField
                                variant="outlined"
                                fullWidth
                                placeholder="username@gmail.com"
                                sx={{
                                    mt: 1,
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                        color: 'white',
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <Button variant="contained" sx={{ bgcolor: 'white', color: '#000' }}>
                                            Subscribe
                                        </Button>
                                    ),
                                }}
                            />
                        </Box>
                        <Stack
                            direction="row"
                            gap={2}
                            justifyContent="center"
                            py={3}
                        >
                            <IconButton component="a" href="https://www.facebook.com/profile.php?id=100012993934707&mibextid=kFxxJD" target="_blank" color="inherit"><Image src={facebookIcon} width={30} height={30} alt="facebook" />
                            </IconButton>
                            
                            <IconButton component="a" href="https://www.linkedin.com/in/sharif-hasan-073a58218/" target="_blank" color="inherit"><Image src={linkedIcon} width={30} height={30} alt="linkedin" /></IconButton>
                            <IconButton component="a" href="https://github.com/hasansharif819" target="_blank" color="inherit">
                            <Image src={githubIcon} width={30} height={30} alt="github" />
                            </IconButton>
                            <IconButton component="a" href="https://www.youtube.com/channel/UCWkTngyHHIhNSUkZ9tBnStA" target="_blank" color="inherit">
                            <Image src={youtubeIcon} width={30} height={30} alt="youtube" />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default FooterHeader;
