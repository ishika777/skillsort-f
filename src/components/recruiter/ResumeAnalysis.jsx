import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const ResumeAnalysis = () => {
  const [uploadedResumes, setUploadedResumes] = useState([]);
  const [resumeData, setResumeData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]); // Store selected files

  // Function to handle file selection
  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  // Function to process resumes when the "Analyze" button is clicked
  const analyzeResume = () => {
    if (selectedFiles.length === 0) return; // Prevent empty analysis

    const newResumes = [...uploadedResumes, ...selectedFiles];
    setUploadedResumes(newResumes);

    // Simulated analysis results
    const analyzedData = selectedFiles.map((file, index) => ({
      id: resumeData.length + index + 1,
      name: file.name.replace(".pdf", ""),
      atsScore: Math.floor(Math.random() * 50) + 50, // Random ATS Score (50-100)
      skillMatch: Math.floor(Math.random() * 40) + 60, // Skill Match (60-100)
      experience: `${Math.floor(Math.random() * 10)} Years`, // Random Experience
      keywordsMatched: Math.floor(Math.random() * 20) + 10, // Keywords Matched
    }));

    setResumeData([...resumeData, ...analyzedData]);
    setSelectedFiles([]); // Clear selected files after analysis
  };

  return (
    <div className="tabs-scroll w-full p-6 overflow-y-auto h-full pt-4">
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium">Upload Resume(s)</h3>
        <Input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileChange}
          className="mt-2"
        />
        <Button className="mt-2" onClick={analyzeResume}>Analyze</Button>
      </div>

      {/* Resumes List */}
      {resumeData.length > 0 && (
        <>
          <h3 className="text-lg font-medium mb-2">📜 Analyzed Resumes</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate Name</TableHead>
                <TableHead>ATS Score</TableHead>
                <TableHead>Skill Match</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Keywords Matched</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resumeData.map((resume) => (
                <TableRow key={resume.id}>
                  <TableCell>{resume.name}</TableCell>
                  <TableCell>
                    <Progress value={resume.atsScore} className="w-20" />
                    {resume.atsScore}%
                  </TableCell>
                  <TableCell>
                    <Progress value={resume.skillMatch} className="w-20" />
                    {resume.skillMatch}%
                  </TableCell>
                  <TableCell>{resume.experience}</TableCell>
                  <TableCell>{resume.keywordsMatched}</TableCell>
                  <TableCell>
                    <Button variant="outline">📄 View</Button>
                    <Button variant="default" className="ml-2">⬇ Download</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default ResumeAnalysis;
