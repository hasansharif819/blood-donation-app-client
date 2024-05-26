// import { Doctor } from "@/types/doctor";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

const DonorCard = ({ donor }: any) => {
  // console.log("donor = ", donor);
  const avatar = "https://i.ibb.co/Xy3r8MX/avatar.png";

  return (
    <Card sx={{ maxWidth: 345, maxHeight: 580 }}>
      <CardMedia
        component="img"
        alt="Donor Image"
        height="140"
        image={donor?.profilePicture ? donor.profilePicture : avatar}
        style={{ objectFit: "cover", height: 300 }}
      />
      {/* <Box> */}
      {/* <Image
        src={donor?.profilePicture ? donor?.profilePicture : avatar}
        alt="donor image"
        width={0}
        height={0}
        style={{
          height: "240px",
          width: "100%",
          aspectRatio: "16/9",
          objectFit: "cover",
        }}
      /> */}
      {/* </Box> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="p">
          Name: {donor?.name}
        </Typography>
        <Typography gutterBottom component="p">
          Email: {donor?.email}
        </Typography>
        <Typography gutterBottom component="p">
          Blood Group: {donor?.bloodType}
        </Typography>
        <Typography gutterBottom component="p">
          Location: {donor?.location}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} href={`/donors/${donor.id}`}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default DonorCard;
