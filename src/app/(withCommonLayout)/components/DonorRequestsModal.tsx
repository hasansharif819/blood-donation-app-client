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
import { useRequestForBloodMutation } from "@/redux/api/requestApi";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const validationSchema = z.object({
  bloodType: z.string({
    required_error:
      "Requested Blood group is not matched with donor blood group",
  }),
  phoneNumber: z.string({ required_error: "Phone number is required" }),
  dateOfDonation: z.string({ required_error: "Date of donation is required" }),
  hospitalName: z.string({ required_error: "Hospital name is required" }),
  hospitalAddress: z.string({ required_error: "Hospital address is required" }),
  reason: z.string({ required_error: "Reason is required" }),
});

const DonorRequestModal = ({ open, setOpen, id }: TProps) => {
  const { data: userData, refetch, isSuccess } = useGetDonorQuery(id);

  const defaultValues = {
    bloodType: userData?.bloodType,
    hospitalAddress: userData?.location,
  };

  //   const [updateProfile, { isLoading: updating }] = useUpdateMYProfileMutation();
  const [requestForBlood, { isLoading: updating }] =
    useRequestForBloodMutation();

  const submitHandler = async (values: FieldValues) => {
    const bloodRequestData = {
      donorId: id,
      ...values,
    };
    try {
      const res = await requestForBlood(bloodRequestData);
      toast.success(
        "Your request send successfully. Please wait for the donor's response. Thank you"
      );
      await refetch();
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong!!! Please try again later");
      console.log(error);
    }
  };

  return (
    <PHFullScreenModal
      open={open}
      setOpen={setOpen}
      title="Send Request for Blood"
    >
      <PHForm
        onSubmit={submitHandler}
        defaultValues={defaultValues}
        resolver={zodResolver(validationSchema)}
      >
        <Grid container spacing={2} sx={{ my: 5 }}>
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
              name="phoneNumber"
              label="Phone Number"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <PHInput
              name="dateOfDonation"
              label="Date of Donation"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput
              name="hospitalName"
              label="Hospital Name"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput
              name="hospitalAddress"
              label="Hospital Address"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput name="reason" label="Reason" sx={{ mb: 2 }} fullWidth />
          </Grid>
        </Grid>

        <Button type="submit" disabled={updating}>
          Send Request
        </Button>
      </PHForm>
    </PHFullScreenModal>
  );
};

export default DonorRequestModal;
