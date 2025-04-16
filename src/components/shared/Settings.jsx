import DeleteAccount from "../shared/dialog/DeleteAccount";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Globe, Clock, GithubIcon, LinkedinIcon, Twitter } from "lucide-react";
import { useSelector } from "react-redux";
import SettingsDetails from "../shared/SettingsDetails";

const Settings = () => {
    const { user } = useSelector((state) => state.user)

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    const getInitials = (name) => {
        return name.split(" ").map(part => part[0]).join("").toUpperCase();
    };

    return (
        <div className="tabs-scroll p-6 space-y-6 overflow-y-auto w-full h-[calc(100vh-64px)]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card className="mb-6">
                        <CardHeader className="flex flex-col items-center pb-2">
                            <div className="relative mb-2">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src="/api/placeholder/150/150" alt={user.fullname} />
                                    <AvatarFallback className="text-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200">
                                        {getInitials(user.fullname)}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <CardTitle className="text-xl font-bold">{user.fullname}</CardTitle>
                            <Badge variant="outline" className="mt-1 border-red-500 text-red-500">
                                {user.role}
                            </Badge>
                            <div className="flex space-x-2 mt-3">
                                {user.url.linkedIn && (
                                    <Button variant="outline" size="icon" asChild className="rounded-full h-8 w-8">
                                        <a href={user.url.linkedIn} target="_blank" rel="noopener noreferrer">
                                            <LinkedinIcon />
                                        </a>
                                    </Button>
                                )}
                                {user.url.gitHub && (
                                    <Button variant="outline" size="icon" asChild className="rounded-full h-8 w-8">
                                        <a href={user.url.gitHub} target="_blank" rel="noopener noreferrer">
                                            <GithubIcon />
                                        </a>
                                    </Button>
                                )}
                                {user.url.twitter && (
                                    <Button variant="outline" size="icon" asChild className="rounded-full h-8 w-8">
                                        <a href={user.url.twitter} target="_blank" rel="noopener noreferrer">
                                            <Twitter />
                                        </a>
                                    </Button>
                                )}
                                {user.url.portfolio && (
                                    <Button variant="outline" size="icon" asChild className="rounded-full h-8 w-8">
                                        <a href={user.url.portfolio} target="_blank" rel="noopener noreferrer">
                                            <Globe className="h-4 w-4" />
                                        </a>
                                    </Button>
                                )}
                            </div>

                            {user.resume && (
                                <Button variant="outline" className="w-full">
                                    View Resume
                                </Button>
                            )}
                        </CardHeader>

                        <CardContent>
                            <Separator className="my-4" />
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <Clock className="h-5 w-5 mr-2 text-gray-500" />
                                    <span className="text-sm">Member since {formatDate(user.createdAt)}</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <DeleteAccount />

                            </div>
                        </CardContent>
                    </Card>


                </div>

                <div className="lg:col-span-2">
                    <SettingsDetails formatDate={formatDate} />
                </div>
            </div>
        </div>
    );
}

export default Settings