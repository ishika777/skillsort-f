import DeleteAccount from "../shared/dialog/DeleteAccount";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Globe, Clock, GithubIcon, LinkedinIcon, Twitter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import SettingsTabs from "./SettingsTabs";
import { downloadResume, logout } from "@/actions/user-actions";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    const logoutHandler = async () => {
        const res = await logout(dispatch);
        if(res){
            navigate("/login")
        }
    }

    const handleClick = async() => {
        await downloadResume();
    }

    const inittials = user?.fullname?.split(" ").map(part => part[0]).join("").toUpperCase();

    return (
        <div className="tabs-scroll p-6 space-y-6 overflow-y-auto w-full h-[calc(100vh-64px)]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card className="mb-6">
                        <CardHeader className="flex flex-col items-center pb-2">
                            <div className="relative mb-2">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={user?.profilePicture} />
                                    <AvatarFallback className="text-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200">
                                        {inittials}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <CardTitle className="text-xl font-bold">{user?.fullname}</CardTitle>
                            <Badge variant="outline" className="mt-1 border-red-500 text-red-500">
                                {user?.role}
                            </Badge>
                            <div className="flex space-x-2 mt-3">
                                {user?.url?.linkedIn && (
                                    <Button variant="outline" size="icon" asChild className="rounded-full h-8 w-8">
                                        <a href={user?.url?.linkedIn} target="_blank" rel="noopener noreferrer">
                                            <LinkedinIcon />
                                        </a>
                                    </Button>
                                )}
                                {user?.url?.gitHub && (
                                    <Button variant="outline" size="icon" asChild className="rounded-full h-8 w-8">
                                        <a href={user?.url.gitHub} target="_blank" rel="noopener noreferrer">
                                            <GithubIcon />
                                        </a>
                                    </Button>
                                )}
                                {user?.url?.twitter && (
                                    <Button variant="outline" size="icon" asChild className="rounded-full h-8 w-8">
                                        <a href={user?.url?.twitter} target="_blank" rel="noopener noreferrer">
                                            <Twitter />
                                        </a>
                                    </Button>
                                )}
                                {user?.url?.portfolio && (
                                    <Button variant="outline" size="icon" asChild className="rounded-full h-8 w-8">
                                        <a href={user?.url?.portfolio} target="_blank" rel="noopener noreferrer">
                                            <Globe className="h-4 w-4" />
                                        </a>
                                    </Button>
                                )}
                            </div>

                            {user?.resume && (
                                    <Button variant="outline" className="w-full mt-4 text-red-500 border-2 border-red-500 hover:bg-white hover:text-red-500" onClick={handleClick}>
                                        Download Resume
                                    </Button>
                            
                            )}


                        </CardHeader>

                        <CardContent>
                            <Separator className="mb-4" />
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <Clock className="h-5 w-5 mr-2 text-gray-500" />
                                    <span className="text-sm">Member since {formatDate(user?.createdAt)}</span>
                                </div>
                            </div>

                            <Button className="bg-red-600 hover:bg-red-700 w-full mt-5 text-white hover:text-white" onClick={logoutHandler}>Logout</Button>

                            <div className="mt-4">
                                <DeleteAccount />
                            </div>
                        </CardContent>
                    </Card>


                </div>

                <div className="lg:col-span-2">
                    <SettingsTabs formatDate={formatDate} />
                </div>
            </div>
        </div>
    );
}

export default Settings