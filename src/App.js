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

    try {
      const filePath = `D:/Downloads/Example/${files[0].name}`; // First POST: Send file path to /dataextract

      const uploadRes = await fetch(
        "http://192.168.29.39:8000/api/dataextract",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: filePath }),
        }
      );

      if (!uploadRes.ok) {
        throw new Error("File path upload failed");
      }

      const uploadData = await uploadRes;
      console.log("File upload response:", uploadData);

      const dataGetRes = await fetch(
        "http://192.168.29.39:8000/api/datagetall",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!dataGetRes.ok) {
        throw new Error("Data fetch failed");
      }

      const data = await dataGetRes.json();
      console.log("Extracted data:", data);
      setTableData(data);
    } catch (error) {
      console.error("Upload or data fetch failed", error);
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
