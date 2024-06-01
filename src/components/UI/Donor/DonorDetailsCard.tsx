"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import avatar from "@/assets/images/avatar.png";
import useUserInfo from "@/hooks/useUserInfo";
import DonorRequestModal from "@/app/(withCommonLayout)/components/DonorRequestsModal";

const DonorDetailsCard = ({ donor }: any) => {
  const userInfo = useUserInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Popup */}
      <DonorRequestModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        id={donor?.id}
      />

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
            blood donation. Donate blood and save lives today!
          </Typography>
        </Box>

        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: 10 }}
        >
          <Card
            sx={{
              maxWidth: 1000,
              boxShadow: 3,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <CardContent>
              <Stack
                direction={{ xs: "column", md: "row" }}
                gap={5}
                alignItems="center"
                justifyContent="center"
                sx={{ p: 3 }}
              >
                <Box sx={{ width: 200 }}>
                  <Image
                    src={donor?.profilePicture ? donor?.profilePicture : avatar}
                    alt="donor image"
                    width={200}
                    height={250}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                </Box>
                <Stack flex={1} spacing={2}>
                  <Typography variant="h6" fontWeight={700}>
                    Name: {donor?.name}
                  </Typography>
                  <Typography color="text.secondary">
                    Email: {donor?.email}
                  </Typography>
                  <Typography color="text.secondary">
                    Blood Group: {donor?.bloodType}
                  </Typography>
                  <Typography color="text.secondary">
                    Total Donates: {donor?.totalDonations} Times.
                  </Typography>
                  <Typography color="text.secondary">
                    Location: {donor?.location}
                  </Typography>
                  <Typography color="text.secondary">
                    City: {donor?.city || "Not Given"}
                  </Typography>
                  <Typography color="text.secondary">
                    Age: {donor?.userProfile?.age}
                  </Typography>
                  <Typography color="text.secondary">
                    Availability: {donor?.status || "Inactive"}
                  </Typography>
                  <Typography color="text.secondary">
                    Last Donation Date: {donor?.userProfile?.lastDonationDate}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ wordBreak: "break-word" }}
                  >
                    Bio: {donor?.userProfile?.bio}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
            <CardActions
              sx={{
                p: 3,
                flexDirection: "column",
                alignItems: "center",
                maxWidth: 800,
                mx: "auto",
              }}
            >
              {userInfo?.userId ? (
                <>
                  <Button
                    sx={{ maxWidth: 300, mb: 5 }}
                    fullWidth
                    onClick={() => setIsModalOpen(true)}
                  >
                    Request for Blood
                  </Button>

                  <Typography color="error" fontWeight="bold">
                    You can only request for blood from this donor if your blood
                    group and the donors blood group match exactly. Otherwise,
                    you cannot request blood from this donor.
                  </Typography>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    href="/login"
                    sx={{ mb: 2 }}
                  >
                    Login
                  </Button>
                  <Typography color="error" fontWeight="bold">
                    You need to login before you request blood.
                  </Typography>
                </>
              )}
            </CardActions>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default DonorDetailsCard;
