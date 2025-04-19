import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSelector } from "react-redux";

const jobs = [
  { id: "job1", title: "Frontend Developer" },
  { id: "job2", title: "Backend Developer" },
];

const candidates = {
  job1: [
    { id: 1, name: "Ishika Sharma", atsScore: 85, skillMatch: 92, experience: "3 Years", status: "Pending", resumeLink: "/resumes/ishika.pdf" },
    { id: 2, name: "Aman Gupta", atsScore: 78, skillMatch: 88, experience: "2 Years", status: "Interview Scheduled", resumeLink: "/resumes/aman.pdf" },
  ],
  job2: [
    { id: 3, name: "Riya Mehta", atsScore: 80, skillMatch: 90, experience: "4 Years", status: "Pending", resumeLink: "/resumes/riya.pdf" },
  ],
};

const ShortlistedCandidates = () => {

    // const {jobs} = useSelector((state) => state.job);

  const [selectedJob, setSelectedJob] = useState(jobs[0].id);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showResume, setShowResume] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewDate, setInterviewDate] = useState("");

  return (
    <div className="tabs-scroll w-full p-6 overflow-y-auto h-[calc(100vh-64px)] pt-4">
      <h2 className="text-2xl font-semibold mb-4">📌 Shortlisted Candidates</h2>

      {/* Job Selection Dropdown */}
      <Select value={selectedJob} onValueChange={setSelectedJob}>
        <SelectTrigger className="w-64 mb-4">
          <SelectValue placeholder="Select a Job Posting" />
        </SelectTrigger>
        <SelectContent>
          {jobs.map((job) => (
            <SelectItem key={job.id} value={job.id}>
              {job.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate Name</TableHead>
            <TableHead>ATS Score</TableHead>
            <TableHead>Skill Match</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates[selectedJob]?.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell>{candidate.name}</TableCell>
              <TableCell>{candidate.atsScore}%</TableCell>
              <TableCell>{candidate.skillMatch}%</TableCell>
              <TableCell>{candidate.experience}</TableCell>
              <TableCell>{candidate.status}</TableCell>
              <TableCell className="space-x-2">
                <Button variant="outline" onClick={() => { setSelectedCandidate(candidate); setShowResume(true); }}>
                  📄 View Resume
                </Button>
                <Button variant="default" onClick={() => { setSelectedCandidate(candidate); setShowInterviewModal(true); }}>
                  📅 Schedule Interview
                </Button>
                <Button variant="destructive">❌ Reject</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Resume Preview Modal */}
      {selectedCandidate && (
        <Dialog open={showResume} onOpenChange={setShowResume}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>📄 {selectedCandidate.name}'s Resume</DialogTitle>
            </DialogHeader>
            <iframe src={selectedCandidate.resumeLink} className="w-full h-96"></iframe>
          </DialogContent>
        </Dialog>
      )}

      {/* Interview Scheduling Modal */}
      {selectedCandidate && (
        <Dialog open={showInterviewModal} onOpenChange={setShowInterviewModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>📅 Schedule Interview</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Label htmlFor="date">Select Interview Date & Time</Label>
              <Input type="datetime-local" id="date" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} />
              <Button onClick={() => alert(`Interview scheduled for ${selectedCandidate.name} on ${interviewDate}`)}>
                Confirm Schedule
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}


export default ShortlistedCandidates