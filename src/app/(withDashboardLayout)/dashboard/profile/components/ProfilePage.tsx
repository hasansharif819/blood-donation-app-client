"use client";

import {
  useGetMYProfileQuery,
  useUpdateProfilePictureMutation,
} from "@/redux/api/myProfile";
import { Box, Button, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import React, { useState } from "react";
import AutoFileUploader from "@/components/Forms/AutoFileUploader";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { toast } from "sonner";
import avatar from "@/assets/images/avatar.png";
import DashedLine from "@/components/UI/Donor/DashedLine";
import ProfileUpdateModal from "./ProfileUpdateModal";
import DonorInformation from "./DonorInformations";
import MyDonationRequests from "./MyDonationRequests";
import DonationRequestsMadeByMe from "./DonationRequestsMadeByMe";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetMYProfileQuery(undefined);

  const [updateProfilePicture, { isLoading: updating }] =
    useUpdateProfilePictureMutation();

  const fileUploadHandler = (file: File) => {
    const imgBBLink = "4fb1911cd7fea07ca539c23c89d490db";
    const formData = new FormData();
    formData.append("image", file);
    const url = `https://api.imgbb.com/1/upload?key=${imgBBLink}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const image = result.data.url;
          // console.log("Image = ", image);
          const profileUpdate = {
            id: data?.id,
            profilePicture: image,
          };
          const picture = updateProfilePicture(profileUpdate);
          // console.log("Picture = ", picture);
          picture
            .then((resolvedValue) => {
              console.log("resolvedValue = ", resolvedValue);
              toast.success("Profile Picture uploaded successfully");
            })
            .catch((error) => {
              toast.error(
                "Failed to upload the profile picture. Please try again."
              );
            });
        }
      });
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  // const placeholder = "https://i.ibb.co/C9R8GrS/IMG-20200803-183036.jpg";
  return (
    <>
      <ProfileUpdateModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        id={data?.id}
      />
      <Container sx={{ mt: 4 }}>
        <Grid
          container
          spacing={4}
          sx={{
            mb: {
              xs: 5,
              sm: 5,
              md: 10,
            },
          }}
        >
          <Grid xs={12} md={4}>
            <Box
              sx={{
                height: {
                  lg: "100%",
                  xl: "100%",
                },
                maxHeight: 500,
                width: "100%",
                overflow: "hidden",
                borderRadius: 1,
              }}
            >
              <Image
                height={450}
                width={400}
                src={data?.profilePicture ? data?.profilePicture : avatar}
                alt="User Photo"
              />
            </Box>
            <Box my={3}>
              {updating ? (
                <p>Uploading...</p>
              ) : (
                <AutoFileUploader
                  name="file"
                  label="Choose Your Profile Photo"
                  icon={<CloudUploadIcon />}
                  onFileUpload={fileUploadHandler}
                  variant="text"
                />
              )}
            </Box>

            <Button
              fullWidth
              endIcon={<ModeEditIcon />}
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </Button>
          </Grid>
          <Grid xs={12} md={8}>
            <DonorInformation data={data} />
            {/* <DonorInformation /> */}
          </Grid>
        </Grid>
        <DashedLine />
        <Grid xs={12} md={8}>
          <MyDonationRequests />
        </Grid>
        <DashedLine />
        <Grid xs={12} md={8}>
          <DonationRequestsMadeByMe />
        </Grid>
      </Container>
    </>
  );
};

export default ProfilePage;
