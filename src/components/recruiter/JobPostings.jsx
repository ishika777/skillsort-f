import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, Pen, Trash2 } from "lucide-react";
import { NewJob } from "./drawer/NewJob";

const JobPostings = () => {
    const [jobs, setJobs] = useState([
        { id: 1, title: "Software Engineer", type: "Full-time", applicants: 120, status: "Open" },
        { id: 2, title: "Data Analyst", type: "Remote", applicants: 85, status: "Closed" },
    ]);

    const [selectedJob, setSelectedJob] = useState(null);
    const [showApplicants, setShowApplicants] = useState(false);

    const handleViewApplicants = (job) => {
        setSelectedJob(job);
        setShowApplicants(true);
    };

    return (
        <div className="tabs-scroll flex w-full overflow-y-auto h-[calc(100vh-64px)]">
            <main className="flex-1 p-6">
                <div className="mb-3">

                <NewJob />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Manage Job Listings</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>Job Title</TableCell>
                                <TableCell>Job Type</TableCell>
                                <TableCell>Applicants</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {jobs.map((job) => (
                                <TableRow key={job.id}>
                                    <TableCell>{job.title}</TableCell>
                                    <TableCell>{job.type}</TableCell>
                                    <TableCell>{job.applicants}</TableCell>
                                    <TableCell>{job.status}</TableCell>
                                    <TableCell className="flex items-center gap-2">
                                        <Button size="sm" onClick={() => handleViewApplicants(job)}><Eye /> View</Button>
                                        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleViewApplicants(job)}><Pen /></Button>
                                        <Button size="sm" className="bg-red-500 hover:bg-red-600"  onClick={() => handleViewApplicants(job)}><Trash2 /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </main>

            {/* Applicant Modal */}
            {showApplicants && selectedJob && (
                <Dialog open={showApplicants} onOpenChange={setShowApplicants}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Applicants for {selectedJob.title}</DialogTitle>
                        </DialogHeader>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell>Candidate Name</TableCell>
                                    <TableCell>ATS Score</TableCell>
                                    <TableCell>Skill Match %</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Priya Sharma</TableCell>
                                    <TableCell>85%</TableCell>
                                    <TableCell>92%</TableCell>
                                    <TableCell>
                                        <Button size="sm">⭐ Shortlist</Button>
                                        <Button size="sm" variant="destructive">❌ Reject</Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Rahul Verma</TableCell>
                                    <TableCell>60%</TableCell>
                                    <TableCell>78%</TableCell>
                                    <TableCell>
                                        <Button size="sm">⭐ Shortlist</Button>
                                        <Button size="sm" variant="destructive">❌ Reject</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default JobPostings;
