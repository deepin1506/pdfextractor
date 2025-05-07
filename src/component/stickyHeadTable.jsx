import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import DetailView from "./detailView";

const columns = [
  { id: "product", label: "Product Name", minWidth: 170 },
  {
    id: "descriptions",
    label: "Short Description",
    minWidth: 100,
    render: (row) => row.descriptions?.[0] || "-",
  },
  {
    id: "features",
    label: "Features",
    minWidth: 170,
    render: (row) => row.features?.slice(0, 2).join(", ") + "..." || "-",
  },
];

export default function StickyHeadTable({ rows }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleRowClick = async (row) => {
    try {
      const response = await fetch(
        "http://192.168.1.18:8000/api/datagetbyname",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product: row.product }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSelectedRow(data);
    } catch (error) {
      console.error("Error fetching row detail:", error);
    }
  };

  const handleBackClick = () => setSelectedRow(null);

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
        border: "1px solid #e0e0e0",
      }}
    >

      {selectedRow ? (
        <DetailView selectedRow={selectedRow} onBack={handleBackClick} />
      ) : (
        <>

          <TableContainer sx={{ maxHeight: 600 }}>

            <Table stickyHeader aria-label="sticky table">

              <TableHead>

                <TableRow>

                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{
                        minWidth: column.minWidth,
                        fontWeight: "bold",
                        backgroundColor: "#f5f5f5",
                        borderBottom: "1px solid #ddd",
                        textAlign: "left",
                        verticalAlign: "top",
                      }}
                    >
                                            {column.label}                   
                    </TableCell>
                  ))}

                </TableRow>

              </TableHead>

              <TableBody>

                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, idx) => (
                    <TableRow
                      hover
                      key={idx}
                      onClick={() => handleRowClick(row)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#f9f9f9",
                        },
                      }}
                    >

{columns.map((column) => (
  <TableCell
    key={column.id}
    sx={{
      textAlign: "left",
      verticalAlign: "top",
      whiteSpace: "normal",
      wordBreak: "break-word",
      borderBottom: "1px solid #eee",
    }}
  >
    {column.id === "product" ? (
      <span style={{ color: "#1976d2", textDecoration: "underline", fontWeight: 500 }}>
        {row[column.id]}
      </span>
    ) : column.render ? column.render(row) : row[column.id]}
  </TableCell>
))}

 

                    </TableRow>
                  ))}

              </TableBody>

            </Table>

          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

        </>
      )}

    </Paper>
  );
}

 