import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DonorCard from "@/components/UI/Donor/DonorCard";
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import Link from "next/link";

const FilterDonors = () => {
  const searchParams = useSearchParams();
  const bloodType = searchParams.get("bloodType");

  const [donors, setDonors] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonors = async () => {
      let res;
      if (bloodType) {
        setLoading(true);
        try {
          res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users?bloodType=${bloodType}`
          );
          const data = await res.json();
          setDonors(data);
        } catch (error) {
          console.error("Error fetching donors:", error);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users`);
          const data = await res.json();
          setDonors(data);
        } catch (error) {
          console.error("Error fetching donors:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDonors();
  }, [bloodType]);

  if (loading) {
    return (
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (donors?.data?.length === 0) {
    return (
      <Container>
        <Box
          sx={{ mt: 2, p: 3, bgcolor: "secondary.light", textAlign: "center" }}
        >
          <Typography
            component="h3"
            variant="h5"
            color="text.primary"
            gutterBottom
          >
            Sorry...No donors found.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            component="h3"
            variant="h5"
            color="text.primary"
            gutterBottom
          >
            {donors?.meta?.total} {bloodType} Donors are available. You can make
            a request.
          </Typography>
        </Box>
        <Box sx={{ mt: 2, p: 3, bgcolor: "secondary.light" }}>
          <Grid container spacing={3}>
            {donors?.data?.map((donor: any) => (
              <Grid item key={donor.id} xs={12} sm={6} md={4}>
                <DonorCard donor={donor} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 2, p: 3, textAlign: "center" }}>
            <Link href="/donors" color="text.primary">
              <Button>See More</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default FilterDonors;
