import React from 'react'
import { Button } from '../ui/button'
import { Home, FileText, Folder, Star, BarChart, Mail, Settings } from "lucide-react";

const DashSidebar = () => {
  return (
    <aside className="w-64 bg-gray-200 text-white p-5 space-y-6 overflow-y-auto h-[calc(100vh-64px)]">
    <h2 className="text-2xl font-semibold">Recruiter Dashboard</h2>
    <nav className="space-y-3">
        <Button variant="ghost" className="w-full text-left flex items-center gap-2">
            <Home size={20} /> Dashboard
        </Button>
        <Button variant="ghost" className="w-full text-left flex items-center gap-2">
            <FileText size={20} /> Job Postings
        </Button>
        <Button variant="ghost" className="w-full text-left flex items-center gap-2">
            <Folder size={20} /> Resume Analysis
        </Button>
        <Button variant="ghost" className="w-full text-left flex items-center gap-2">
            <Star size={20} /> Shortlisted Candidates
        </Button>
        <Button variant="ghost" className="w-full text-left flex items-center gap-2">
            <BarChart size={20} /> Analytics & Reports
        </Button>
        <Button variant="ghost" className="w-full text-left flex items-center gap-2">
            <Mail size={20} /> Messages
        </Button>
        <Button variant="ghost" className="w-full text-left flex items-center gap-2">
            <Settings size={20} /> Settings
        </Button>
    </nav>
</aside>
  )
}

export default DashSidebar