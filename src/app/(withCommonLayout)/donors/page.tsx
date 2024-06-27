// "use client";

// import {
//   Box,
//   Button,
//   Container,
//   Grid,
//   Stack,
//   Tab,
//   Tabs,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useGetAllDonorsQuery } from "@/redux/api/donorApi";
// import { useDebounced } from "@/redux/hooks";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { MetaType } from "@/types";
// import DonorCard from "@/components/UI/Donor/DonorCard";
// import FilterWithBloodGroups from "@/components/UI/Donor/FilterWIthBloodGroups";
// import { useRouter, useSearchParams } from "next/navigation";

// const Donors = () => {
//   // Pagination state
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);

//   const query: Record<string, any> = {
//     page,
//     limit: pageSize,
//   };
//   const [searchTerm, setSearchTerm] = useState<string>("");

//   const debouncedTerm = useDebounced({
//     searchQuery: searchTerm,
//     delay: 600,
//   });

//   if (!!debouncedTerm) {
//     query["searchTerm"] = searchTerm;
//   }

//   // const { data, isLoading } = useGetAllDonorsQuery({ ...query });

//   /////////////////////////////////////////////////////////////////////////

//   const [value, setValue] = React.useState("A_POSITIVE");
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   React.useEffect(() => {
//     const bloodType = searchParams.get("bloodType");
//     if (bloodType) {
//       setValue(bloodType);
//     }
//   }, [searchParams]);

//   const handleChange = (event: React.SyntheticEvent, newValue: string) => {
//     setValue(newValue);
//     router.push(`/donors?bloodType=${newValue}`);
//   };

//   const data = [
//     { id: 1, title: "A_POSITIVE" },
//     { id: 2, title: "A_NEGATIVE" },
//     { id: 3, title: "B_POSITIVE" },
//     { id: 4, title: "B_NEGATIVE" },
//     { id: 5, title: "AB_POSITIVE" },
//     { id: 6, title: "AB_NEGATIVE" },
//     { id: 7, title: "O_POSITIVE" },
//     { id: 8, title: "O_NEGATIVE" },
//   ];

//   // const searchParams = useSearchParams();
//   const bloodType = searchParams.get("bloodType");

//   const [donors, setDonors] = useState<any>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchDonors = async () => {
//       let res;
//       if (bloodType) {
//         setIsLoading(true);
//         try {
//           res = await fetch(
//             `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/donor-list?bloodType=${bloodType}`
//           );
//           const data = await res.json();
//           setDonors(data);
//         } catch (error) {
//           console.error("Error fetching donors:", error);
//         } finally {
//           setIsLoading(false);
//         }
//       } else {
//         try {
//           res = await fetch(
//             `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/donor-list?${searchTerm}=${searchTerm}`
//           );
//           const data = await res.json();
//           setDonors(data);
//         } catch (error) {
//           console.error("Error fetching donors:", error);
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };

//     fetchDonors();
//   }, [bloodType, searchTerm]);

//   ////////////////////////////////////////////////////////////////////////

//   console.log("New Donors = ", donors);

//   const allDonors = donors?.data || [];
//   const meta: MetaType = donors?.meta || {};

//   console.log("All Donors = ", allDonors);

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//   };

//   const renderPageNumbers = () => {
//     if (!meta || !("total" in meta)) {
//       return null;
//     }
//     const totalPages = Math.ceil(((meta?.total || 0) as number) / pageSize);
//     const pageNumbers = [];

//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(
//         <Button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           variant={i === page ? "contained" : "outlined"}
//         >
//           {i}
//         </Button>
//       );
//     }

//     return pageNumbers;
//   };

//   return (
//     <>
//       <Box>
//         <Box
//           sx={{
//             mt: 2,
//             p: 3,
//             maxWidth: "100%",
//             bgcolor: "background.paper",
//             mx: "auto",
//           }}
//         >
//           <Box sx={{ textAlign: "center" }}>
//             <Typography
//               component="h3"
//               variant="h5"
//               color="text.primary"
//               gutterBottom
//             >
//               Search Donors by Blood Group
//             </Typography>
//           </Box>
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             variant="scrollable"
//             scrollButtons="auto"
//             aria-label="scrollable auto tabs example"
//           >
//             {data.map((bloodT) => (
//               <Tab
//                 key={bloodT.id}
//                 label={bloodT.title}
//                 value={bloodT.title}
//                 sx={{ fontWeight: 600 }}
//               />
//             ))}
//           </Tabs>
//         </Box>
//       </Box>
//       {/* <FilterWithBloodGroups /> */}
//       <Container>
//         <Box>
//           <Stack
//             direction="row"
//             justifyContent="space-between"
//             alignItems="right"
//           >
//             <TextField
//               fullWidth
//               sx={{ mt: 3 }}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search Donors by Name, Email, Location, City, etc."
//             />
//           </Stack>
//           {!isLoading ? (
//             <Box sx={{ mt: 2, p: 3, bgcolor: "secondary.light" }}>
//               <Grid container spacing={3}>
//                 {allDonors?.map((donor: any) => (
//                   <Grid item key={donor.id} xs={12} sm={6} md={4}>
//                     <DonorCard donor={donor} />
//                   </Grid>
//                 ))}
//               </Grid>
//             </Box>
//           ) : (
//             <h1>Loading.....</h1>
//           )}
//           <Box
//             my={5}
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             flexWrap="wrap"
//           >
//             <Button
//               variant="contained"
//               onClick={() => handlePageChange(page - 1)}
//               disabled={page === 1}
//             >
//               <ArrowBackIosIcon />
//             </Button>
//             {renderPageNumbers()}
//             <Button
//               variant="contained"
//               onClick={() => handlePageChange(page + 1)}
//               disabled={page === Math.ceil((meta?.total as number) / pageSize)}
//             >
//               <ArrowForwardIosIcon />
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default Donors;

///testing

"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDebounced } from "@/redux/hooks";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { MetaType } from "@/types";
import DonorCard from "@/components/UI/Donor/DonorCard";
import { useRouter, useSearchParams } from "next/navigation";

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
    query["searchTerm"] = debouncedTerm;
  }

  /////////////////////////////////////////////////////////////////////////

  const [value, setValue] = useState("A_POSITIVE");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const bloodType = searchParams.get("bloodType");
    if (bloodType) {
      setValue(bloodType);
    }
  }, [searchParams]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(`/donors?bloodType=${newValue}`);
  };

  const bloodGroupData = [
    { id: 1, title: "A_POSITIVE" },
    { id: 2, title: "A_NEGATIVE" },
    { id: 3, title: "B_POSITIVE" },
    { id: 4, title: "B_NEGATIVE" },
    { id: 5, title: "AB_POSITIVE" },
    { id: 6, title: "AB_NEGATIVE" },
    { id: 7, title: "O_POSITIVE" },
    { id: 8, title: "O_NEGATIVE" },
  ];

  const bloodType = searchParams.get("bloodType");

  const [donors, setDonors] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDonors = async () => {
      setIsLoading(true);
      let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/donor-list`;

      if (bloodType) {
        url += `?bloodType=${bloodType}`;
      } else if (debouncedTerm) {
        url += `?searchTerm=${debouncedTerm}&page=${page}&limit=${pageSize}`;
      } else {
        url += `?page=${page}&limit=${pageSize}`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();
        setDonors(data);
      } catch (error) {
        console.error("Error fetching donors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonors();
  }, [bloodType, debouncedTerm, page, pageSize]);

  ////////////////////////////////////////////////////////////////////////

  // console.log("New Donors = ", donors);
  if (isLoading) {
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

  const allDonors = donors?.data || [];
  const meta: MetaType = donors?.meta || {};

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

  // console.log("All Donors = ", allDonors);

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
    <>
      <Container>
        <Box>
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
            <Box
              sx={{
                mt: 2,
                p: 3,
                maxWidth: "100%",
                bgcolor: "background.paper",
                mx: "auto",
                textAlign: "center",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {bloodGroupData.map((bloodT) => (
                  <Tab
                    key={bloodT.id}
                    label={bloodT.title}
                    value={bloodT.title}
                    sx={{ fontWeight: 600 }}
                  />
                ))}
              </Tabs>
            </Box>
          </Box>
        </Box>
        {/* <Container> */}
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
            <Box>
              <Box sx={{ mt: 2, p: 3, bgcolor: "secondary.light" }}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    component="h3"
                    variant="h5"
                    color="text.primary"
                    gutterBottom
                  >
                    {donors?.meta?.total} {bloodType} Donors are available. You
                    can make a request.
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 2, p: 3, bgcolor: "secondary.light" }}>
                <Grid container spacing={3}>
                  {allDonors?.map((donor: any) => (
                    <Grid item key={donor.id} xs={12} sm={6} md={4}>
                      <DonorCard donor={donor} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <CircularProgress />
            </Box>
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
    </>
  );
};

export default Donors;
