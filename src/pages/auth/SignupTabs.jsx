import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React, { useState } from 'react'
import { Home, FileText } from "lucide-react";
import PersonalSignup from "./PersonalSignup";
import ProfessionalSignup from "./ProfessionalSignup";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";


const SignupTabs = () => {

    const navigate = useNavigate();
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: "",
        contact: "",
        resume: "",
        profilePicture: "",
        url: {
            linkedIn: "",
            gitHub: "",
            twitter: "",
            portfolio: "",
        },
        experience: [],
        education: [
            {
                degree: "",
                institution: "",
                startYear: "",
                endYear: "",
            }
        ],
        role: "Employee"
    });

    const [activeTab, setActiveTab] = useState('personal'); // State to track active tab

    const handleTabChange = (tabValue) => {
        setActiveTab(tabValue); // Function to change active tab
    };

    return (
        <div className="h-screen w-screen flex flex-col justify-between items-center">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="flex flex-row bg-red-500 gap-0 h-screen w-full">
                <div className="flex h-full">
                    <div className="flex flex-col justify-between">
                        <TabsList className="flex flex-col p-2 mt-3 gap-3 justify-start items-start bg-red-500 rounded-none min-w-[200px] w-fit h-fit">
                            <TabsTrigger
                                value="personal"
                                className={`hover:bg-red-700 text-white mb-2 py-2 h-fit w-full `}
                                onClick={() => handleTabChange('personal')}
                            >
                                <Home size={20} /> Personal Details
                            </TabsTrigger>
                            <TabsTrigger
                                value="professional"
                                className={`hover:bg-red-700 text-white py-2 mb-2 h-fit w-full`}
                                onClick={() => handleTabChange('professional')}
                            >
                                <FileText size={20} /> Professional Details
                            </TabsTrigger>
                        </TabsList>
                        <div className="flex items-center justify-center">
                            <Button className="w-4/5 hover:bg-gray-900 mb-3" onClick={() => navigate('/login')}>
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 bg-white overflow-y-auto">
                    <TabsContent value={activeTab}>
                        {activeTab === 'personal' ? (
                            <PersonalSignup input={input} setInput={setInput} setActiveTab={setActiveTab} />
                        ) : (
                            <ProfessionalSignup input={input} setInput={setInput}  />
                        )}
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}

export default SignupTabs




