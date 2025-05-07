import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  Container,
  LinearProgress, // Import this
} from "@mui/material";
import TopNav from "./component/topNav";
import StickyHeadTable from "./component/stickyHeadTable";

function App() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTableData = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://192.168.1.18:8000/api/datagetall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch table data");
      }

      const data = await res.json();
      console.log("Fetched data:", data);
      setTableData(data);
    } catch (error) {
      console.error("Error fetching table data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const filePath = `D:/Downloads/Example/${files[0].name}`;
      const uploadRes = await fetch(
        "http://192.168.1.18:8000/api/dataextract",
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

      console.log("File upload successful");
      await fetchTableData();
    } catch (error) {
      console.error("Upload or data fetch failed", error);
    }
  };

  return (
    <>
            <CssBaseline />
            <TopNav onUpload={handleFileUpload} />     
      {loading && <LinearProgress />}
      <Container sx={{ mt: 4 }}>
                <StickyHeadTable rows={tableData} />     
      </Container>
         
    </>
  );
}

export default App;
