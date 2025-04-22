import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React, { useState } from 'react'
import { User, Briefcase, ArrowLeft, CheckCircle2 } from "lucide-react"
import PersonalSignup from "./PersonalSignup"
import ProfessionalSignup from "./ProfessionalSignup"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

const SignupTabs = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: "",
        contact: "",
        resume: null,
        profilePicture: null,
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
    })

    const [activeTab, setActiveTab] = useState('personal')

    const handleTabChange = (tabValue) => {
        setActiveTab(tabValue)
    }

    const isPersonalComplete = input.fullname && input.email && input.password && input.contact

    return (
        <div className="h-screen w-screen flex flex-col">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="flex flex-row h-full w-full">
                <div className="h-full bg-gradient-to-b from-red-500 to-red-600 text-white w-64">
                    <div className="flex flex-col h-full justify-between">
                        <div className="p-6">
                            <h2 className="font-bold text-xl mb-8">Create Account</h2>
                            
                            <TabsList className="flex flex-col bg-transparent space-y-2 w-full">
                                <TabsTrigger
                                    value="personal"
                                    className={`flex items-center justify-start w-full px-4 py-3 rounded-lg text-left transition-all ${
                                        activeTab === 'personal' 
                                            ? 'bg-white/15 shadow-sm font-medium' 
                                            : 'hover:bg-white/10 text-white/90'
                                    }`}
                                >
                                    <div className="flex items-center justify-center mr-3 h-7 w-7 rounded-full bg-white/20">
                                        <User size={16} />
                                    </div>
                                    <span className="flex-1">Personal Details</span>
                                    {isPersonalComplete && (
                                        <CheckCircle2 size={24} className="text-white" />
                                    )}
                                </TabsTrigger>
                                
                                <TabsTrigger
                                    value="professional"
                                    className={`flex items-center justify-start w-full px-4 py-3 rounded-lg text-left transition-all ${
                                        activeTab === 'professional' 
                                            ? 'bg-white/15 shadow-sm font-medium' 
                                            : 'hover:bg-white/10 text-white/90'
                                    }`}
                                    disabled={!isPersonalComplete}
                                >
                                    <div className="flex items-center justify-center mr-3 h-7 w-7 rounded-full bg-white/20">
                                        <Briefcase size={16} />
                                    </div>
                                    <span className="flex-1">Professional Details</span>
                                </TabsTrigger>
                            </TabsList>
                            
                            <div className="mt-8 text-sm text-white/80">
                                <p>Complete both sections to finish your registration.</p>
                            </div>
                        </div>
                        
                        <div className="p-6 border-t border-white/10">
                            <p className="text-sm text-white/90 mb-3">Already have an account?</p>
                            <Button 
                                variant="outline" 
                                className="w-full bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white hover:border-white/30"
                                onClick={() => navigate('/login')}
                            >
                                Sign in
                            </Button>
                        </div>
                    </div>
                </div>
                
                <div className="flex-1 bg-white h-full">
                    <TabsContent value={activeTab} className="mt-0 h-full outline-none focus:outline-none">
                        {activeTab === 'personal' ? (
                            <PersonalSignup input={input} setInput={setInput} setActiveTab={setActiveTab} />
                        ) : (
                            <ProfessionalSignup input={input} setInput={setInput} />
                        )}
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}

export default SignupTabs