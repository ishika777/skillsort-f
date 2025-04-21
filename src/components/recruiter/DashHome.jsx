import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, Briefcase, FileText, Users, CheckCircle, Clock, ArrowUp, ArrowDown, Calendar, MoreHorizontal, Filter, Search, Download, RefreshCw } from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DashHome() {
  const { jobsByRecruiter } = useSelector((state) => state.job);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const activeJobs = jobsByRecruiter?.filter((job) => job.deadline.split("T")[0] > new Date().toISOString().split("T")[0]).length || 0;
  const expiredJobs = jobsByRecruiter?.length - activeJobs || 0;
  const totalApplications = 24; // Example data
  const shortlistedCandidates = 8; // Example data
  
  // Mock application data
  const recentApplications = [
    { name: "Aman Kumar", role: "Software Engineer", status: "Shortlisted", date: "2025-04-18" },
    { name: "Neha Singh", role: "UI/UX Designer", status: "Under Review", date: "2025-04-17" },
    { name: "Raj Verma", role: "Data Analyst", status: "Shortlisted", date: "2025-04-16" },
    { name: "Priya Sharma", role: "Product Manager", status: "Interview", date: "2025-04-15" },
    { name: "Karan Patel", role: "Frontend Developer", status: "Rejected", date: "2025-04-14" }
  ];
  
  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="tabs-scroll w-full p-6 overflow-y-auto h-full pt-4">
      <div className="flex justify-end items-center mb-3">
        <Button 
          onClick={refreshData}
          variant="outline" 
          className="flex items-center gap-2 border-gray-300"
        >
          <RefreshCw size={16} className={`${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          icon={<FileText size={22} />} 
          title="Active Jobs" 
          value={activeJobs} 
          description="Current open positions"
          trend="up"
          color="blue"
        />
        <DashboardCard 
          icon={<Clock size={22} />} 
          title="Expired Jobs" 
          value={expiredJobs} 
          description="Past deadline positions"
          trend="down"
          color="amber"
        />
        <DashboardCard 
          icon={<Users size={22} />} 
          title="Total Applications" 
          value={totalApplications} 
          description="Across all positions"
          trend="up"
          color="indigo"
        />
        <DashboardCard 
          icon={<CheckCircle size={22} />} 
          title="Shortlisted" 
          value={shortlistedCandidates} 
          description="Candidates in pipeline"
          trend="up"
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 shadow-sm border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-gray-800">Recent Applications</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-500" />
                <Input 
                  placeholder="Search applications..." 
                  className="pl-8 h-9 w-[180px] text-sm" 
                />
              </div>
              <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                <Filter size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-medium">Candidate</TableHead>
                    <TableHead className="font-medium">Job Role</TableHead>
                    <TableHead className="font-medium">Date</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="w-8"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentApplications.map((applicant, index) => (
                    <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="font-medium">{applicant.name}</TableCell>
                      <TableCell>{applicant.role}</TableCell>
                      <TableCell className="text-gray-500 text-sm">{applicant.date}</TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          applicant.status === "Shortlisted" ? "bg-green-100 text-green-800" : 
                          applicant.status === "Under Review" ? "bg-blue-100 text-blue-800" :
                          applicant.status === "Interview" ? "bg-purple-100 text-purple-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {applicant.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-center mt-4">
              <Button variant="outline" size="sm" className="text-sm">
                View All Applications
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Calendar size={18} />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobsByRecruiter?.slice(0, 3).map((job, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-800">{job.title}</h3>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      {job.jobType}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    <Clock size={14} />
                    Deadline: {new Date(job.deadline).toLocaleDateString()}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-600">{job.skills.slice(0, 2).join(", ")}{job.skills.length > 2 ? "..." : ""}</span>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-600 hover:text-blue-800">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
              
              {(!jobsByRecruiter || jobsByRecruiter.length === 0) && (
                <div className="text-center py-6 text-gray-500">
                  No upcoming deadlines
                </div>
              )}
              
              <Button variant="outline" size="sm" className="w-full text-sm">
                View All Jobs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, value, description, trend, color }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    amber: "bg-amber-50 text-amber-600 border-amber-200",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-200",
  };
  
  return (
    <Card className="shadow-sm border-gray-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            {icon}
          </div>
          {trend && (
            <div className={`flex items-center text-xs font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
              {trend === "up" ? <ArrowUp size={12} className="mr-1" /> : <ArrowDown size={12} className="mr-1" />}
              {trend === "up" ? "12%" : "8%"}
            </div>
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-gray-800">{value}</span>
            {description && <span className="text-xs text-gray-500">{description}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}