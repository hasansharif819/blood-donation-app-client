"use client";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Image from "next/image";
import assets from "@/assets";

// Validation schema
// export const validationSchema = z.object({
//   email: z.string().email("Please enter a valid email address!"),
//   password: z.string().min(6, "Must be at least 6 characters"),
// });

const LoginPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [navigationLoading, setNavigationLoading] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // resolver: zodResolver(validationSchema),
    // defaultValues: {
    //   email: "sharif@gmail.com",
    //   password: "123456",
    // },
  });

  const handleLogin: SubmitHandler<FieldValues> = async (values) => {
    setLoading(true);
    setError("");
    try {
      const res = await userLogin(values);

      if (!res?.data) {
        setError("Email or Password is incorrect");
      }

      if (res?.data?.token) {
        toast.success(res?.message);
        storeUserInfo({ accessToken: res?.data?.token });
        router.push("/");
      } else {
        setError(res?.message);
      }
    } catch (err: any) {
      setError("Email or Password is incorrect");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = async (path: string) => {
    setNavigationLoading(true);
    router.push(path);
    setNavigationLoading(false);
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
              <Image
                src={assets.images.bloodLogo}
                width={50}
                height={50}
                alt="logo"
              />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Login Blood Donation App
              </Typography>
            </Box>
          </Stack>

          <Box>
            <PHForm onSubmit={handleLogin}>
              <Grid container spacing={2} my={1}>
                <Grid item md={6}>
                  <PHInput
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth={true}
                    error={!!errors.email}
                    helperText={errors.email?.message as string}
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth={true}
                    error={!!errors.password}
                    helperText={errors.password?.message as string}
                  />
                </Grid>
              </Grid>

              <Box
                sx={{
                  width: "100%",
                  textAlign: "right",
                }}
              >
                <Typography
                  component="span"
                  onClick={() => handleNavigation("/forgot-password")}
                  sx={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "blue",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  {navigationLoading ? (
                    <CircularProgress size={16} />
                  ) : (
                    "Forgot Password?"
                  )}
                </Typography>
              </Box>

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
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Login"}
              </Button>

              <Typography component="p" fontWeight={300}>
                Don&apos;t have an account?{" "}
                <Typography
                  component="span"
                  onClick={() => handleNavigation("/register")}
                  sx={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "blue",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  {navigationLoading ? (
                    <CircularProgress size={16} />
                  ) : (
                    "Create an account"
                  )}
                </Typography>
              </Typography>
            </PHForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
