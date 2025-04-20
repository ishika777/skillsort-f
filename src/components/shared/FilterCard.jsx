import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Slider } from '../ui/slider';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

export default function JobFilterCard() {
    const [filters, setFilters] = useState({
        jobType: [],
        experience: [],
        qualification: [],
        location: [],
        skills: '',
        salary: [0, 200],
    });

    const jobType = ["Full-time", "Part-time"];
    const experience = ["0-1", "1-3", "3-5", "5+"];
    const qualification = ["High School", "Bachelor's", "Master's", "PhD"];
    const location = ["On-Site", "Remote", "Hybrid"];

    const handleResetFilters = () => {
        setFilters({
            jobType: [],
            experience: [],
            qualification: [],
            location: [],
            skills: '',
            salary: [0, 200],
        });
    };

    const handleCheckboxChange = (key, value) => {
        setFilters((prev) => {
            const isSelected = prev[key].includes(value);
            const updatedValues = isSelected
                ? prev[key].filter((item) => item !== value)
                : [...prev[key], value];
            return {
                ...prev,
                [key]: updatedValues,
            };
        });
    };

    const applyFilter = () => {
        filters.skills = filters.skills.split(',').map((skill) => skill.trim())
        console.log(filters)
    }

    const formatSalary = (value) => {
        return value === 0 ? "10k" :
            value === 200 ? "200k+" :
                `${value}k`;
    };

    return (
        <Card className="w-full h-full max-w-md shadow-md p-2">
            <CardHeader className="flex flex-row items-end justify-end">
                <Button
                    variant="link"
                    size="sm"
                    onClick={handleResetFilters}
                    className="text-black"
                >
                    Reset
                </Button>
            </CardHeader>

            <CardContent className="tabs-scroll py-2 w-full flex flex-col gap-4 overflow-auto">
                {/* Job Type */}
                <div className="flex flex-col gap-2 w-full">
                    <Label className="text-sm font-medium">Job Type</Label>
                    <div className="flex flex-col items-start gap-2 ml-3">
                        {jobType.map((type) => (
                            <div className='flex items-center cursor-pointer' key={type}>
                                <Checkbox
                                    id={type}
                                    checked={filters.jobType.includes(type)}
                                    onCheckedChange={() => handleCheckboxChange('jobType', type)}
                                    className="mr-2"
                                />
                                <Label htmlFor={type}>{type}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experience */}
                <div className="flex flex-col gap-2 w-full">
                    <Label className="text-sm font-medium mt-2">Experience (years)</Label>
                    <div className="flex flex-col items-start gap-2 ml-3">
                        {experience.map((exp) => (
                            <div className='flex items-center cursor-pointer' key={exp}>
                                <Checkbox
                                id={exp}
                                    checked={filters.experience.includes(exp)}
                                    onCheckedChange={() => handleCheckboxChange('experience', exp)}
                                    className="mr-2"
                                />
                                <Label htmlFor={exp}>{exp} year(s)</Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Qualification */}
                <div className="flex flex-col gap-2 w-full">
                    <Label className="text-sm font-medium mt-2">Qualification</Label>
                    <div className="flex flex-col items-start gap-2 ml-3">
                        {qualification.map((qual) => (
                            <div className='flex items-center cursor-pointer' key={qual}>
                                <Checkbox
                                id={qual}
                                    checked={filters.qualification.includes(qual)}
                                    onCheckedChange={() => handleCheckboxChange('qualification', qual)}
                                    className="mr-2"
                                />
                                <Label htmlFor={qual}>{qual}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-2 w-full">
                    <Label className="text-sm font-medium mt-2">Work Location</Label>
                    <div className="flex flex-col items-start gap-2 ml-3">
                        {location.map((loc) => (
                            <div className='flex items-center cursor-pointer' key={loc}>
                                <Checkbox
                                id={loc}
                                    checked={filters.location.includes(loc)}
                                    onCheckedChange={() => handleCheckboxChange('location', loc)}
                                    className="mr-2"
                                />
                                <Label htmlFor={loc}>{loc}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills Input */}
                <div className="flex flex-col gap-2 w-full">
                    <Label className="text-sm font-medium">Skills</Label>
                    <Input
                        placeholder="e.g. React, Python, SQL"
                        value={filters.skills}
                        onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
                    />
                </div>

                {/* Salary Range Slider */}
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
                        max={199}
                        step={10}
                        onValueChange={(value) => setFilters({ ...filters, salary: value })}
                        className="my-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>10k</span>
                        <span>200k+</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-0">
                <Button onClick={applyFilter} className="w-full mt-2">Apply Filters</Button>
            </CardFooter>
        </Card>
    );
}
