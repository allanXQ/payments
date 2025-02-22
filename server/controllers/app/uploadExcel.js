const path = require("path");
const fs = require("fs");
const XLSX = require("xlsx");

// Ensure uploads directory exists
const UPLOADS_DIR = path.join(__dirname, "../../uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// API Endpoint to Handle File Upload
const uploadExcel = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const tempPath = req.file.path;
  const fileExtension = path.extname(req.file.originalname);
  const originalFileName = path.basename(req.file.originalname, fileExtension);

  // Validate file type (only allow .xlsx and .xls)
  if (![".xlsx", ".xls"].includes(fileExtension)) {
    fs.unlinkSync(tempPath); // Delete invalid file
    return res
      .status(400)
      .json({ error: "Invalid file type. Please upload an Excel file." });
  }

  try {
    // Generate a unique filename (e.g., report_20240221_135000.xlsx)
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "");
    const newFileName = `${originalFileName}_${timestamp}${fileExtension}`;
    const newFilePath = path.join(UPLOADS_DIR, newFileName);

    // Move file to permanent uploads directory
    fs.renameSync(tempPath, newFilePath);

    // Read and parse Excel file
    const workbook = XLSX.readFile(newFilePath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    console.log("Excel Data:", data); // Log parsed data (for testing)

    // Return file info to client
    res.json({
      message: "File uploaded successfully!",
      file: {
        name: newFileName,
        path: `/uploads/${newFileName}`,
        size: req.file.size,
      },
      data, // Parsed data
    });
  } catch (error) {
    console.error("Error processing file:", error);
    fs.unlinkSync(tempPath); // Delete temp file if error occurs
    res.status(500).json({ error: "Error processing file" });
  }
};

module.exports = { uploadExcel };
