import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, Pen, Trash2 } from "lucide-react";
import { NewJob } from "./drawer/NewJob";
import { useDispatch, useSelector } from "react-redux";
import EditJob from "./drawer/EditJob";
import DeleteJob from "./dialog/DeleteJob";

const JobPostings = () => {
    const today = new Date().toISOString().split("T")[0];
    const { jobs } = useSelector((state) => state.job);
    const dispatch = useDispatch();

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
                            {
                                jobs?.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center">No job postings available</TableCell>
                                    </TableRow>
                                ) : (
                                    jobs?.map((job) => (
                                        <TableRow key={job._id}>
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell>{job.jobType}</TableCell>
                                            <TableCell>{job.applicants}</TableCell>
                                            <TableCell>{job.deadline.split("T")[0] > today ? <span className="text-green-500 font-bold">Open</span> : <span className="text-red-500 font-bold">Closed</span>}</TableCell>
                                            <TableCell className="flex items-center gap-2">
                                                <Button size="sm" onClick={() => handleViewApplicants(job)}><Eye /> View</Button>
                                                <EditJob job={job} />
                                                <DeleteJob job={job} />
                                                {/* <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleEditJob(job)}><Pen /></Button> */}
                                                {/* <Button size="sm" className="bg-red-500 hover:bg-red-600" onClick={() => handleViewApplicants(job)}><Trash2 /></Button> */}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )
                            }
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
                            <DialogDescription>
                                Fill out the job details below. All fields are required.
                            </DialogDescription>
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
