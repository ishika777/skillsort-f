import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Pen, Trash2, Plus, Star, X, Calendar, Users, Briefcase } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NewJob } from "./drawer/NewJob";
import EditJob from "./drawer/EditJob";
import DeleteJob from "./dialog/DeleteJob";

const JobPostings = () => {
    const today = new Date().toISOString().split("T")[0];
    const { jobsByRecruiter } = useSelector((state) => state.job);
    const dispatch = useDispatch();

    const [selectedJob, setSelectedJob] = useState(null);
    const [showApplicants, setShowApplicants] = useState(false);
    const [activeTab, setActiveTab] = useState("all");

    const handleViewApplicants = (job) => {
        setSelectedJob(job);
        setShowApplicants(true);
    };

    // Filter jobs based on active tab
    const filteredJobs = jobsByRecruiter?.filter(job => {
        if (activeTab === "all") return true;
        if (activeTab === "open") return job.deadline.split("T")[0] > today;
        if (activeTab === "closed") return job.deadline.split("T")[0] <= today;
        return true;
    });

    const getStatusBadge = (deadline) => {
        const isOpen = deadline.split("T")[0] > today;
        return isOpen ? 
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge> : 
            <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Closed</Badge>;
    };

    return (
        <div className="tabs-scroll w-full p-6 overflow-y-auto h-full pt-4">

                <div className="flex items-center justify-between space-x-2 mb-6 mt-3">
                    <div className="flex items-center gap-3">
                        <Button 
                            variant={activeTab === "all" ? "default" : "outline"} 
                            onClick={() => setActiveTab("all")}
                        >
                            All Jobs
                        </Button>
                        <Button 
                            variant={activeTab === "open" ? "default" : "outline"} 
                            onClick={() => setActiveTab("open")}
                            className="flex items-center gap-1"
                        >
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            Open
                        </Button>
                        <Button 
                            variant={activeTab === "closed" ? "default" : "outline"} 
                            onClick={() => setActiveTab("closed")}
                            className="flex items-center gap-1"
                        >
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            Closed
                        </Button>
                    </div>
                    <NewJob />

                </div>

                <Card>
                    <CardHeader className="bg-white border-b">
                        <CardTitle>Job Listings ({filteredJobs?.length || 0})</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50">
                                        <TableCell className="font-medium">Job Title</TableCell>
                                        <TableCell className="font-medium">Job Type</TableCell>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-1">
                                                <Users size={14} />
                                                Applicants
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                Status
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">Actions</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        filteredJobs?.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="h-40 text-center text-gray-500">
                                                    <div className="flex flex-col items-center justify-center">
                                                        <Briefcase size={40} className="text-gray-300 mb-2" />
                                                        <p>No job postings available</p>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredJobs?.map((job) => (
                                                <TableRow key={job._id} className="hover:bg-gray-50">
                                                    <TableCell className="font-medium">{job.title}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className="font-normal">
                                                            {job.jobType}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="font-medium">{job.applicants}</span>
                                                        {job.applicants > 0 && 
                                                            <span className="text-xs text-gray-500 ml-1">candidates</span>
                                                        }
                                                    </TableCell>
                                                    <TableCell>{getStatusBadge(job.deadline)}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Button 
                                                                size="sm" 
                                                                variant="outline"
                                                                className="flex items-center gap-1" 
                                                                onClick={() => handleViewApplicants(job)}
                                                            >
                                                                <Eye size={14} />
                                                                <span className="hidden sm:inline">View</span>
                                                            </Button>
                                                            <EditJob job={job}>
                                                                <Button 
                                                                    size="sm" 
                                                                    variant="outline"
                                                                    className="flex items-center gap-1"
                                                                >
                                                                    <Pen size={14} />
                                                                    <span className="hidden sm:inline">Edit</span>
                                                                </Button>
                                                            </EditJob>
                                                            <DeleteJob job={job}>
                                                                <Button 
                                                                    size="sm" 
                                                                    variant="outline"
                                                                    className="text-red-500 hover:text-red-600 flex items-center gap-1"
                                                                >
                                                                    <Trash2 size={14} />
                                                                    <span className="hidden sm:inline">Delete</span>
                                                                </Button>
                                                            </DeleteJob>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

            {showApplicants && selectedJob && (
                <Dialog open={showApplicants} onOpenChange={setShowApplicants}>
                    <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <Briefcase size={18} />
                                Applicants for {selectedJob.title}
                            </DialogTitle>
                        </DialogHeader>
                        
                        <div className="mt-2 mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Badge className="bg-blue-100 text-blue-800">
                                    {selectedJob.applicants} Applicants
                                </Badge>
                                {getStatusBadge(selectedJob.deadline)}
                            </div>
                            <span className="text-sm text-gray-500">
                                Deadline: {new Date(selectedJob.deadline).toLocaleDateString()}
                            </span>
                        </div>

                        <div className="overflow-x-auto max-h-96">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50">
                                        <TableCell className="font-medium">Candidate</TableCell>
                                        <TableCell className="font-medium">ATS Score</TableCell>
                                        <TableCell className="font-medium">Skill Match</TableCell>
                                        <TableCell className="font-medium">Actions</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Priya Sharma</div>
                                            <div className="text-sm text-gray-500">Applied 3 days ago</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                                                </div>
                                                <span>85%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                                                </div>
                                                <span>92%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button size="sm" variant="outline" className="text-yellow-600 flex items-center gap-1">
                                                    <Star size={14} />
                                                    <span className="hidden sm:inline">Shortlist</span>
                                                </Button>
                                                <Button size="sm" variant="outline" className="text-red-500 flex items-center gap-1">
                                                    <X size={14} />
                                                    <span className="hidden sm:inline">Reject</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Rahul Verma</div>
                                            <div className="text-sm text-gray-500">Applied 5 days ago</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                                                </div>
                                                <span>60%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                                                </div>
                                                <span>78%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button size="sm" variant="outline" className="text-yellow-600 flex items-center gap-1">
                                                    <Star size={14} />
                                                    <span className="hidden sm:inline">Shortlist</span>
                                                </Button>
                                                <Button size="sm" variant="outline" className="text-red-500 flex items-center gap-1">
                                                    <X size={14} />
                                                    <span className="hidden sm:inline">Reject</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default JobPostings;