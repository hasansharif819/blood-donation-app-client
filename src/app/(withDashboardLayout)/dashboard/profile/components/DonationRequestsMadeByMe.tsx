// "use client";

// import { useDonationRequestsMadeByMeQuery } from "@/redux/api/myProfile";
// import {
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   Container,
//   Grid,
//   Typography,
// } from "@mui/material";
// import { useState } from "react";
// import ModeEditIcon from "@mui/icons-material/ModeEdit";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import { miniSerializeError } from "@reduxjs/toolkit";
// import { toast } from "sonner";
// import UpdateRequestMadeByMeModal from "./updateRequestMadeByMeModal";
// import { useDeleteMyRequestMutation } from "@/redux/api/requestApi";

// const DonationRequestsMadeByMe = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedId, setSelectedId] = useState<string | null>(null);
//   const { data, isLoading } = useDonationRequestsMadeByMeQuery({});
//   const [deleteMyRequest] = useDeleteMyRequestMutation();

//   if (isLoading) {
//     <p>Loading...</p>;
//   }

//   const handleOpenModal = (id: string) => {
//     setSelectedId(id);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (id: string) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this request?"
//     );
//     if (!confirmed) return;
//     try {
//       const result = await deleteMyRequest(id);
//       if (result) {
//         toast.success("Request deleted successfully");
//       }
//     } catch (error) {
//       toast.error("Failed to delete request");
//     }
//   };
//   return (
//     <>
//       {isModalOpen && selectedId && (
//         <UpdateRequestMadeByMeModal
//           data={data}
//           open={isModalOpen}
//           setOpen={setIsModalOpen}
//           id={selectedId}
//         />
//       )}
//       <Container>
//         <Typography
//           variant="h3"
//           sx={{
//             mt: 5,
//             mb: 3,
//             textAlign: "center",
//             fontSize: {
//               xs: "20px",
//               sm: "20px",
//               md: "24px",
//               lg: "32px",
//             },
//             color: "primary.main"
//           }}
//         >
//           Donation Requests Made By Me
//         </Typography>
//         <Grid container spacing={3}>
//           {data?.map((item: any) => (
//             <Grid item xs={12} sm={6} md={4} key={item.id}>
//               <Card
//                 sx={{
//                   minHeight: 350,
//                   position: "relative",
//                   textAlign: "center",
//                 }}
//               >
//                 <CardContent>
//                   <Typography gutterBottom component="h5">
//                     Donor Name: {item?.donor?.name}
//                   </Typography>
//                   <Typography gutterBottom component="h5">
//                     Blood Group: {item?.bloodType}
//                   </Typography>
//                   <Typography gutterBottom component="p">
//                     Status: {item?.requestStatus}
//                   </Typography>
//                   <Typography gutterBottom component="p">
//                     Hospital Name: {item?.hospitalName}
//                   </Typography>
//                   <Typography gutterBottom component="p">
//                     Hospital Address: {item?.hospitalAddress}
//                   </Typography>
//                   <Typography gutterBottom component="p">
//                     Reason: {item?.reason}
//                   </Typography>
//                   <Typography gutterBottom component="p">
//                     Date of Donation: {item?.dateOfDonation}
//                   </Typography>
//                 </CardContent>
//                 <CardActions
//                   sx={{
//                     position: "absolute",
//                     bottom: 0,
//                     display: "flex",
//                     flexDirection: {
//                       sm: "column",
//                       md: "column",
//                       lg: "row",
//                     },
//                   }}
//                 >
//                   <Button
//                     fullWidth
//                     endIcon={<ModeEditIcon />}
//                     onClick={() => handleOpenModal(item?.id)}
//                   >
//                     Update
//                   </Button>
//                   <Button
//                     color="error"
//                     onClick={() => handleDelete(item?.id)}
//                     endIcon={<DeleteForeverIcon />}
//                   >
//                     Delete
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </>
//   );
// };

// export default DonationRequestsMadeByMe;

///////////////////////////////////////////////////////////////////////////////

// "use client";

// import { useDonationRequestsMadeByMeQuery } from "@/redux/api/myProfile";
// import {
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   Container,
//   Grid,
//   Typography,
// } from "@mui/material";
// import { useState } from "react";
// import ModeEditIcon from "@mui/icons-material/ModeEdit";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import { toast } from "sonner";
// import UpdateRequestMadeByMeModal from "./updateRequestMadeByMeModal";
// import { useDeleteMyRequestMutation } from "@/redux/api/requestApi";

// const DonationRequestsMadeByMe = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedId, setSelectedId] = useState<string | null>(null);
//   const { data, isLoading } = useDonationRequestsMadeByMeQuery({});
//   const [deleteMyRequest] = useDeleteMyRequestMutation();

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   const handleOpenModal = (id: string) => {
//     setSelectedId(id);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (id: string) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this request?"
//     );
//     if (!confirmed) return;
//     try {
//       const result = await deleteMyRequest(id);
//       if (result) {
//         toast.success("Request deleted successfully");
//       }
//     } catch (error) {
//       toast.error("Failed to delete request");
//     }
//   };

//   return (
//     <>
//       {isModalOpen && selectedId && (
//         <UpdateRequestMadeByMeModal
//           data={data}
//           open={isModalOpen}
//           setOpen={setIsModalOpen}
//           id={selectedId}
//         />
//       )}
//       <Container>
//         <Typography
//           variant="h3"
//           sx={{
//             mt: 5,
//             mb: 3,
//             textAlign: "center",
//             fontSize: {
//               xs: "20px",
//               sm: "20px",
//               md: "24px",
//               lg: "32px",
//             },
//             color: "primary.main",
//           }}
//         >
//           Donation Requests Made By Me
//         </Typography>
//         <Grid container spacing={2}>
//           {data?.map((item: any) => (
//             <Grid item xs={12} sm={6} md={4} key={item.id}>
//               <Card
//                 sx={{
//                   minHeight: 350,
//                   padding: 0,
//                   position: "relative",
//                   textAlign: "center",
//                 }}
//               >
//                 <CardContent>
//                   <Typography gutterBottom component="h5">
//                     Donor Name: {item?.donor?.name}
//                   </Typography>
//                   <Typography gutterBottom component="h5">
//                     Blood Group: {item?.bloodType}
//                   </Typography>
//                   <Typography gutterBottom component="p">
//                     Status: {item?.requestStatus}
//                   </Typography>
//                   <Typography gutterBottom component="p">
//                     Hospital Name: {item?.hospitalName}
//                   </Typography>
//                   <Typography gutterBottom component="p">
//                     Hospital Address: {item?.hospitalAddress}
//                   </Typography>
//                   <Typography gutterBottom component="p">
//                     Reason: {item?.reason}
//                   </Typography>
//                   <Typography gutterBottom component="p">
//                     Date of Donation: {item?.dateOfDonation}
//                   </Typography>
//                 </CardContent>
//                 <CardActions
//                   sx={{
//                     position: "absolute",
//                     bottom: 0,
//                     width: "100%",
//                     display: "flex",
//                     flexDirection: {
//                       xs: "column",
//                       sm: "column",
//                       md: "row",
//                     },
//                     justifyContent: "center",
//                     gap: 1,
//                     pb: 2,
//                   }}
//                 >
//                   <Button
//                     fullWidth
//                     endIcon={<ModeEditIcon />}
//                     onClick={() => handleOpenModal(item?.id)}
//                   >
//                     Update
//                   </Button>
//                   <Button
//                     fullWidth
//                     color="error"
//                     onClick={() => handleDelete(item?.id)}
//                     endIcon={<DeleteForeverIcon />}
//                   >
//                     Delete
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </>
//   );
// };

// export default DonationRequestsMadeByMe;

////////////////////////////////////////////////////////////////////////

"use client";

import { useDonationRequestsMadeByMeQuery } from "@/redux/api/myProfile";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { miniSerializeError } from "@reduxjs/toolkit";
import { toast } from "sonner";
import UpdateRequestMadeByMeModal from "./updateRequestMadeByMeModal";
import { useDeleteMyRequestMutation } from "@/redux/api/requestApi";

const DonationRequestsMadeByMe = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data, isLoading } = useDonationRequestsMadeByMeQuery({});
  const [deleteMyRequest] = useDeleteMyRequestMutation();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleOpenModal = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this request?"
    );
    if (!confirmed) return;
    try {
      const result = await deleteMyRequest(id);
      if (result) {
        toast.success("Request deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete request");
    }
  };

  return (
    <>
      {isModalOpen && selectedId && (
        <UpdateRequestMadeByMeModal
          data={data}
          open={isModalOpen}
          setOpen={setIsModalOpen}
          id={selectedId}
        />
      )}
      <Container sx={{ px: { xs: 1, sm: 1, md: 1 }, mx: "auto" }}>
        <Typography
          variant="h3"
          sx={{
            mt: 5,
            mb: 3,
            textAlign: "center",
            fontSize: {
              xs: "20px",
              sm: "20px",
              md: "24px",
              lg: "32px",
            },
            color: "primary.main",
          }}
        >
          Donation Requests Made By Me
        </Typography>
        <Grid container spacing={1}>
          {data?.map((item: any) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  minHeight: 350,
                  position: "relative",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  m: 1,
                }}
              >
                <CardContent>
                  <Typography gutterBottom component="h5">
                    Donor Name: {item?.donor?.name}
                  </Typography>
                  <Typography gutterBottom component="h5">
                    Blood Group: {item?.bloodType}
                  </Typography>
                  <Typography gutterBottom component="p">
                    Status: {item?.requestStatus}
                  </Typography>
                  <Typography gutterBottom component="p">
                    Hospital Name: {item?.hospitalName}
                  </Typography>
                  <Typography gutterBottom component="p">
                    Hospital Address: {item?.hospitalAddress}
                  </Typography>
                  <Typography gutterBottom component="p">
                    Reason: {item?.reason}
                  </Typography>
                  <Typography gutterBottom component="p">
                    Date of Donation: {item?.dateOfDonation}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      sm: "column",
                      md: "row",
                    },
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    fullWidth
                    endIcon={<ModeEditIcon />}
                    onClick={() => handleOpenModal(item?.id)}
                    sx={{ mb: { xs: 1, sm: 1, md: 0 } }} // Add margin bottom for small devices
                  >
                    Update
                  </Button>
                  <Button
                    fullWidth
                    color="error"
                    onClick={() => handleDelete(item?.id)}
                    endIcon={<DeleteForeverIcon />}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default DonationRequestsMadeByMe;
