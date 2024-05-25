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
import ProfileUpdateModal from "./components/ProfileUpdateModal";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DonorInformation from "./components/DonorInformations";
import { toast } from "sonner";

const Profile = () => {
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

  return (
    <>
      <ProfileUpdateModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        id={data?.id}
      />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid xs={12} md={4}>
            <Box
              sx={{
                height: 500,
                width: "100%",
                overflow: "hidden",
                borderRadius: 1,
              }}
            >
              <Image
                height={500}
                width={400}
                layout="responsive"
                src={data?.profilePicture}
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
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
