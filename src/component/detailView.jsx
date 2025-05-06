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
  Breadcrumbs,
  Link,
} from "@mui/material";
import { NavigateNext } from "@mui/icons-material";

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
  },
  P003: {
    product: "Product Name 3",
    features: ["Lightweight", "Eco-Friendly", "Compact"],
    tables: [
      [
        ["Volume", "Material"],
        ["250ml", "Plastic"],
      ],
    ],
    descriptions: ["Perfect for mobile labs.", "BPA-free design."],
    others: ["Recyclable", "Patent Pending"],
  },
  P004: {
    product: "Product Name 4",
    features: ["High Capacity", "Rust Resistant"],
    tables: [
      [
        ["Capacity", "Finish"],
        ["5L", "Matte Black"],
      ],
      [["Certifications"], ["CE, RoHS"]],
    ],
    descriptions: ["Built for rugged environments.", "Lasts up to 10 years."],
    others: ["Includes user manual", "2-year replacement policy"],
  },
  P005: {
    product: "Product Name 5",
    features: ["Portable", "Multi-Use"],
    tables: [
      [
        ["Function", "Battery Life"],
        ["Analyzer", "12 hours"],
      ],
    ],
    descriptions: [
      "Compact analyzer for fieldwork.",
      "Wireless connectivity included.",
    ],
    others: ["Rechargeable", "Includes carrying case"],
  },
};

export default function DetailView({ selectedRow, onBack }) {
  if (!selectedRow) return null;

  const data = detailDataMap[selectedRow.productNumber];
  if (!data) return <Typography>No details found.</Typography>;

  return (
    <Box sx={{ p: 3 }}>
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
        <Typography color="text.primary">{data.product}</Typography>
      </Breadcrumbs>
           
      <Typography variant="h6" gutterBottom>
                {data.product}     
      </Typography>
                 
      <Box display={"flex"} flexDirection={"row"}>
        {data.image && (
          <Box sx={{ minWidth: 150, maxWidth: 200 }}>
            <img
              src={data.image}
              alt={data.product}
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Box>
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
