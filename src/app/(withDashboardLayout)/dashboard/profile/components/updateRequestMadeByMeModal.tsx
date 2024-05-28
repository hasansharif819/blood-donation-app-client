/* eslint-disable react-hooks/exhaustive-deps */

import PHForm from "@/components/Forms/PHForm";
import { FieldValues } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PHModal from "@/components/Shared/PHModal/PHModal";
import { useUpdateRequestMadeByMeMutation } from "@/redux/api/requestApi";
import PHInput from "@/components/Forms/PHInput";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  data: any;
};

const validationSchema = z.object({
  donorId: z.string().optional(),
  phoneNumber: z.string().optional(),
  bloodType: z.string().optional(),
  dateOfDonation: z.string().optional(),
  hospitalName: z.string().optional(),
  hospitalAddress: z.string().optional(),
  reason: z.string().optional(),
});

const UpdateRequestMadeByMeModal = ({ open, setOpen, id, data }: TProps) => {
  const [updateRequest, { isLoading: updating }] =
    useUpdateRequestMadeByMeMutation();

  // console.log(" Data = ", data[0]);

  const defaultValues = {
    phoneNumber: data[0]?.phoneNumber,
    dateOfDonation: data[0]?.dateOfDonation,
    hospitalName: data[0]?.hospitalName,
    hospitalAddress: data[0]?.hospitalAddress,
    reason: data[0]?.reason,
  };

  const submitHandler = async (values: FieldValues) => {
    const payload = {
      id: id,
      ...values,
    };
    try {
      const res = await updateRequest(payload);
      toast.success("Request updated successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update request");
      console.log(error);
    }
  };

  return (
    <PHModal open={open} setOpen={setOpen} title="Update My Request to Donor">
      <PHForm
        onSubmit={submitHandler}
        defaultValues={defaultValues}
        resolver={zodResolver(validationSchema)}
      >
        <Grid container spacing={2} sx={{ my: 5 }}>
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
            <PHInput name="reason" label="reason" sx={{ mb: 2 }} fullWidth />
          </Grid>
        </Grid>

        <Button type="submit" disabled={updating}>
          Update My Request
        </Button>
      </PHForm>
    </PHModal>
  );
};

export default UpdateRequestMadeByMeModal;
