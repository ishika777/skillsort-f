import React from 'react'
import { useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PersonalDetails from '../drawer/PersonalDetails';


const OverviewTab = ({ formatDate }) => {
    const { user } = useSelector((state) => state.user)
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center">
                    <div className="flex-1">Profile Overview</div>
                    <PersonalDetails />
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-medium text-gray-500 text-sm mb-1">Full Name</h3>
                        <p>{user.fullname}</p>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-500 text-sm mb-1">Email</h3>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-500 text-sm mb-1">Contact</h3>
                        <p>{user.contact}</p>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-500 text-sm mb-1">Role</h3>
                        <p>{user.role}</p>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-500 text-sm mb-1">Verification Status</h3>
                        <div className="flex items-center">
                            <Badge variant={user.isVerified ? "success" : "destructive"} className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                {user.isVerified ? "Verified" : "Not Verified"}
                            </Badge>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-500 text-sm mb-1">Last Login</h3>
                        <p>{formatDate(user.lastLogin)}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default OverviewTab