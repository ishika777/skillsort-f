import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, Briefcase, FileText, Users, CheckCircle, Clock } from "lucide-react";
import { useSelector } from "react-redux";

export default function DashHome() {

    const {jobsByRecruiter} = useSelector((state) => state.job);
    const activeJobs = jobsByRecruiter?.filter((job) => job.deadline.split("T")[0] > new Date().toISOString().split("T")[0]).length || 0;
    const expiredJobs = jobsByRecruiter?.length - activeJobs.length || 0;
    return (
        <div className="tabs-scroll p-6 space-y-6 overflow-y-auto w-full h-[calc(100vh-64px)] pt-4">

            <div className="grid grid-cols-2 gap-6">
                <DashboardCard icon={<FileText size={28} />} title="Active Job Listings" active={true} value={activeJobs} />
                <DashboardCard icon={<Clock size={28} />} title="Expired Job Listings" active={false} value={expiredJobs} />
            </div>

            <div className="bg-white shadow rounded-lg p-5">
                <h2 className="text-xl font-semibold mb-4">Recent Job Applications</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Candidate</TableHead>
                            <TableHead>Job Role</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[
                            { name: "Aman Kumar", role: "Software Engineer", status: "Shortlisted" },
                            { name: "Neha Singh", role: "UI/UX Designer", status: "Under Review" },
                            { name: "Raj Verma", role: "Data Analyst", status: "Shortlisted" },
                        ].map((applicant, index) => (
                            <TableRow key={index}>
                                <TableCell>{applicant.name}</TableCell>
                                <TableCell>{applicant.role}</TableCell>
                                <TableCell>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                        applicant.status === "Shortlisted" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
                                    }`}>
                                        {applicant.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function DashboardCard({ icon, title, value, active }) {
    return (
        <Card className="flex items-center p-4 space-x-4">
            <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
            <div className="flex flex-col items-center">
                <CardTitle className="text-sm text-gray-600">{title}</CardTitle>
                <CardContent className="text-2xl font-bold">
                    <span className={`${active ? "text-green-600" : "text-red-500"} text-4xl`}>{value}</span>
                </CardContent>
            </div>
        </Card>
    );
}
