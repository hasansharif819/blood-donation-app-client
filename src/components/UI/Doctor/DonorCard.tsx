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
import Image from "next/image";
import Link from "next/link";

const DonorCard = ({ donor }: any) => {
  // console.log("donor = ", donor);
  const placeholder =
    "https://static.vecteezy.com/system/resources/thumbnails/026/489/224/small_2x/muslim-malay-woman-doctor-in-hospital-with-copy-space-ai-generated-photo.jpg";

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={donor?.profilePicture ? donor.profilePicture : placeholder}
      />
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
