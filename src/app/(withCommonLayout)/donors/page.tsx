"use client";

import DonorCard from "@/components/UI/Donor/DonorCard";
import { useGetAllDonorsQuery } from "@/redux/api/donorApi";
import { useDebounced } from "@/redux/hooks";
import {
  Box,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Donors = () => {
  //////////////////////////////////////

  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  // console.log(searchTerm);

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useGetAllDonorsQuery({ ...query });

  const donors = data?.donors;
  const meta = data?.meta;

  ///////////////////////////////////////

  return (
    <Container>
      {/* <DashedLine /> */}
      <Stack direction="row" justifyContent="space-between" alignItems="right">
        <TextField
          fullWidth
          sx={{ mt: 3 }}
          onChange={(e) => setSearchTerm(e.target.value)}
          // size="small"
          placeholder="Search Donors with Name or Email, Location or City"
        />
      </Stack>

      <Box sx={{ mt: 2, p: 3, bgcolor: "secondary.light" }}>
        <Grid container spacing={3}>
          {donors?.map((donor: any, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={donor.id}>
              <DonorCard donor={donor} />
            </Grid>
          ))}
        </Grid>

        {donors?.length === 0 && (
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography>No Donors Found With This Name</Typography>
          </Box>
        )}
      </Box>
      {/* <DashedLine /> */}
    </Container>
  );
};

export default Donors;
