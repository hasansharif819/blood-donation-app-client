"use client";

import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import PHSelectField from "@/components/Forms/PHSelectField";
import { useGetDonorQuery } from "@/redux/api/donorApi";
import { Gender } from "@/types";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TParams = {
  params: {
    donorId: string;
  };
};

const DonorUpdatePage = ({ params }: TParams) => {
  const router = useRouter();

  const id = params?.donorId;

  const { data, isLoading } = useGetDonorQuery(id);
  // const [updateDonor] = useUpdateDonorMutation();
  //   console.log(data);

  const handleFormSubmit = async (values: FieldValues) => {
    values.id = id;
    // console.log({ id: values.id, body: values });

    // try {
    //   const res = await updateDoctor({ id: values.id, body: values }).unwrap();
    //   if (res?.id) {
    //     toast.success("Doctor Updated Successfully!!!");
    //     router.push("/dashboard/admin/doctors");
    //   }
    // } catch (err: any) {
    //   console.error(err);
    // }
  };

  const defaultValues = {
    name: data?.name || "",
    email: data?.email || "",
    contactNumber: data?.contactNumber || "",
    address: data?.address || "",
  };
  return (
    <Box>
      <Typography component="h5" variant="h5">
        Update Donor Info
      </Typography>
      {isLoading ? (
        "Loading..."
      ) : (
        <PHForm
          onSubmit={handleFormSubmit}
          defaultValues={data && defaultValues}
        >
          <Grid container spacing={2} sx={{ my: 5 }}>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="name"
                label="Name"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="email"
                type="email"
                label="Email"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="contactNumber"
                label="Contract Number"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="address"
                label="Address"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          <Button type="submit">Update</Button>
        </PHForm>
      )}
    </Box>
  );
};

export default DonorUpdatePage;
