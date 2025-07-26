import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const DonorCard = ({ donor }: any) => {
  const profileExists = !!donor?.profilePicture;
  const initials = donor?.name
    ? donor.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "NA";

  return (
    <Card
      sx={{
        maxWidth: 350,
        pt: 8,
        px: 2,
        position: "relative",
        textAlign: "center",
        overflow: "visible",
        boxShadow: 4,
        borderRadius: 4,
        marginTop: 6,
        "&:hover": {
          boxShadow: 8,
          transform: "scale(1.02)",
        },
      }}
    >
      {/* Avatar with image or initials */}
      <Box
        sx={{
          position: "absolute",
          top: -50,
          left: "50%",
          transform: "translateX(-50%)",
          border: "4px solid white",
          borderRadius: "50%",
          width: 100,
          height: 100,
          zIndex: 10,
          backgroundColor: "#f5f5f5",
        }}
      >
        {profileExists ? (
          <Avatar
            alt="Donor"
            src={donor.profilePicture}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            imgProps={{
              loading: "lazy",
            }}
          />
        ) : (
          <Avatar
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "primary.main",
              fontSize: 28,
            }}
          >
            {initials}
          </Avatar>
        )}
      </Box>

      <CardContent sx={{ textAlign: "center", px: 3, pt: 0 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {donor?.name}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          justifyContent="center"
          mt={1}
        >
          <LocationOnIcon fontSize="small" color="action" />
          <Typography variant="body2" noWrap>
            {donor?.location}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
          mt={2}
          flexWrap="wrap"
        >
          <Chip
            icon={<BloodtypeIcon />}
            label={`Blood: ${donor?.bloodType}`}
            color="error"
            variant="outlined"
          />
          <Chip
            icon={<CheckCircleIcon />}
            label={donor?.status}
            color={donor?.status === "ACTIVE" ? "success" : "default"}
            variant="outlined"
          />
        </Stack>

        <Typography variant="body2" mt={2}>
          Total Donations:{" "}
          <Typography component="span" fontWeight="bold">
            {donor?.totalDonations || 0} Times
          </Typography>
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "center", pb: 3 }}>
        <Button
          size="small"
          component={Link}
          href={`/donors/${donor?.id}`}
          variant="contained"
          color="primary"
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default DonorCard;
