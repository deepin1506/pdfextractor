import { useEffect, useState } from "react";
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
      // const res = await fetch("http://127.0.0.1:8000/api/datagetall", {
      const res = await fetch(
        "https://pdfextractor-bknd-v1-1.onrender.com/api/datagetall",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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

    setLoading(true);
    const formData = new FormData();
    formData.append("pdf_file", files[0]);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const uploadRes = await fetch(
        "https://pdfextractor-bknd-v1-1.onrender.com/api/dataextract",
        {
          method: "POST",
          body: formData,
        }
      );
      console.log("dm formData =>", formData);

      if (!uploadRes.ok) {
        throw new Error("File upload failed");
      }

      console.log("File upload successful");
      await fetchTableData();
    } catch (error) {
      console.error("Upload or data fetch failed", error);
    } finally {
      setLoading(false);
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
