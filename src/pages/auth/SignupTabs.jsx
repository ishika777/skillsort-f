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

    // Check if personal details are filled
    const isPersonalComplete = input.fullname && input.email && input.password && input.contact

    return (
        <div className="h-full w-full flex flex-col">
            <div className="absolute top-4 left-4">
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate('/')}
                    className="flex items-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </div>
            
            <Tabs value={activeTab} onValueChange={handleTabChange} className="flex flex-col md:flex-row h-full w-full">
                {/* Sidebar for larger screens */}
                <div className="md:h-full bg-gradient-to-b from-red-600 to-red-700 text-white md:w-64 lg:w-72">
                    <div className="flex flex-col h-full justify-between">
                        <div className="p-6">
                            <h2 className="font-bold text-xl mb-6">Create Account</h2>
                            
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
                                        <CheckCircle2 size={16} className="text-green-300" />
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
                            <p className="text-sm text-white/80 mb-3">Already have an account?</p>
                            <Button 
                                variant="outline" 
                                className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/30"
                                onClick={() => navigate('/login')}
                            >
                                Sign in
                            </Button>
                        </div>
                    </div>
                </div>
                
                {/* Main content */}
                <div className="flex-1 bg-white dark:bg-gray-900 overflow-y-auto">
                    {/* Progress indicator for mobile */}
                    <div className="md:hidden flex items-center justify-between px-6 py-4 border-b dark:border-gray-800">
                        <div className="flex items-center space-x-4">
                            <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
                                activeTab === 'personal' || isPersonalComplete ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500 dark:bg-gray-700'
                            }`}>
                                {isPersonalComplete ? <CheckCircle2 size={16} /> : '1'}
                            </div>
                            <div className={`h-0.5 w-6 ${
                                isPersonalComplete ? 'bg-red-500' : 'bg-gray-200 dark:bg-gray-700'
                            }`}></div>
                            <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
                                activeTab === 'professional' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500 dark:bg-gray-700'
                            }`}>
                                2
                            </div>
                        </div>
                        <div className="text-sm font-medium">
                            Step {activeTab === 'personal' ? '1/2' : '2/2'}
                        </div>
                    </div>
                    
                    <TabsContent value={activeTab} className="mt-0 outline-none focus:outline-none">
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