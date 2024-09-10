"use client";
import {
  Box,
  Button,
  CircularProgress,
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
import { useState } from "react";
import dayjs from "dayjs";

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (values: any) => {
    const password = values.password;
    const confirmPassword = values.confirmPassword;
  
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }
  
    const modifiedValues = {
      ...values,
      age: parseInt(values.age),
      lastDonationDate: dayjs(values.lastDonationDate).format('YYYY-MM-DD'),
    };
  
    try {
      setIsLoading(true);
      const res = await registerUser(modifiedValues);
      // console.log(res);

      if(res.success === false){
        setError("Please fill all the fields carefully!!!")
      }

      if (res?.data?.id) {
        toast.success(res?.message);
        const result = await userLogin({
          password: values.password,
          email: values.email,
        });
        if (result?.data?.token) {
          storeUserInfo({ accessToken: result?.data?.token });
          router.push("/");
        }
      }
      setIsLoading(false);
    } catch (err: any) {
      setError("Please fill all the fields carefully!!!");
      setIsLoading(false);
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
              <Image src={assets.images.bloodLogo} width={50} height={50} alt="logo" />
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
                  <PHDatePicker
                    name="lastDonationDate"
                    label="Last Donation Date"
                  />
                </Grid>
              </Grid>
              {error && (
                <Box>
                  <Typography
                    sx={{
                      backgroundColor: "red",
                      padding: "1px",
                      borderRadius: "2px",
                      color: "white",
                      marginTop: "5px",
                    }}
                  >
                    {error}
                  </Typography>
                </Box>
              )}

              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : "Register"}
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