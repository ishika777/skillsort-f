import React from 'react'
import { useSelector } from 'react-redux'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";
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
                {user.experience && user.experience.length > 0 ? (
                    <div className="space-y-6">
                        {user.experience.map((exp) => (
                            <div key={exp._id}>
                                {/* Experience item */}
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