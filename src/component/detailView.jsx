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
} from "@mui/material";
import { NavigateNext } from "@mui/icons-material";

export default function DetailView({ selectedRow, onBack }) {
  const [translatedData, setTranslatedData] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!selectedRow) return null;
  const originalData = selectedRow[0];

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/datatranslation",
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

  const renderDataSection = (data, title) => {
    if (!data) return null;

    return (
      <Box sx={{ flex: 1, px: 2 }}>
               
        <Typography variant="h6" gutterBottom>
                    {title}       
        </Typography>
               
        {data.image && (
          <Box sx={{ minWidth: 150, maxWidth: 200 }}>
                       
            <img
              src={data.image}
              alt={data.product}
              style={{ width: "100%", borderRadius: 8 }}
            />
                     
          </Box>
        )}
               
        {data.descriptions?.length > 0 && (
          <>
                       
            <Typography variant="subtitle1">Descriptions:</Typography>         
             
            <List>
                           
              {data.descriptions.map((desc, i) => (
                <ListItem key={i} sx={{ pl: 2 }}>
                  {desc}
                </ListItem>
              ))}
                         
            </List>
                        <Divider sx={{ my: 2 }} />         
          </>
        )}
               
        {data.features?.length > 0 && (
          <>
                        <Typography variant="subtitle1">Features:</Typography> 
                     
            <List>
                           
              {data.features.map((f, i) => (
                <ListItem key={i} sx={{ pl: 2 }}>
                  {f}
                </ListItem>
              ))}
                         
            </List>
                        <Divider sx={{ my: 2 }} />         
          </>
        )}
               
        {data.others?.length > 0 && (
          <>
                        <Typography variant="subtitle1">Other Info:</Typography>
                       
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
                       
            <Typography variant="subtitle1">Table {tIdx + 1}:</Typography>     
                 
            <TableContainer>
                           
              <Table size="small">
                               
                <TableBody>
                                   
                  {table.map((row, rIdx) => (
                    <TableRow key={rIdx}>
                                           
                      {row.map((cell, cIdx) => (
                        <TableCell key={cIdx}>{cell}</TableCell>
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
    <Box sx={{ p: 3 }}>
           
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={2}
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
          <Typography color="text.primary">{originalData.product}</Typography>
        </Breadcrumbs>

        <Button variant="outlined" onClick={handleTranslate} disabled={loading}>
          {loading ? <CircularProgress size={20} /> : "Translate"}
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={2}
      >
                <Typography variant="h6">{originalData.product}</Typography>   
                 
      </Box>
           
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
                {renderDataSection(originalData, "Original")}       
        {loading && !translatedData.length ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flex={1}
          >
                        <CircularProgress />         
          </Box>
        ) : (
          translatedData.length &&
          renderDataSection(translatedData[0], "Translated")
        )}
             
      </Box>
         
    </Box>
  );
}
