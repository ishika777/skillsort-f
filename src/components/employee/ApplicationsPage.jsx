import { useState } from 'react';
import {
    Briefcase, MapPin, Calendar, Filter, Search,
    ChevronDown, ArrowUpDown, MoreHorizontal,
    Clock, CheckCircle, XCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSelector } from 'react-redux';

// Helper function to format dates
const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

// Status styling for applications
const getStatusStyles = (status) => {
    switch (status) {
        case "Applied":
            return {
                icon: <Clock size={16} />,
                bgColor: "bg-blue-100",
                textColor: "text-blue-700"
            };
        case "Shortlisted":
            return {
                icon: <CheckCircle size={16} />,
                bgColor: "bg-green-100",
                textColor: "text-green-700"
            };
        case "Rejected":
            return {
                icon: <XCircle size={16} />,
                bgColor: "bg-red-100",
                textColor: "text-red-700"
            };
        default:
            return {
                icon: <Clock size={16} />,
                bgColor: "bg-gray-100",
                textColor: "text-gray-700"
            };
    }
};

const ApplicationsPage = ({setSelectedJob, setTabValue, setPreviousTab}) => {
    // Sample data - replace with actual data from your app
    const { appliedJobs } = useSelector((state) => state.application)

    const [activeFilter, setActiveFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("date");

    // Filter applications based on active filter and search term
    const filteredJobs = appliedJobs?.filter(app => {
        const matchesFilter =
            activeFilter === "all" ||
            app.status.toLowerCase() === activeFilter.toLowerCase();

        const matchesSearch =
            app.jobId.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.jobId.company.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    // Sort applications
    const sortedJobs = [...filteredJobs].sort((a, b) => {
        if (sortBy === "date") {
            return new Date(b.appliedAt) - new Date(a.appliedAt);
        } else if (sortBy === "company") {
            return a.jobId.company.localeCompare(b.jobId.company);
        } else if (sortBy === "title") {
            return a.jobId.title.localeCompare(b.jobId.title);
        }
        return 0;
    });

    return (
        <div className="tabs-scroll w-full p-6 overflow-y-auto h-[calc(100vh-64px)] pt-4">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-3 text-muted-foreground" size={16} />
                    <Input
                        placeholder="Search applications..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                <ArrowUpDown size={16} />
                                Sort
                                <ChevronDown size={14} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSortBy("date")}>
                                Date Applied
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy("company")}>
                                Company
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy("title")}>
                                Job Title
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant="outline" className="flex items-center gap-2">
                        <Filter size={16} />
                        Filters
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveFilter}>
                <TabsList className="flex w-full md:w-auto">
                    <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                    <TabsTrigger value="applied" className="flex-1">Applied</TabsTrigger>
                    <TabsTrigger value="shortlisted" className="flex-1">Shortlisted</TabsTrigger>
                    <TabsTrigger value="rejected" className="flex-1">Rejected</TabsTrigger>
                </TabsList>
            </Tabs>

            {sortedJobs.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed">
                    <Briefcase className="mx-auto text-muted-foreground mb-4" size={48} />
                    <h3 className="text-lg font-medium mb-2">No applications found</h3>
                    <p className="text-muted-foreground mb-4">
                        {searchTerm || activeFilter !== "all"
                            ? "Try changing your search or filters"
                            : "Start applying to jobs to track your progress"}
                    </p>
                    <Button>Find Jobs</Button>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {sortedJobs.map((app) => {
                        const statusStyle = getStatusStyles(app.status);

                        return (
                            <Card key={app._id} className="hover:shadow-md transition">
                                <CardHeader className="pb-2 flex flex-row items-start justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <div className="text-2xl hover:underline cursor-pointer font-medium flex items-center gap-2" onClick={() => {
                                                setSelectedJob(app.jobId);
                                                setTabValue("jobdetails");
                                                setPreviousTab("applications")
                                            }}>
                                                <Briefcase className="text-blue-600" size={18} />
                                                {app.jobId.title}


                                            </div>
                                        </CardTitle>
                                        <p className="text-muted-foreground text-sm mt-1">
                                            {app.jobId.company}
                                        </p>
                                    </div>
                                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${statusStyle.bgColor} ${statusStyle.textColor} text-sm font-medium`}>
                                        {statusStyle.icon}
                                        <span>{app.status}</span>
                                    </div>
                                </CardHeader>

                                <CardContent className="text-sm">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <span className="flex items-center gap-1 text-muted-foreground">
                                            <MapPin size={16} />
                                            {app.jobId.location}
                                        </span>
                                        <span className="flex items-center gap-1 text-muted-foreground">
                                            <Calendar size={16} />
                                            Applied on {formatDate(app.appliedAt)}
                                        </span>
                                    </div>
                                </CardContent>

                                <CardFooter className="pt-2 flex justify-between">
                                    <span className="text-sm font-medium">
                                        &#8377; {app.jobId.salary}/month
                                    </span>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal size={16} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem>Add Note</DropdownMenuItem>
                                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-500">
                                                Remove Application
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
export default ApplicationsPage