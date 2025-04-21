import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, Clock, Star, X, Calendar as CalendarIcon, User, Award, Briefcase } from "lucide-react";
import { useSelector } from "react-redux";

const jobs = [
  { id: "job1", title: "Frontend Developer", department: "Engineering", openings: 2 },
  { id: "job2", title: "Backend Developer", department: "Engineering", openings: 1 },
];

const candidates = {
  job1: [
    { id: 1, name: "Ishika Sharma", atsScore: 85, skillMatch: 92, experience: "3 Years", status: "Pending", resumeLink: "/resumes/ishika.pdf", photo: "/api/placeholder/40/40", appliedDate: "2025-04-15" },
    { id: 2, name: "Aman Gupta", atsScore: 78, skillMatch: 88, experience: "2 Years", status: "Interview Scheduled", resumeLink: "/resumes/aman.pdf", photo: "/api/placeholder/40/40", appliedDate: "2025-04-16" },
  ],
  job2: [
    { id: 3, name: "Riya Mehta", atsScore: 80, skillMatch: 90, experience: "4 Years", status: "Pending", resumeLink: "/resumes/riya.pdf", photo: "/api/placeholder/40/40", appliedDate: "2025-04-14" },
  ],
};

const ShortlistedCandidates = () => {
  const [selectedJob, setSelectedJob] = useState(jobs[0].id);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showResume, setShowResume] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewType, setInterviewType] = useState("video");
  const [activeTab, setActiveTab] = useState("all");

  // Filter candidates based on active tab
  const filteredCandidates = candidates[selectedJob]?.filter(candidate => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return candidate.status === "Pending";
    if (activeTab === "scheduled") return candidate.status === "Interview Scheduled";
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending Review</Badge>;
      case "Interview Scheduled":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Interview Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const selectedJobDetails = jobs.find(job => job.id === selectedJob);

  return (
    <div className="tabs-scroll w-full p-6 overflow-y-auto h-full pt-4">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <Card className="w-full md:w-1/3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Select Job Position</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Job Posting" />
              </SelectTrigger>
              <SelectContent>
                {jobs?.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedJobDetails && (
              <div className="mt-4 space-y-2 p-3 bg-blue-50 rounded-md border border-blue-100">
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase size={16} className="text-blue-500" />
                  <span className="font-medium">{selectedJobDetails.title}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User size={16} />
                  <span>Department: {selectedJobDetails.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Award size={16} />
                  <span>Openings: {selectedJobDetails.openings}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star size={16} className="text-yellow-500" />
                  <span>Shortlisted: {candidates[selectedJob]?.length || 0} candidates</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="w-full md:w-2/3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Candidate Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="text-green-500 font-medium">Total Shortlisted</div>
                <div className="text-2xl font-bold mt-1">{candidates[selectedJob]?.length || 0}</div>
                <div className="text-xs text-gray-500 mt-1">Candidates for this position</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="text-blue-500 font-medium">Interviews Scheduled</div>
                <div className="text-2xl font-bold mt-1">
                  {candidates[selectedJob]?.filter(c => c.status === "Interview Scheduled").length || 0}
                </div>
                <div className="text-xs text-gray-500 mt-1">Pending interview dates</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <div className="text-yellow-500 font-medium">Awaiting Review</div>
                <div className="text-2xl font-bold mt-1">
                  {candidates[selectedJob]?.filter(c => c.status === "Pending").length || 0}
                </div>
                <div className="text-xs text-gray-500 mt-1">Need immediate attention</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2 border-b">
          <div className="flex items-center justify-between">
            <CardTitle>Candidate List</CardTitle>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Candidate</TableHead>
                <TableHead>Qualification</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates?.length > 0 ? (
                filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img 
                          src={candidate.photo} 
                          alt={candidate.name} 
                          className="rounded-full"
                        />
                        <div>
                          <div className="font-medium">{candidate.name}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar size={12} />
                            Applied on {new Date(candidate.appliedDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>ATS Score</span>
                          <span className="font-medium">{candidate.atsScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${candidate.atsScore >= 80 ? 'bg-green-500' : 'bg-yellow-500'}`}
                            style={{ width: `${candidate.atsScore}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span>Skill Match</span>
                          <span className="font-medium">{candidate.skillMatch}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-500 h-1.5 rounded-full"
                            style={{ width: `${candidate.skillMatch}%` }}
                          ></div>
                        </div>
                        
                        <div className="text-sm flex items-center gap-1 mt-1">
                          <Briefcase size={12} />
                          <span>{candidate.experience} Experience</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(candidate.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => { setSelectedCandidate(candidate); setShowResume(true); }}
                        >
                          <FileText size={14} />
                          Resume
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => { setSelectedCandidate(candidate); setShowInterviewModal(true); }}
                        >
                          <CalendarIcon size={14} />
                          Schedule
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500 hover:bg-red-50 hover:text-red-600"
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-gray-500">
                    No candidates found for the selected criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Resume Preview Modal */}
      {selectedCandidate && (
        <Dialog open={showResume} onOpenChange={setShowResume}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText size={18} />
                {selectedCandidate.name}'s Resume
              </DialogTitle>
            </DialogHeader>
            <div className="border rounded-md overflow-hidden">
              <iframe src={selectedCandidate.resumeLink} className="w-full h-96"></iframe>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Interview Scheduling Modal */}
      {selectedCandidate && (
        <Dialog open={showInterviewModal} onOpenChange={setShowInterviewModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CalendarIcon size={18} />
                Schedule Interview with {selectedCandidate.name}
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={selectedCandidate.photo} 
                alt={selectedCandidate.name} 
                className="rounded-full"
              />
              <div>
                <div className="font-medium">{selectedCandidate.name}</div>
                <div className="text-sm text-gray-500">For: {jobs.find(job => job.id === selectedJob)?.title}</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="interviewType" className="block mb-2">Interview Type</Label>
                <Select value={interviewType} onValueChange={setInterviewType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interview type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Interview</SelectItem>
                    <SelectItem value="inperson">In-Person Interview</SelectItem>
                    <SelectItem value="phone">Phone Interview</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="date" className="block mb-2">Interview Date & Time</Label>
                <Input
                  type="datetime-local"
                  id="date"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="pt-2 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowInterviewModal(false)}>
                  Cancel
                </Button>
                <Button 
                  className="flex items-center gap-1"
                  onClick={() => {
                    alert(`Interview scheduled for ${selectedCandidate.name} on ${interviewDate}`);
                    setShowInterviewModal(false);
                  }}
                >
                  <Clock size={16} />
                  Confirm Schedule
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ShortlistedCandidates;