"use client";

import { Box, Button, Container, Grid, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useGetAllDonorsQuery } from "@/redux/api/donorApi";
import { useDebounced } from "@/redux/hooks";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { MetaType } from "@/types";
import DonorCard from "@/components/UI/Donor/DonorCard";

const Donors = () => {
  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const query: Record<string, any> = {
    page,
    limit: pageSize,
  };
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useGetAllDonorsQuery({ ...query });

  const donors = data?.donors || [];
  const meta: MetaType = data?.meta || {};

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const renderPageNumbers = () => {
    if (!meta || !("total" in meta)) {
      return null;
    }
    const totalPages = Math.ceil(((meta?.total || 0) as number) / pageSize);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          variant={i === page ? "contained" : "outlined"}
        >
          {i}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <Container>
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="right"
        >
          <TextField
            fullWidth
            sx={{ mt: 3 }}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Donors by Name, Email, Location, City, etc."
          />
        </Stack>
        {!isLoading ? (
          <Box sx={{ mt: 2, p: 3, bgcolor: "secondary.light" }}>
            <Grid container spacing={3}>
              {donors.map((donor: any) => (
                <Grid item key={donor.id} xs={12} sm={6} md={4}>
                  <DonorCard donor={donor} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <h1>Loading.....</h1>
        )}
        <Box
          my={5}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
        >
          <Button
            variant="contained"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <ArrowBackIosIcon />
          </Button>
          {renderPageNumbers()}
          <Button
            variant="contained"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === Math.ceil((meta?.total as number) / pageSize)}
          >
            <ArrowForwardIosIcon />
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Donors;
