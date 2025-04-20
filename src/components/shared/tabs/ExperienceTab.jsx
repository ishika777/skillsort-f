import React from 'react'
import { useSelector } from 'react-redux'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Building, Calendar } from "lucide-react";
import CompanyDetails from '../drawer/CompanyDetails';

const ExperienceTab = () => {
    const { user } = useSelector((state) => state.user)

    return (
        <Card>
            <CardHeader className="flex flex-row items-center">
                <div className="flex-1">
                    <CardTitle className="text-lg">Work Experience</CardTitle>
                    <CardDescription>Your professional background</CardDescription>
                </div>
                <CompanyDetails />
            </CardHeader>
            <CardContent>
                {user?.experience && user?.experience.length > 0 ? (
                    <div className="space-y-6">
                        {user?.experience.map((exp) => (
                            <div key={exp._id} className="flex-1">
                                <div className="flex items-start">
                                    <Briefcase className="h-5 w-5 mr-2 text-red-500 mt-1" />
                                    <div>
                                        <h3 className="font-medium text-lg">{exp.jobTitle}</h3>
                                        {exp.description && (
                                            <p className="text-sm text-gray-600 mb-2">{exp.description}</p>
                                        )}
                                        <div className="flex items-center text-gray-600">
                                            <Building className="h-4 w-4 mr-1" />
                                            <span className="text-sm">{exp.companyName}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 mt-1">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            <span className="text-sm">
                                                {exp.startDate?.slice(0, 7)} - {exp.endDate?.slice(0, 7)}
                                            </span>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                <div className="text-center py-8 text-gray-500">
                    <Building className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No work experience added yet</p>
                </div>
                )}
            </CardContent>
        </Card>
    )
}

export default ExperienceTab