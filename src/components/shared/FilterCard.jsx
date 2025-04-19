import { useState } from 'react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Input } from '../ui/input';
import { XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

export default function JobFilterCard() {
    const [filters, setFilters] = useState({
        jobType: "",
        experience: "",
        qualification: "",
        location: "",
        skills: "",
        salary: [0, 200],
    });

    const jobTypes = ["Full-time", "Part-time"];
    const experiences = ["0-1", "1-3", "3-5", "5+"];
    const qualifications = ["High School", "Bachelor's", "Master's", "PhD"];
    const locations = ["On-Site", "Remote", "Hybrid"];

    const handleResetFilters = () => {
        setFilters({
            jobType: "",
            experience: "",
            qualification: "",
            location: "",
            skills: "",
            salary: [0, 200],
        });
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const formatSalary = (value) => {
        return value === 0 ? "$0k" :
            value === 200 ? "$200k+" :
                `$${value}k`;
    };

    return (
        <Card className="w-full h-full max-w-md shadow-md p-2">
            <CardHeader className="flex flex-row items-end justify-between">
                <Button
                    variant="link"
                    size="sm"
                    onClick={handleResetFilters}
                    className="text-black w-full justify-end"
                >
                    <span>Reset</span>
                </Button>
            </CardHeader>
            <CardContent className="tabs-scroll py-2 w-full flex flex-col gap-4 overflow-auto">
                {/* Job Type */}
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm font-medium">Job Type</label>
                    <div className="flex flex-wrap gap-2">
                        <Checkbox
                            checked={filters.jobType.includes("any")}
                            onChange={() => handleFilterChange('jobType', 'any')}
                            label="Any"
                            className="mr-2"
                        />
                        {jobTypes.map((type) => (
                            <Checkbox
                                key={type}
                                checked={filters.jobType.includes(type)}
                                onChange={() => handleFilterChange('jobType', type)}
                                label={type}
                                className="mr-2"
                            />
                        ))}
                    </div>
                </div>

                {/* Experience */}
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm font-medium">Experience (years)</label>
                    <div className="flex flex-wrap gap-2">
                        <Checkbox
                            checked={filters.experience.includes("any")}
                            onChange={() => handleFilterChange('experience', 'any')}
                            label="Any"
                            className="mr-2"
                        />
                        {experiences.map((exp) => (
                            <Checkbox
                                key={exp}
                                checked={filters.experience.includes(exp)}
                                onChange={() => handleFilterChange('experience', exp)}
                                label={`${exp} years`}
                                className="mr-2"
                            />
                        ))}
                    </div>
                </div>

                {/* Qualification */}
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm font-medium">Qualification</label>
                    <div className="flex flex-wrap gap-2">
                        <Checkbox
                            checked={filters.qualification.includes("any")}
                            onChange={() => handleFilterChange('qualification', 'any')}
                            label="Any"
                            className="mr-2"
                        />
                        {qualifications.map((qual) => (
                            <Checkbox
                                key={qual}
                                checked={filters.qualification.includes(qual)}
                                onChange={() => handleFilterChange('qualification', qual)}
                                label={qual}
                                className="mr-2"
                            />
                        ))}
                    </div>
                </div>

                {/* Work Location */}
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm font-medium">Work Location</label>
                    <div className="flex flex-wrap gap-2">
                        <Checkbox
                            checked={filters.location.includes("any")}
                            onChange={() => handleFilterChange('location', 'any')}
                            label="Any"
                            className="mr-2"
                        />
                        {locations.map((loc) => (
                            <Checkbox
                                key={loc}
                                checked={filters.location.includes(loc)}
                                onChange={() => handleFilterChange('location', loc)}
                                label={loc}
                                className="mr-2"
                            />
                        ))}
                    </div>
                </div>

                {/* Skills */}
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm font-medium">Skills</label>
                    <Input
                        placeholder="e.g. React, Python, SQL"
                        value={filters.skills}
                        onChange={(e) => handleFilterChange('skills', e.target.value)}
                    />
                </div>

                {/* Salary Range */}
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-between">
                        <label className="text-sm font-medium">Salary Range (k)</label>
                        <span className="text-sm text-gray-500">
                            {formatSalary(filters.salary[0])} - {formatSalary(filters.salary[1])}
                        </span>
                    </div>
                    <Slider
                        value={filters.salary}
                        min={0}
                        max={200}
                        step={10}
                        onValueChange={(value) => handleFilterChange('salary', value)}
                        className="my-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>$0k</span>
                        <span>$200k+</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-0">
                <Button className="w-full mt-2">Apply Filters</Button>
            </CardFooter>
        </Card>
    );
}
