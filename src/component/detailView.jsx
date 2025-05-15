import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  List,
  ListItem,
  Divider,
  Breadcrumbs,
  Link,
  CircularProgress,
  LinearProgress,
  Skeleton,
  Tooltip,
} from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import DownloadIcon from '@mui/icons-material/Download';

export default function DetailView({ selectedRow, onBack }) {
  const [translatedData, setTranslatedData] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!selectedRow) return null;
  // const originalData = selectedRow[0];
  const rowData = selectedRow[0];
  const originalData = [rowData];
  const handleTranslate = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        // "http://127.0.0.1:8000/api/datatranslation",
        "https://pdfextractor-bknd-v1-2.onrender.com/api/datatranslation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(originalData),
        }
      );
      const result = await response.json();
      console.log("result", result);
      setTranslatedData(result);
    } catch (error) {
      console.error("Translation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (rowData) => {
    // console.log(row)
    const jsonStr = JSON.stringify(rowData, null, 2); // pretty-print JSON
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${rowData.product || 'data'}.json`; // fallback filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // cleanup
  };

  const renderDataSection = (data, title) => {
    if (!data) return null;
    console.log("dm data =>", data);
    return (
      <Box sx={{ flex: 1, px: 2 }}>
        {/* <Typography fontWeight={"bold"} variant="h5" gutterBottom>
          {title}
        </Typography> */}

        <Box sx={{ minWidth: 150, maxWidth: 200 }}>
          <Typography fontWeight={"bold"} variant="subtitle1">
            Product#:
          </Typography>
          <div style={{ paddingTop: "8px", paddingBottom: "8px" }}>
            {data.productnumber ? data.productnumber : "N/A"}
          </div>
        </Box>
        <Divider />
        <Box sx={{ minWidth: 150, maxWidth: 200 }}>
          <Typography fontWeight={"bold"} variant="subtitle1">
            Product Name:
          </Typography>
          <div style={{ paddingTop: "8px", paddingBottom: "8px" }}>
            {data.product ? data.product : "N/A"}
          </div>
        </Box>
        <Divider />
        <Box sx={{ minWidth: 150, maxWidth: 200 }}>
          <Typography fontWeight={"bold"} variant="subtitle1">
            Product Brand:
          </Typography>
          <div style={{ paddingTop: "8px", paddingBottom: "8px" }}>
            {data.brand ? data.brand : "N/A"}
          </div>
        </Box>
        <Divider />

        {data.descriptions?.length > 0 && (
          <>
            <Typography fontWeight={"bold"} variant="subtitle1">
              Description:
            </Typography>

            <List>
              {data.descriptions.map((desc, i) => (
                <ListItem key={i} sx={{ pl: 2 }}>
                  {desc}
                </ListItem>
              ))}
            </List>
            <Divider />
          </>
        )}

        {data.features?.length > 0 && (
          <>
            <Typography fontWeight={"bold"} variant="subtitle1">
              Features:
            </Typography>

            <ul style={{ paddingLeft: "1.5rem", marginTop: 0 }}>
              {data.features.map((f, i) => (
                <li key={i} style={{ marginBottom: "0.5rem" }}>
                  <Typography variant="body2" component="span">
                    {f}
                  </Typography>
                </li>
              ))}
            </ul>
            <Divider />
          </>
        )}

        {data.others?.length > 0 && (
          <>
            <Typography fontWeight={"bold"} variant="subtitle1">
              Other Info:
            </Typography>

            <List>
              {data.others.map((o, i) => (
                <ListItem key={i} sx={{ pl: 2 }}>
                  {o}
                </ListItem>
              ))}
            </List>
          </>
        )}

        {data.tables?.map((table, tIdx) => (
          <Box key={tIdx} sx={{ mb: 2 }}>
            <Typography fontWeight={"bold"} variant="subtitle1" gutterBottom>
              Specification:
            </Typography>

            <TableContainer sx={{ border: "1px solid #ccc", borderRadius: 1 }}>
              <Table
                size="small"
                sx={{
                  minWidth: 300,
                  borderCollapse: "collapse",
                }}
              >
                <TableBody>
                  {table.map((row, rIdx) => (
                    <TableRow
                      key={rIdx}
                      sx={{ borderBottom: "1px solid #ddd" }}
                    >
                      {row.map((cell, cIdx) => (
                        <TableCell
                          key={cIdx}
                          sx={{
                            border: "1px solid #ccc",
                            textAlign: "justify",
                            verticalAlign: "top",
                            px: 2,
                            py: 1,
                          }}
                        >
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3, boxShadow: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            underline="hover"
            color="inherit"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
          >
            Products
          </Link>
          <Typography color="text.primary">{rowData.product}</Typography>
        </Breadcrumbs>
        <Tooltip title="Translate to Thai">
          <Button
            variant="outlined"
            onClick={handleTranslate}
            disabled={loading}
            style={{ marginLeft: "500px", fontSize: 12 }}
          >
            {loading ? <CircularProgress size={20} /> : "Translate"}
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0GUdVA-xvlpyTWlcAZYHuK1QmuPnnLzQUmK9Ppq0IGocU6SfuAP8preBl_lpM6VCDX0g&usqp=CAU"
              alt="flag"
              style={{ height: 20, background: "white" }}
            />
          </Button>
        </Tooltip>
        <Tooltip title="Download JSON">

          <Button variant="outlined" style={{ fontSize: 12 }} onClick={(e) => {
            // e.stopPropagation();
            handleDownload(rowData);
          }}>
            Download
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/free-json-file-icon-download-in-svg-png-gif-formats--format-website-pack-files-folders-icons-504451.png"
              alt="JSON"
              style={{ height: 15, background: "white" }}
            />
          </Button>
        </Tooltip>
      </Box>
      {loading && <LinearProgress />}
      <Box display="flex" flexDirection={"row"} alignItems="center">
        {rowData.url && (
          <img
            src={rowData.url}
            alt={rowData.product}
            style={{
              height: "100px",
              borderRadius: 8,
              margin: "16px",
              width: "100px",
            }}
          />
        )}
        <Typography fontWeight="bold" variant="h6">
          {rowData.product}
        </Typography>
      </Box>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
        {renderDataSection(rowData, translatedData ? "English" : null)}
        {translatedData && (
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", md: "block" } }}
          />
        )}

        {loading && !translatedData ? (
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Translating
            </Typography>
            <Skeleton variant="rectangular" height={180} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="rectangular" height={180} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="rectangular" height={180} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="rectangular" height={120} sx={{ mt: 2 }} />
            <Skeleton variant="rectangular" height={120} sx={{ mt: 2 }} />
          </Box>
        ) : (
          translatedData && renderDataSection(translatedData[0], "Thai")
        )}
      </Box>
    </Box>
  );
}
