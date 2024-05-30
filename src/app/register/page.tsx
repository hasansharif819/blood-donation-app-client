"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerUser } from "@/services/actions/registerUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PHSelectField from "@/components/Forms/PHSelectField";
import { BloodGroups } from "@/types";
import PHDatePicker from "@/components/Forms/PHDatePicker";

// export const validationSchema = z.object({
//   name: z.string().min(1, "Please enter your name!"),
//   email: z.string().email("Please enter a valid email address!"),
//   password: z.string().min(6, "Must be at least 6 characters"),
//   bloodTYpe: z.string().min(1, "Please enter your Blood Group!"),
//   location: z.string().min(1, "Please enter your location!"),
//   age: z.string().min(1, "Please enter your age!"),
//   bio: z.string().min(1, "Please enter your bio!"),
//   lastDonationDate: z.string().min(1, "Please enter your lastDonationDate!"),
// });

// export const validationSchema = z.object({
//   password: z.string().min(6, "Must be at least 6 characters"),
//   patient: userValidationSchema,
// });

// export const defaultValues = {
//   name: "",
//   email: "",
//   password: "",
//   contactNumber: "",
//   address: "",
// };

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async (values: any) => {
    // const data = modifyPayload(values);
    // console.log(values);

    const password = values.password;
    const confirmPassword = values.confirmPassword;

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    const modifiedValues = {
      ...values,
      age: parseInt(values.age), // Convert age to a number
    };

    try {
      // const res = await registerUser(values);
      const res = await registerUser(modifiedValues);
      console.log(res);
      if (res?.data?.id) {
        toast.success(res?.message);
        const result = await userLogin({
          password: values.password,
          email: values.email,
        });
        if (result?.data?.token) {
          storeUserInfo({ accessToken: result?.data?.token });
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      // console.error(err.message);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              {/* <Image src={assets.svgs.logo} width={50} height={50} alt="logo" /> */}
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Blood Donation App Register
              </Typography>
            </Box>
          </Stack>

          <Box>
            <PHForm
              onSubmit={handleRegister}
              // resolver={zodResolver(validationSchema)}
              // defaultValues={defaultValues}
            >
              <Grid container spacing={2} my={1}>
                <Grid item md={12}>
                  <PHInput label="Name" fullWidth={true} name="name" />
                </Grid>
                <Grid item md={12}>
                  <PHInput
                    label="Email"
                    type="email"
                    fullWidth={true}
                    name="email"
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    label="Password"
                    type="password"
                    fullWidth={true}
                    name="password"
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    label="Confirm Password"
                    type="password"
                    fullWidth={true}
                    name="confirmPassword"
                  />
                </Grid>
                {/* <Grid item md={6}>
                  <PHInput
                    label="Blood Type"
                    type="text"
                    fullWidth={true}
                    name="bloodType"
                  />
                </Grid> */}
                <Grid item xs={12} sm={12} md={6}>
                  <PHSelectField
                    items={BloodGroups}
                    name="bloodType"
                    label="Blood Type"
                    sx={{ mb: 2 }}
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput label="Location" fullWidth={true} name="location" />
                </Grid>
                <Grid item md={6}>
                  <PHInput label="City" fullWidth={true} name="city" />
                </Grid>
                <Grid item md={6}>
                  <PHInput label="Bio" fullWidth={true} name="bio" />
                </Grid>
                <Grid item md={6}>
                  <PHInput label="Age" fullWidth={true} name="age" />
                </Grid>
                <Grid item md={6}>
                  {/* <PHInput
                    label="Last Donation Date"
                    fullWidth={true}
                    name="lastDonationDate"
                  /> */}
                  <PHDatePicker
                    name="lastDonationDate"
                    label="Last Donation Date"
                  />
                </Grid>
              </Grid>
              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Register
              </Button>
              <Typography component="p" fontWeight={300}>
                Do you already have an account? <Link href="/login">Login</Link>
              </Typography>
            </PHForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
