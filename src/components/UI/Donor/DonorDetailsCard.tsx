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
  Chip,
  Divider,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import avatar from "@/assets/images/avatar.png";
import useUserInfo from "@/hooks/useUserInfo";
import DonorRequestModal from "@/app/(withCommonLayout)/components/DonorRequestsModal";
import {
  Bloodtype,
  LocationOn,
  CalendarToday,
  Person,
  VolunteerActivism,
  Phone,
} from "@mui/icons-material";

interface Donor {
  id: string;
  name: string;
  email: string;
  bloodType: string;
  totalDonations: number;
  location: string;
  city?: string;
  status?: string;
  profilePicture?: string;
  userProfile?: {
    age?: number;
    bio?: string;
    lastDonationDate?: string;
    contactNumber?: string;
  };
}

interface DonorDetailsCardProps {
  donor: Donor;
}

const DonorDetailsCard: React.FC<DonorDetailsCardProps> = ({ donor }) => {
  const userInfo = useUserInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();

  const getStatusColor = () => {
    return donor?.status?.toLowerCase() === "active" ? "success" : "error";
  };

  const renderDetailItem = (
    icon: React.ReactNode,
    label: string,
    value?: string | number
  ) => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box sx={{ color: theme.palette.text.secondary }}>{icon}</Box>
      <Typography variant="body1">
        <Typography component="span" fontWeight={600}>
          {label}:{" "}
        </Typography>
        {value || "Not provided"}
      </Typography>
    </Stack>
  );

  return (
    <>
      <DonorRequestModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        id={donor?.id}
      />

      <Container maxWidth="lg">
        <Box my={5} textAlign="center">
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Donor Profile
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            maxWidth="md"
            mx="auto"
          >
            Your blood donation is a gift of life that only you can give. A few
            minutes of your time can mean a lifetime for someone else.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 10 }}>
          <Card
            sx={{
              width: "100%",
              maxWidth: 900,
              boxShadow: 3,
              borderRadius: 4,
              overflow: "hidden",
              background: theme.palette.background.paper,
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                gap={{ xs: 3, md: 5 }}
                alignItems="center"
              >
                <Box
                  sx={{
                    width: { xs: 150, md: 200 },
                    height: { xs: 150, md: 200 },
                    position: "relative",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: `4px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <Image
                    src={donor?.profilePicture || avatar}
                    alt={`${donor?.name}'s profile`}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </Box>

                <Stack spacing={2} sx={{ flex: 1 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    flexWrap="wrap"
                    gap={2}
                  >
                    <Typography variant="h5" fontWeight={700}>
                      {donor?.name}
                    </Typography>
                    <Chip
                      label={donor?.status || "Inactive"}
                      color={getStatusColor()}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Stack>

                  <Stack spacing={1.5}>
                    {renderDetailItem(
                      <Bloodtype />,
                      "Blood Group",
                      donor?.bloodType
                    )}
                    {renderDetailItem(
                      <LocationOn />,
                      "Location",
                      donor?.location
                    )}
                    {renderDetailItem(
                      <Phone />,
                      "Contact Number",
                      donor?.userProfile?.contactNumber
                    )}
                    {renderDetailItem(
                      <Person />,
                      "Age",
                      donor?.userProfile?.age
                    )}
                    {renderDetailItem(
                      <CalendarToday />,
                      "Last Donation",
                      donor?.userProfile?.lastDonationDate
                    )}
                    {renderDetailItem(
                      <VolunteerActivism />,
                      "Total Donations",
                      donor?.totalDonations
                    )}
                  </Stack>

                  <Divider sx={{ my: 1 }} />

                  <Box>
                    <Typography variant="subtitle1" fontWeight={600} mb={1}>
                      Bio:
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{
                        wordBreak: "break-word",
                        fontStyle: donor?.userProfile?.bio
                          ? "inherit"
                          : "italic",
                      }}
                    >
                      {donor?.userProfile?.bio || "No bio provided"}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </CardContent>

            <CardActions sx={{ p: 3, justifyContent: "center" }}>
              {userInfo?.userId ? (
                <Stack spacing={3} width="100%" maxWidth={600}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={() => setIsModalOpen(true)}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                    }}
                  >
                    Request Blood Donation
                  </Button>
                  <Typography
                    variant="body2"
                    color="error"
                    textAlign="center"
                    fontWeight={500}
                  >
                    Note: You can only request blood if your blood group matches
                    the donors blood group.
                  </Typography>
                </Stack>
              ) : (
                <Stack spacing={3} width="100%" maxWidth={400}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    component={Link}
                    href="/login"
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                    }}
                  >
                    Login to Request Blood
                  </Button>
                  <Typography
                    variant="body2"
                    color="error"
                    textAlign="center"
                    fontWeight={500}
                  >
                    You need to login before you can request blood.
                  </Typography>
                </Stack>
              )}
            </CardActions>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default DonorDetailsCard;
