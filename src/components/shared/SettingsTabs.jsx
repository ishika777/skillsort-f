import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from './tabs/OverviewTab';
import EducationTab from './tabs/EducationTab';
import ExperienceTab from './tabs/ExperienceTab';

const SettingsTabs = ({formatDate }) => {

    const [activeTab, setActiveTab] = useState("overview");

    return (
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6"><OverviewTab formatDate={formatDate} /></TabsContent>
            <TabsContent value="education" className="space-y-6"><EducationTab /></TabsContent>
            <TabsContent value="experience" className="space-y-6"><ExperienceTab /></TabsContent>
        </Tabs>
    )
}

export default SettingsTabs