import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, Briefcase, FileText, Users, CheckCircle, Clock } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="tabs-scroll p-6 space-y-6 overflow-y-auto w-full h-[calc(100vh-64px)]">

            <div className="grid grid-cols-2 gap-6">
                <DashboardCard icon={<FileText size={28} />} title="Active Job Listings" value="8" />
                <DashboardCard icon={<Clock size={28} />} title="Expired Job Listings" value="4" />
            </div>

            <div className="bg-white shadow rounded-lg p-5">
                <h2 className="text-xl font-semibold mb-4">Recent Job Applications</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Candidate</TableHead>
                            <TableHead>Job Role</TableHead>
                            <TableHead>ATS Score</TableHead>
                            <TableHead>Skill Match</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[
                            { name: "Aman Kumar", role: "Software Engineer", ats: "82%", skills: "70%", status: "Shortlisted" },
                            { name: "Neha Singh", role: "UI/UX Designer", ats: "75%", skills: "60%", status: "Under Review" },
                            { name: "Raj Verma", role: "Data Analyst", ats: "90%", skills: "85%", status: "Shortlisted" },
                        ].map((applicant, index) => (
                            <TableRow key={index}>
                                <TableCell>{applicant.name}</TableCell>
                                <TableCell>{applicant.role}</TableCell>
                                <TableCell>{applicant.ats}</TableCell>
                                <TableCell>{applicant.skills}</TableCell>
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

function DashboardCard({ icon, title, value }) {
    return (
        <Card className="flex items-center p-4 space-x-4">
            <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
            <div>
                <CardTitle className="text-sm text-gray-600">{title}</CardTitle>
                <CardContent className="text-2xl font-bold">{value}</CardContent>
            </div>
        </Card>
    );
}
