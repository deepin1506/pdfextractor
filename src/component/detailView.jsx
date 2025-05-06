import React from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  Divider,
} from "@mui/material";

const detailDataMap = {
  P001: {
    product: "Product Name 1",
    features: ["Feature A", "Feature B", "Feature C"],
    tables: [
      [
        ["Material", "Weight", "Color"],
        ["Steel", "10kg", "Red"],
      ],
      [
        ["Batch", "Origin"],
        ["#1234", "Germany"],
      ],
    ],
    descriptions: ["This is a high-quality product.", "Used in labs globally."],
    others: ["Warranty: 1 year", "Certification: ISO 9001"],
  },
  P002: {
    product: "Product Name 2",
    features: ["Feature X", "Feature Y"],
    tables: [
      [
        ["Size", "Length"],
        ["M", "50cm"],
      ],
    ],
    descriptions: ["Reliable and durable.", "Made for precision."],
    others: ["Limited Edition"],
  }, // Add P003 similarly
};

export default function DetailView({ selectedRow, onBack }) {
  if (!selectedRow) return null;

  const data = detailDataMap[selectedRow.productNumber];
  if (!data) return <Typography>No details found.</Typography>;

  return (
    <Box sx={{ p: 3 }}>
           
      <Typography variant="h6" gutterBottom>
                {data.product}     
      </Typography>
           
      <Button variant="outlined" onClick={onBack} sx={{ mb: 2 }}>
                Back to Table      
      </Button>
           
      <Box display={"flex"} flexDirection={"row"}>
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
        {data.others?.length > 0 && (
          <>
                      <Typography variant="subtitle1">Other Info:</Typography> 
            <List>
              {data.others.map((other, i) => (
                <ListItem key={i} sx={{ pl: 2 }}>
                  {other}
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>
      {data.tables?.map((table, tIdx) => (
        <Box key={tIdx} sx={{ mb: 3 }}>
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
}
