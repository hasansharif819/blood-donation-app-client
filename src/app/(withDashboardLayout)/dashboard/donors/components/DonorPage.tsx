"use client";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import {
  useDeleteDonorMutation,
  useGetAllDonorsQuery,
} from "@/redux/api/donorApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDebounced } from "@/redux/hooks";
import { toast } from "sonner";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import DonorModal from "./DonorModal";

const DonorPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useGetAllDonorsQuery({ ...query });
  const [deleteDonor] = useDeleteDonorMutation();

  const donors = data?.donors;
  const meta = data?.meta;

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteDonor(id).unwrap();
      if (res?.id) {
        toast.success("Donor deleted successfully!!!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "bloodType", headerName: "Blood Type", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "totalDonations", headerName: "Total Donations", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box>
            <IconButton
              onClick={() => handleDelete(row.id)}
              aria-label="delete"
            >
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
            <Link href={`/dashboard/admin/donors/edit/${row.id}`}>
              <IconButton aria-label="delete">
                <EditIcon />
              </IconButton>
            </Link>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={() => setIsModalOpen(true)}>Create New User</Button>
        <DonorModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Donors"
        />
      </Stack>
      {!isLoading ? (
        <Box my={2}>
          <DataGrid rows={donors} columns={columns} />
        </Box>
      ) : (
        <h1>Loading.....</h1>
      )}
    </Box>
  );
};

export default DonorPage;
