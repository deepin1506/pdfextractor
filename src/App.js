import React, { useState } from "react";
import { CssBaseline, Container } from "@mui/material";
import TopNav from "./component/topNav";
import StickyHeadTable from "./component/stickyHeadTable";

function App() {
  const [tableData, setTableData] = useState([]); // Store table data

  const randomData = [
    {
      productNumber: "P001",
      shortDescription: "Item A",
      longDescription: "Description for item A",
    },
    {
      productNumber: "P002",
      shortDescription: "Item B",
      longDescription: "Description for item B",
    },
    {
      productNumber: "P003",
      shortDescription: "Item C",
      longDescription: "Description for item C",
    },
    {
      productNumber: "P004",
      shortDescription: "Item D",
      longDescription: "Description for item D",
    },
    {
      productNumber: "P005",
      shortDescription: "Item E",
      longDescription: "Description for item E",
    },
  ];

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const uploadRes = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const { filePath } = await uploadRes.json();

      const dataRes = await fetch("http://localhost:5000/extract-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: filePath }),
      });
      const productData = await dataRes.json();

      console.log("Extracted product data:", productData);
      setTableData(productData);
    } catch (error) {
      console.error("Upload or data extraction failed", error);
    }
  };

  return (
    <>
      <CssBaseline />
      <TopNav onUpload={handleFileUpload} />
      <Container sx={{ mt: 4 }}>
        <StickyHeadTable rows={tableData.length ? tableData : randomData} />{" "}
      </Container>
    </>
  );
}

export default App;
