import React from 'react'
import { useSelector } from 'react-redux'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Building, GraduationCap, BookOpen } from "lucide-react";
import EducationDetails from '../drawer/EducationDetails';

const EducationTab = () => {
    const { user } = useSelector((state) => state.user)
    return (
        <Card>
            <CardHeader className="flex flex-row items-center">
                <div className="flex-1">
                    <CardTitle className="text-lg">Education History</CardTitle>
                    <CardDescription>Your academic background</CardDescription>
                </div>
                <EducationDetails />
            </CardHeader>
            <CardContent>
                {user.education && user.education.length > 0 ? (
                    <div className="space-y-6">
                        {user.education.map((edu) => (
                            <div key={edu._id} className="flex border-l-4 border-red-500 pl-4 py-1">
                                <div className="flex-1">
                                    <div className="flex items-start">
                                        <GraduationCap className="h-5 w-5 mr-2 text-red-500 mt-1" />
                                        <div>
                                            <h3 className="font-medium text-lg">{edu.degree}</h3>
                                            <div className="flex items-center text-gray-600">
                                                <Building className="h-4 w-4 mr-1" />
                                                <span className="text-sm">{edu.institution}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600 mt-1">
                                                <Calendar className="h-4 w-4 mr-1" />
                                                <span className="text-sm">{edu.startYear} - {edu.endYear}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-30" />
                        <p>No education history added yet</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default EducationTab