/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";

import PHFullScreenModal from "@/components/Shared/PHModal/PHFullScreenModal";
import { useGetDonorQuery } from "@/redux/api/donorApi";
import PHForm from "@/components/Forms/PHForm";
import { FieldValues } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import PHInput from "@/components/Forms/PHInput";
import PHSelectField from "@/components/Forms/PHSelectField";
import { BloodGroups, Gender } from "@/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PHDatePicker from "@/components/Forms/PHDatePicker";
import { useUpdateMYProfileMutation } from "@/redux/api/myProfile";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const validationSchema = z.object({
  age: z.preprocess(
    (x) => (x ? x : undefined),
    z.coerce.number().int().optional()
  ),
  totalDonations: z.preprocess(
    (x) => (x ? x : undefined),
    z.coerce.number().int().optional()
  ),

  name: z.string().optional(),
  email: z.string().optional(),
  location: z.string().optional(),
  city: z.string().optional(),
  bio: z.string().optional(),
  lastDonationDate: z.string().optional(),
  bloodType: z.string().optional(),
  contactNumber: z.string().optional(),
});

const ProfileUpdateModal = ({ open, setOpen, id }: TProps) => {
  const { data: userData, refetch, isSuccess } = useGetDonorQuery(id);

  const defaultValues = {
    id: userData?.id,
    name: userData?.name,
    email: userData?.email,
    totalDonations: userData?.totalDonations,
    location: userData?.location,
    city: userData?.city,
    bloodType: userData?.bloodType,
    age: userData?.userProfile?.age,
    bio: userData?.userProfile?.bio,
    contactNumber: userData?.userProfile?.contactNumber,
    lastDonationDate: userData?.userProfile?.lastDonationDate,
  };

  const [updateProfile, { isLoading: updating }] = useUpdateMYProfileMutation();

  const submitHandler = async (values: FieldValues) => {
    try {
      const res = await updateProfile(values);
      await refetch();
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong!!! Please try again later");
      console.log(error);
    }
  };

  return (
    <PHFullScreenModal open={open} setOpen={setOpen} title="Update Profile">
      <PHForm
        onSubmit={submitHandler}
        defaultValues={defaultValues}
        resolver={zodResolver(validationSchema)}
      >
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput name="name" label="Name" sx={{ mb: 2 }} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput
              name="email"
              type="email"
              label="Email"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHSelectField
              items={BloodGroups}
              name="bloodType"
              label="Blood Type"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput
              name="totalDonations"
              type="number"
              label="Total Donations"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput
              name="location"
              label="Location"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput name="city" label="City" sx={{ mb: 2 }} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput name="bio" label="Bio" sx={{ mb: 2 }} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput
              name="contactNumber"
              label="Contact Number"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput
              name="age"
              type="number"
              label="Age"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>

          <Grid item md={6}>
            {/* <PHDatePicker name="lastDonationDate" label="Last Donation Date" /> */}
            <PHInput
              name="lastDonationDate"
              type="text"
              label="lastDonationDate"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
        </Grid>

        <Button type="submit" disabled={updating}>
          Update
        </Button>
      </PHForm>
    </PHFullScreenModal>
  );
};

export default ProfileUpdateModal;
