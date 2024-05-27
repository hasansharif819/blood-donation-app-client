/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import PHForm from "@/components/Forms/PHForm";
import { FieldValues } from "react-hook-form";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import PHInput from "@/components/Forms/PHInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PHDatePicker from "@/components/Forms/PHDatePicker";
import { useRequestForBloodMutation } from "@/redux/api/requestApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import bloodImage from "@/assets/images/blood1.png";
import PHSelectField from "@/components/Forms/PHSelectField";
import { BloodGroups } from "@/types";

type PropTypes = {
  params: {
    id: string;
  };
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

const RequestforBlood = ({ params }: PropTypes) => {
  const { id } = params;
  const router = useRouter();

  const [requestForBlood, { isLoading: updating }] =
    useRequestForBloodMutation();

  const submitHandler = async (values: FieldValues) => {
    const bloodRequest = {
      donorId: id,
      ...values,
    };
    try {
      const res = await requestForBlood(bloodRequest);
      if ("data" in res && res.data?.id) {
        toast.success("Request for blood sent successfully");
        router.push("/donors");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <Container sx={{ mt: 4, height: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 2 }}
        color="primary"
      >
        Request for Blood
      </Typography>

      <Stack
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: 500,
            width: "100%",
            overflow: "hidden",
            borderRadius: 1,
          }}
        >
          <Image
            height={0}
            width={0}
            src={bloodImage}
            alt="Blood Donation Day"
            style={{ width: "100%", height: 500 }}
          />
        </Box>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <PHForm
            onSubmit={submitHandler}
            resolver={zodResolver(validationSchema)}
          >
            <Grid
              container
              spacing={2}
              sx={{ my: 3, width: "100%", maxWidth: 400 }}
            >
              <Grid item xs={12} sm={12} md={12}>
                <PHSelectField
                  items={BloodGroups}
                  name="bloodType"
                  label="Blood Group"
                  sx={{ mb: 2 }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <PHInput
                  name="phoneNumber"
                  label="Phone Number"
                  sx={{ mb: 2 }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <PHInput
                  name="dateOfDonation"
                  label="Date of Donation"
                  sx={{ mb: 2 }}
                  fullWidth
                />
                {/* <PHDatePicker name="dateOfDonation" label="Date of Donation" /> */}
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <PHInput
                  name="hospitalName"
                  label="Hospital Name"
                  sx={{ mb: 2 }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <PHInput
                  name="hospitalAddress"
                  label="Hospital Address"
                  sx={{ mb: 2 }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <PHInput
                  name="reason"
                  label="Reason"
                  sx={{ mb: 2 }}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} mb={2}>
              <Button type="submit" disabled={updating}>
                Request
              </Button>
            </Grid>
          </PHForm>
        </Box>
      </Stack>
    </Container>
  );
};

export default RequestforBlood;
