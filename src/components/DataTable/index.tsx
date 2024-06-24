import {
  faListDots
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton, Modal } from "@mui/material";
import { ptBR } from "@mui/material/locale";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import SubmitPage from "src/pages/SubmitPage";
import "./styles.css";
import DashForm from "../DashForm";

const rows = [
  {
    id: 1,
    name: "Mona Lisa",
    status: "Approved",
    user: "Leonardo",
    date: "2024-01-01",
  },
  {
    id: 2,
    name: "The Starry Night",
    status: "Pending",
    user: "Vincent",
    date: "2024-02-01",
  },
  {
    id: 3,
    name: "The Persistence of Memory",
    status: "Rejected",
    user: "Salvador",
    date: "2024-03-01",
  },
  {
    id: 4,
    name: "The Scream",
    status: "Approved",
    user: "Edvard",
    date: "2024-04-01",
  },
  {
    id: 5,
    name: "Girl with a Pearl Earring",
    status: "Pending",
    user: "Johannes",
    date: "2024-05-01",
  },
  {
    id: 6,
    name: "Guernica",
    status: "Approved",
    user: "Pablo",
    date: "2024-06-01",
  },
  {
    id: 7,
    name: "The Birth of Venus",
    status: "Rejected",
    user: "Sandro",
    date: "2024-07-01",
  },
  {
    id: 8,
    name: "The Night Watch",
    status: "Pending",
    user: "Rembrandt",
    date: "2024-08-01",
  },
  {
    id: 9,
    name: "American Gothic",
    status: "Approved",
    user: "Grant",
    date: "2024-09-01",
  },
];

const theme = createTheme({}, ptBR);

export default function DataTable() {
  const [open, setOpen] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = React.useState<number | null>(null);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nome", flex: 2 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "user", headerName: "Usuário", flex: 1 },
    {
      field: "date",
      headerName: "Data de Submissão",
      type: "date",
      flex: 1,
      valueGetter: (params: any) => new Date(params.value),
    },
    {
      field: "options",
      headerName: "Opções",
      width: 100,
      renderCell: (params: any) => (
        <IconButton onClick={() => handleOpen(params.id)}>
          <FontAwesomeIcon
            icon={faListDots}
            style={{ fontSize: "0.9rem", cursor: "pointer" }}
          />
        </IconButton>
      ),
    },
  ];

  const handleOpen = (id: number) => {
    setSelectedRowId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRowId(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          className="data-grid"
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableColumnFilter
          disableColumnMenu
          disableRowSelectionOnClick
        />
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 600,
            bgcolor: "background.paper",
            overflowY: "scroll",
            p: 4,
            borderRadius: 6,
          }}
        >
          <DashForm/>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
