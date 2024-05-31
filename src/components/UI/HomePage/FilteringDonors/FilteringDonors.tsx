"use client";
import {
  TextField,
  Typography,
  Box,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useGetAllDonorsQuery } from "@/redux/api/donorApi";
import React, { useState, useEffect } from "react";
import DonorCard from "@/components/UI/Donor/DonorCard";
import { IDonor } from "@/types/donor";

const FilteringDonors: React.FC = () => {
  const [filteredDonors, setFilteredDonors] = useState<IDonor[]>([]);
  const [defaultLocation, setDefaultLocation] = useState("Dhaka");
  const [bloodType, setBloodType] = useState("");

  const { data, isLoading } = useGetAllDonorsQuery({});

  useEffect(() => {
    if (data && data.donors) {
      filterDonors(defaultLocation, bloodType);
    }
  }, [data, defaultLocation, bloodType]);

  const filterDonors = (location: string, bloodType: string) => {
    const filtered = data?.donors?.filter((donor: any) => {
      const matchesLocation = donor.location
        .toLowerCase()
        .includes(location.toLowerCase());
      const matchesBloodType = bloodType ? donor.bloodType === bloodType : true;
      return matchesLocation && matchesBloodType;
    });
    setFilteredDonors(filtered || []);
  };

  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(to bottom, tomato, #ffffff)",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{ textAlign: "center", margin: "20px auto" }}
        >
          Filtered Donors
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            width: "80%",
            margin: "0 auto",
          }}
        >
          <FormControl sx={{ width: "45%" }}>
            <InputLabel>Blood Type</InputLabel>
            <Select
              value={bloodType}
              label="Blood Type"
              onChange={(e) => setBloodType(e.target.value)}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value={"A_POSITIVE"}>A+</MenuItem>
              <MenuItem value={"A_NEGATIVE"}>A-</MenuItem>
              <MenuItem value={"B_POSITIVE"}>B+</MenuItem>
              <MenuItem value={"B_NEGATIVE"}>B-</MenuItem>
              <MenuItem value={"AB_POSITIVE"}>AB+</MenuItem>
              <MenuItem value={"AB_NEGATIVE"}>AB-</MenuItem>
              <MenuItem value={"O_POSITIVE"}>O+</MenuItem>
              <MenuItem value={"O_NEGATIVE"}>O-</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="text"
            label="Enter location"
            variant="outlined"
            defaultValue={defaultLocation}
            onChange={(e) => setDefaultLocation(e.target.value)}
            sx={{
              width: "45%",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            margin: "0 auto",
            padding: 2,
            borderRadius: 8,
          }}
        >
          {filteredDonors?.slice(0, 9).map((donor) => (
            <DonorCard key={donor.id} donor={donor} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FilteringDonors;