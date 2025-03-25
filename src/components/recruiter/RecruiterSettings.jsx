import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import PersonalDetails from "./drawer/PersonalDetails";
import CompanyDetails from "./drawer/CompanyDetails";
import DeleteAccount from "./dialog/DeleteAccount";

export default function RecruiterSettings() {
    return (
        <div className="tabs-scroll w-full p-6 overflow-y-auto h-[calc(100vh-64px)]">
            <h2 className="text-2xl font-semibold mb-6"><Settings2 /> Recruiter Settings</h2>

            <PersonalDetails />
            <CompanyDetails />

            <div>
                job history
            </div>

            <Button variant="destructive" className="p-0">
                <DeleteAccount />
            </Button>

            {/* <Card className="mb-6">
        <CardHeader>
          <CardTitle>🔔 Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Email Alerts for New Applications</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span>Shortlisted Candidates Notifications</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span>Job Expiry Reminders</span>
            <Switch />
          </div>
        </CardContent>
      </Card> */}
            {/* <Card className="mb-6">
        <CardHeader>
          <CardTitle>🔒 Privacy & Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Enable Two-Factor Authentication (2FA)</span>
            <Switch />
          </div>
        </CardContent>
      </Card> */}
        </div>
    );
}
