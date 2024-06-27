"use client";

import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import FilterDonors from "@/app/(withCommonLayout)/components/FilterDonors";
import { Container, Typography } from "@mui/material";

const FilterWithBloodGroups = () => {
  const [value, setValue] = React.useState("A_POSITIVE");
  const router = useRouter();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const bloodType = searchParams.get("bloodType");
    if (bloodType) {
      setValue(bloodType);
    }
  }, [searchParams]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(`/donors?bloodType=${newValue}`);
  };

  const data = [
    { id: 1, title: "A_POSITIVE" },
    { id: 2, title: "A_NEGATIVE" },
    { id: 3, title: "B_POSITIVE" },
    { id: 4, title: "B_NEGATIVE" },
    { id: 5, title: "AB_POSITIVE" },
    { id: 6, title: "AB_NEGATIVE" },
    { id: 7, title: "O_POSITIVE" },
    { id: 8, title: "O_NEGATIVE" },
  ];

  return (
    <>
      <Container>
        <Box
          sx={{
            mt: 2,
            p: 3,
            maxWidth: "100%",
            bgcolor: "background.paper",
            mx: "auto",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              component="h3"
              variant="h5"
              color="text.primary"
              gutterBottom
            >
              Search Donors by Blood Group
            </Typography>
          </Box>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {data.map((bloodT) => (
              <Tab
                key={bloodT.id}
                label={bloodT.title}
                value={bloodT.title}
                sx={{ fontWeight: 600 }}
              />
            ))}
          </Tabs>
        </Box>
      </Container>
      {/* <FilterDonors /> */}
    </>
  );
};

export default FilterWithBloodGroups;
