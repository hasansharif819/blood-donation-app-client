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
  const [name, setName] = useState("");

  const { data, isLoading } = useGetAllDonorsQuery({});

  useEffect(() => {
    if (data && data.donors) {
      filterDonors(defaultLocation, bloodType, name);
    }
  }, [data, defaultLocation, bloodType, name]);

  const filterDonors = (location: string, bloodType: string, name: string) => {
    const filtered = data?.donors?.filter((donor: any) => {
      const matchesLocation = donor.location
        .toLowerCase()
        .includes(location.toLowerCase());
      const matchesBloodType = bloodType ? donor.bloodType === bloodType : true;
      const matchesName = name
        ? donor.name.toLowerCase().includes(name.toLowerCase())
        : true;
      return matchesLocation && matchesBloodType && matchesName;
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
          variant="h3"
          color={"white"}
          textAlign={"center"}
          sx={{
            textAlign: "center",
            margin: "20px auto",
            fontSize: {
              xs: "32px",
              sm: "32px",
              md: "32px",
              lg: "48px",
            },
          }}
        >
          Filtered Donors
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            margin: "0 auto",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "column",
              lg: "row",
            },
            width: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "80%",
            },
          }}
        >
          <FormControl sx={{ width: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "30%",
            }, marginBottom: 2 }}>
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
            label="Enter name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "100%",
                lg: "30%",
              }, marginBottom: 2
            }}
          />
          <TextField
            type="text"
            label="Enter location"
            variant="outlined"
            defaultValue={defaultLocation}
            onChange={(e) => setDefaultLocation(e.target.value)}
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "100%",
                lg: "30%",
              }, marginBottom: 5
            }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "repeat(auto-fill, minmax(250px, 1fr))",
              sm: "repeat(auto-fill, minmax(300px, 1fr))",
              md: "repeat(auto-fill, minmax(300px, 1fr))",
            },
            margin: "0 auto",
            padding: 2,
            borderRadius: 8,
          }}
        >
          {filteredDonors?.map((donor) => (
            <DonorCard key={donor.id} donor={donor} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FilteringDonors;
