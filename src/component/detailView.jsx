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

export default function DetailView({ selectedRow, onBack }) {
  if (!selectedRow) return null;

  const data = selectedRow[0];
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
                 
      <Box display={"flex"} flexDirection={"column"}>
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
