/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";

import PHForm from "@/components/Forms/PHForm";
import { FieldValues } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import PHSelectField from "@/components/Forms/PHSelectField";
import { RequestStatus } from "@/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PHModal from "@/components/Shared/PHModal/PHModal";
import { useUpdateRequestStatusMutation } from "@/redux/api/requestApi";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const validationSchema = z.object({
  status: z.string(),
});

const UpdateRequestStatusModal = ({ open, setOpen, id }: TProps) => {
  const [updateRequest, { isLoading: updating }] =
    useUpdateRequestStatusMutation();

  const submitHandler = async (values: FieldValues) => {
    const payload = {
      id: id,
      ...values,
    };
    try {
      const res = await updateRequest(payload);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PHModal open={open} setOpen={setOpen} title="Update Request Status">
      <PHForm onSubmit={submitHandler} resolver={zodResolver(validationSchema)}>
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid item xs={12} sm={12} md={6}>
            <PHSelectField
              items={RequestStatus}
              name="status"
              label="Request Status"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
        </Grid>

        <Button type="submit" disabled={updating}>
          Update Request
        </Button>
        {/* <Button type="submit">Update Request</Button> */}
      </PHForm>
    </PHModal>
  );
};

export default UpdateRequestStatusModal;
