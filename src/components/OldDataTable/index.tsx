import { faListDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton, Modal } from "@mui/material";
import { ptBR } from "@mui/material/locale";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { DataTableContainer } from "./styles";
import "./styles.css";

const theme = createTheme({}, ptBR);

export default function DataTable({ data }) {
  const [open, setOpen] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = React.useState<number | null>(null);

  const statusColors: { [key: string]: string } = {
    Aprovada: "rgba(0, 128, 0, 0.3)",
    Pendente: "rgba(255, 255, 0, 0.3)",
    Rejeitada: "rgba(255, 0, 0, 0.3)",
  };

  const textColor: { [key: string]: string } = {
    Aprovada: "#006400",
    Pendente: "#FF8C00",
    Rejeitada: "#8B0000",
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nome", flex: 2 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params: any) => (
        <div
          style={{
            height: "100%",
            alignItems: "center",
            width: "100%",
            display: "flex",
          }}
        >
          <div
            style={{
              backgroundColor: statusColors[params.value],
              color: textColor[params.value],
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              width: "4.6rem",
              height: "1.6rem",
            }}
          >
            {params.value}
          </div>
        </div>
      ),
    },
    { field: "user", headerName: "Usuário", flex: 1 },
    {
      field: "date",
      headerName: "Data de Submissão",
      type: "date",
      flex: 1,
      valueGetter: (params: any) => new Date(params),
      valueFormatter: (params: any) =>
        new Date(params).toLocaleDateString("pt-BR"),
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <p style={{ fontSize: "0.9rem" }}>
            {params.value.toLocaleDateString("pt-BR")}
          </p>
        </div>
      ),
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
      <DataTableContainer>
        <DataGrid
          className="data-grid"
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          disableColumnFilter
          disableColumnMenu
          disableRowSelectionOnClick
        />
      </DataTableContainer>
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
          <p>Test</p>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
