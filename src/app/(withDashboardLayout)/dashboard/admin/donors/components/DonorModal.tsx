import { Button, Grid } from "@mui/material";
import { Role } from "@/types/common";
import { FieldValues } from "react-hook-form";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import PHSelectField from "@/components/Forms/PHSelectField";
import PHFullScreenModal from "@/components/Shared/PHModal/PHFullScreenModal";
import { useCreateDonorMutation } from "@/redux/api/donorApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { toast } from "sonner";
import { BloodGroups } from "@/types";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DonorModal = ({ open, setOpen }: TProps) => {
  const [createDonor] = useCreateDonorMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    values.age = Number(values.age);
    values.totalDonations = Number(values.totalDonations);
    try {
      const res = await createDonor(values).unwrap();
      if (res?.id) {
        toast.success("User created successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      toast.error("Failed to create user");
      console.error(err);
    }
  };

  const defaultValues = {
    name: "",
    email: "",
    password: "Admin123",
    bloodType: "",
    role: "ADMIN",
    totalDonations: 0,
    location: "",
    city: "",
    bio: "",
    age: 20,
    contactNumber: "",
    lastDonationDate: "",
  };

  return (
    <PHFullScreenModal open={open} setOpen={setOpen} title="Create User">
      <PHForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput name="name" label="Name" fullWidth={true} sx={{ mb: 2 }} />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="email"
              type="email"
              label="Email"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="password"
              type="password"
              label="Password"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHSelectField
              items={BloodGroups}
              name="bloodType"
              label="Blood Group"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="contactNumber"
              label="Contact Number"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="location"
              label="Location"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput name="city" label="City" fullWidth={true} sx={{ mb: 2 }} />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="totalDonations"
              type="number"
              label="Total Number of Donations"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHSelectField
              items={Role}
              name="role"
              label="Role"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="age"
              type="number"
              label="Age"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput name="bio" label="Bio" fullWidth={true} sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="lastDonationDate"
              label="Last Donation Date"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Button type="submit">Create</Button>
      </PHForm>
    </PHFullScreenModal>
  );
};

export default DonorModal;
