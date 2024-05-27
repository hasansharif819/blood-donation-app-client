"use client";

import { useGetMyDonationRequestsMadeByUserQuery } from "@/redux/api/myProfile";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import UpdateRequestStatusModal from "./UpdateRequestStatus";
import { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const MyDonationRequests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data, isLoading } = useGetMyDonationRequestsMadeByUserQuery({});

  if (isLoading) {
    <p>Loading...</p>;
  }

  const handleOpenModal = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };
  return (
    <>
      {isModalOpen && selectedId && (
        <UpdateRequestStatusModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          id={selectedId}
        />
      )}
      <Container>
        <Typography variant="h3" sx={{ mt: 5, mb: 3, textAlign: "center" }}>
          My Donation Requests
        </Typography>
        <Grid container spacing={3}>
          {data?.map((item: any) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardContent>
                  <Typography gutterBottom component="p">
                    Requester Name: {item?.requester?.name}
                  </Typography>
                  <Typography gutterBottom component="p">
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
                <CardActions>
                  <div>
                    <Button
                      fullWidth
                      endIcon={<ModeEditIcon />}
                      onClick={() => handleOpenModal(item?.id)}
                    >
                      Request Update
                    </Button>
                  </div>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default MyDonationRequests;
