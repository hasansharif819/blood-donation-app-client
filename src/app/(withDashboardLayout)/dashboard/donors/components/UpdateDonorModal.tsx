/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";

import {
  useGetDonorQuery,
  useUpdateDonorByAdminMutation,
} from "@/redux/api/donorApi";
import PHForm from "@/components/Forms/PHForm";
import { FieldValues } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import PHSelectField from "@/components/Forms/PHSelectField";
import { Role, UserStatus } from "@/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import PHModal from "@/components/Shared/PHModal/PHModal";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const validationSchema = z.object({
  role: z.string().optional(),
  status: z.string().optional(),
});

const UpdateDonorModal = ({ open, setOpen, id }: TProps) => {
  const { data: userData, refetch, isSuccess } = useGetDonorQuery(id);

  const [updateDonor, { isLoading: updating }] =
    useUpdateDonorByAdminMutation();

  const submitHandler = async (values: FieldValues) => {
    const updatedValues = {
      id,
      ...values,
    };
    try {
      const res = await updateDonor(updatedValues);
      toast.success("Donor updated successful...");
      await refetch();
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong!!! Please try again later");
      console.log(error);
    }
  };

  return (
    <PHModal open={open} setOpen={setOpen} title="Update Donor">
      <PHForm onSubmit={submitHandler} resolver={zodResolver(validationSchema)}>
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid item xs={12} sm={12} md={6}>
            <PHSelectField
              items={Role}
              name="role"
              label="User Role"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHSelectField
              items={UserStatus}
              name="status"
              label="User Status"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
        </Grid>

        <Button type="submit" disabled={updating}>
          Update Donor
        </Button>
      </PHForm>
    </PHModal>
  );
};

export default UpdateDonorModal;
