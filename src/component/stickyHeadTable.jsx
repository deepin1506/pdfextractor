import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  Tooltip,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DetailView from "./detailView";
import { useState } from "react";

const columns = [
  {
    id: "download",
    label: "Action",
    // minWidth: 50,
    width: 40,
    render: (row) => (
      <Tooltip title="Download JSON">
        <DownloadIcon
          variant="contained"
          size="small"
          color="primary"
          aria-label="download JSON"
          onClick={(e) => {
            e.stopPropagation();
            handleDownload(row);
          }}
        />
      </Tooltip>
    ),
  },
  {
    id: "thumbnail",
    label: "Thumbnail",
    minWidth: 100,
    render: (row) =>
      row.url ? (
        <img
          src={row.url}
          alt="Thumbnail"
          style={{
            width: 60,
            height: 60,
            objectFit: "contain",
            borderRadius: 4,
          }}
        />
      ) : (
        "N/A"
      ),
  },

  {
    id: "productnumber",
    label: "Product#",
    minWidth: 100,
    render: (row) => (row.productnumber ? row.productnumber : "N/A"),
  },
  { id: "product", label: "Product Name", minWidth: 170 },
  {
    id: "brand",
    label: "Brand",
    minWidth: 120,
    render: (row) => (row.brand ? row.brand : "N/A"),
  },
  {
    id: "descriptions",
    label: "Short Description",
    minWidth: 400,
    render: (row) => row.descriptions?.[0] || "-",
  },
  {
    id: "features",
    label: "Features",
    minWidth: 260,
    render: (row) => row.features?.slice(0, 2).join(", ") + "..." || "-",
  },
];

const handleDownload = (rowData) => {
  // console.log(row)
  const jsonStr = JSON.stringify(rowData, null, 2); // pretty-print JSON
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${rowData.product || "data"}.json`; // fallback filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url); // cleanup
};

export default function StickyHeadTable({ rows }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  console.log("dm rows =>", rows);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleRowClick = async (row) => {
    try {
      const response = await fetch(
        // "http://127.0.0.1:8000/api/datagetbyname",
        "https://pdfextractor-bknd-v1-2.onrender.com/api/datagetbyname",
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
          {/* <div style={{ height: '100vh', width: '100vw', padding: 16, boxSizing: 'border-box' }}> */}
          <TableContainer
            sx={{
              maxHeight: "80vh",
              overflowY: "auto",
              // width: "100vw", // Full viewport width
              padding: 2,
              boxSizing: "border-box",
            }}
          >
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
                            <span
                              style={{
                                color: "#1976d2",
                                textDecoration: "underline",
                                fontWeight: 500,
                              }}
                            >
                              {row[column.id]}
                            </span>
                          ) : column.render ? (
                            column.render(row)
                          ) : (
                            row[column.id]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* </div> */}
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
