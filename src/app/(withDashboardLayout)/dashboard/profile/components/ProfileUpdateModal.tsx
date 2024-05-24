/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";

import PHFullScreenModal from "@/components/Shared/PHModal/PHFullScreenModal";
import { useGetDonorQuery, useUpdateDonorMutation } from "@/redux/api/donorApi";
import PHForm from "@/components/Forms/PHForm";
import { FieldValues } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import PHInput from "@/components/Forms/PHInput";
import PHSelectField from "@/components/Forms/PHSelectField";
import { BloodGroups, Gender } from "@/types";
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

  name: z.string().optional(),
  email: z.string().optional(),
  location: z.string().optional(),
  city: z.string().optional(),
  bio: z.string().optional(),
  lastDonationDate: z.string().optional(),
});

const ProfileUpdateModal = ({ open, setOpen, id }: TProps) => {
  const { data: userData, refetch, isSuccess } = useGetDonorQuery(id);
  // const { data: allSpecialties } = useGetAllSpecialtiesQuery(undefined);
  // const [selectedSpecialtiesIds, setSelectedSpecialtiesIds] = useState([]);

  const [updateDonor, { isLoading: updating }] = useUpdateDonorMutation();

  const submitHandler = async (values: FieldValues) => {
    console.log({ id });
    // return;

    const excludedFields: Array<keyof typeof values> = [
      "email",
      "id",
      "role",
      "needPasswordChange",
      "status",
      "createdAt",
      "updatedAt",
      "isDeleted",
      "age",
      "bio",
      "profilePhoto",
      "lastDonationDate",
      "name",
      "location",
      "city",
    ];

    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key]) => {
        return !excludedFields.includes(key);
      })
    );

    try {
      updateDonor({ body: updatedValues, id });
      await refetch();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PHFullScreenModal open={open} setOpen={setOpen} title="Update Profile">
      <PHForm
        onSubmit={submitHandler}
        //   defaultValues={doctorData}
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
              name="age"
              type="number"
              label="Age"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <PHInput
              name="lastDonationDate"
              label="Last Donation Date"
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
