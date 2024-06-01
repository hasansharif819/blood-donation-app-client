"use client";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  useDeleteDonorMutation,
  useGetAllDonorsQuery,
} from "@/redux/api/donorApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDebounced } from "@/redux/hooks";
import { toast } from "sonner";
import EditIcon from "@mui/icons-material/Edit";
import DonorModal from "./DonorModal";
import UpdateDonorModal from "./UpdateDonorModal";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { MetaType } from "@/types";

const DonorPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedDonorId, setSelectedDonorId] = useState<string>("");

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
  const [deleteDonor] = useDeleteDonorMutation();

  const donors = data?.donors || [];
  const meta: MetaType = data?.meta || {};

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this request?"
    );
    if (!confirmed) return;
    try {
      const res = await deleteDonor(id).unwrap();
      if (res?.id) {
        toast.success("Donor deleted successfully!!!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "bloodType", headerName: "Blood Type", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
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

            <IconButton
              onClick={() => {
                setSelectedDonorId(row.id);
                setIsUpdateModalOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

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
      <UpdateDonorModal
        open={isUpdateModalOpen}
        setOpen={setIsUpdateModalOpen}
        id={selectedDonorId}
      />

      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
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
            <DataGrid rows={donors} columns={columns} hideFooter={true} />
          </Box>
        ) : (
          <h1>Loading.....</h1>
        )}
        <Box
          mt={2}
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
    </>
  );
};

export default DonorPage;
