import { useState } from 'react';
import {
    Briefcase, MapPin, Calendar, Filter, Search,
    ChevronDown, ArrowUpDown, MoreHorizontal,
    Clock, CheckCircle, XCircle, BriefcaseBusiness,
    Building, IndianRupee, ExternalLink
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useSelector } from 'react-redux';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    switch (status.toLowerCase()) {
        case "applied":
            return {
                icon: <Clock size={16} className="text-blue-600" />,
                bgColor: "bg-blue-100",
                textColor: "text-blue-700",
                borderColor: "border-blue-200"
            };
        case "shortlisted":
            return {
                icon: <CheckCircle size={16} className="text-green-600" />,
                bgColor: "bg-green-100",
                textColor: "text-green-700",
                borderColor: "border-green-200"
            };
        case "rejected":
            return {
                icon: <XCircle size={16} className="text-red-600" />,
                bgColor: "bg-red-100",
                textColor: "text-red-700",
                borderColor: "border-red-200"
            };
        default:
            return {
                icon: <Clock size={16} className="text-gray-600" />,
                bgColor: "bg-gray-100",
                textColor: "text-gray-700",
                borderColor: "border-gray-200"
            };
    }
};

const ApplicationsPage = ({setSelectedJob, setTabValue, setPreviousTab}) => {
    const { appliedJobs } = useSelector((state) => state.application);
    
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Count applications by status
    const counts = {
        all: appliedJobs?.length || 0,
        applied: appliedJobs?.filter(app => app.status.toLowerCase() === "applied").length || 0,
        shortlisted: appliedJobs?.filter(app => app.status.toLowerCase() === "shortlisted").length || 0,
        rejected: appliedJobs?.filter(app => app.status.toLowerCase() === "rejected").length || 0
    };

    // Filter applications based on active filter and search term
    const filteredJobs = appliedJobs?.filter(app => {
        const matchesFilter =
            activeFilter === "all" ||
            app.status.toLowerCase() === activeFilter.toLowerCase();

        const matchesSearch =
            app.jobId.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.jobId.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.jobId.location.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    }) || [];

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

    const getSortLabel = () => {
        switch(sortBy) {
            case "date": return "Date Applied";
            case "company": return "Company";
            case "title": return "Job Title";
            default: return "Sort";
        }
    };

    const viewJobDetails = (job) => {
        setSelectedJob(job);
        setTabValue("jobdetails");
        setPreviousTab("applications");
    };

    return (
        
        <div className="tabs-scroll w-full p-6 overflow-y-auto h-full pt-4">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className={`relative flex-grow transition-all ${isSearchFocused ? 'ring-2 ring-blue-200 rounded-md' : ''}`}>
                    <Search className={`absolute left-3 top-3 ${isSearchFocused ? 'text-blue-500' : 'text-gray-400'} transition-colors`} size={16} />
                    <Input
                        placeholder="Search by job title, company, or location..."
                        className="pl-9 bg-white border-gray-200 focus-visible:ring-blue-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                    {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm("")}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                            <XCircle size={16} />
                        </button>
                    )}
                </div>

                <div className="flex gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="flex items-center gap-2 bg-white border-gray-200 hover:bg-gray-50">
                                            <ArrowUpDown size={16} className="text-gray-500" />
                                            <span className="hidden md:inline">{getSortLabel()}</span>
                                            <span className="inline md:hidden">Sort</span>
                                            <ChevronDown size={14} className="text-gray-500" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuItem 
                                            onClick={() => setSortBy("date")}
                                            className={sortBy === "date" ? "bg-blue-50 text-blue-600" : ""}
                                        >
                                            <Calendar size={16} className="mr-2" />
                                            Date Applied
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                            onClick={() => setSortBy("company")}
                                            className={sortBy === "company" ? "bg-blue-50 text-blue-600" : ""}
                                        >
                                            <Building size={16} className="mr-2" />
                                            Company
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                            onClick={() => setSortBy("title")}
                                            className={sortBy === "title" ? "bg-blue-50 text-blue-600" : ""}
                                        >
                                            <Briefcase size={16} className="mr-2" />
                                            Job Title
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Sort applications</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" className="flex items-center gap-2 bg-white border-gray-200 hover:bg-gray-50">
                                    <Filter size={16} className="text-gray-500" />
                                    <span className="hidden md:inline">Filters</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Additional filters</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveFilter} value={activeFilter}>
                <TabsList className="flex w-full grid-cols-4 bg-gray-100 p-1 rounded-lg h-auto">
                    <TabsTrigger 
                        value="all" 
                        className="flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow rounded-md py-2"
                    >
                        All
                        <Badge variant="outline" className="ml-2 bg-white">{counts.all}</Badge>
                    </TabsTrigger>
                    <TabsTrigger 
                        value="applied" 
                        className="flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow rounded-md py-2"
                    >
                        Applied
                        <Badge variant="outline" className="ml-2 bg-white">{counts.applied}</Badge>
                    </TabsTrigger>
                    <TabsTrigger 
                        value="shortlisted" 
                        className="flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow rounded-md py-2"
                    >
                        Shortlisted
                        <Badge variant="outline" className="ml-2 bg-white">{counts.shortlisted}</Badge>
                    </TabsTrigger>
                    <TabsTrigger 
                        value="rejected" 
                        className="flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow rounded-md py-2"
                    >
                        Rejected
                        <Badge variant="outline" className="ml-2 bg-white">{counts.rejected}</Badge>
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            {sortedJobs.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300 shadow-sm">
                    <div className="bg-gray-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Briefcase className="text-gray-500" size={32} />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No applications found</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                        {searchTerm || activeFilter !== "all"
                            ? "Try changing your search terms or filters"
                            : "Start applying to jobs to track your application progress"}
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">Find Jobs</Button>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {sortedJobs.map((app) => {
                        const statusStyle = getStatusStyles(app.status);

                        return (
                            <Card key={app._id} className="hover:shadow-md transition overflow-hidden border-gray-200">
                                <div className={`h-1 w-full ${statusStyle.bgColor}`}></div>
                                <CardHeader className="pb-2 pt-4">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                        <div className="flex-grow">
                                            <CardTitle className="text-lg font-semibold mb-1 group">
                                                <button 
                                                    onClick={() => viewJobDetails(app.jobId)}
                                                    className="hover:text-blue-600 flex items-center gap-2 transition-colors text-left"
                                                >
                                                    <BriefcaseBusiness className="text-blue-600 flex-shrink-0" size={20} />
                                                    <span className="group-hover:underline">{app.jobId.title}</span>
                                                    <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </button>
                                            </CardTitle>
                                            <div className="flex items-center gap-2">
                                                <Building size={14} className="text-gray-500" />
                                                <p className="text-gray-600 font-medium">{app.jobId.company}</p>
                                            </div>
                                        </div>
                                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${statusStyle.bgColor} ${statusStyle.textColor} text-sm font-medium border ${statusStyle.borderColor}`}>
                                            {statusStyle.icon}
                                            <span>{app.status}</span>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="text-sm py-3">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <span className="flex items-center gap-1.5 text-gray-500">
                                            <MapPin size={16} className="text-gray-500" />
                                            {app.jobId.location}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-gray-500">
                                            <Calendar size={16} className="text-gray-500" />
                                            Applied on {formatDate(app.appliedAt)}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-gray-500">
                                            <IndianRupee size={16} className="text-gray-500" />
                                            <span className="font-medium">₹{app.jobId.salary}/month</span>
                                        </span>
                                    </div>
                                </CardContent>

                                <CardFooter className="pt-1 pb-3 border-t border-gray-100 flex justify-between items-center">
                                    <div className="text-xs text-gray-500">
                                        Application ID: {app._id.substring(0, 8)}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button 
                                            variant="outline"
                                            size="sm"
                                            className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-white"
                                            onClick={() => viewJobDetails(app.jobId)}
                                        >
                                            View Details
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <MoreHorizontal size={16} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuItem>Add Note</DropdownMenuItem>
                                                <DropdownMenuItem>Update Status</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-50">
                                                    Remove Application
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default ApplicationsPage;