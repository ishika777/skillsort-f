import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EmployeeSettings = () => {
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    location: "Delhi",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const updateProfile = (e) => {
    e.preventDefault();
    // Call backend API here
    toast.success("Profile updated successfully!");
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords do not match.");
      return;
    }
    // Call backend API here
    toast.success("Password changed successfully!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="tabs-scroll w-full p-6 overflow-y-auto h-[calc(100vh-64px)]">
      <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>

      {/* Profile Section */}
      <form onSubmit={updateProfile} className="mb-8 space-y-4">
        <h3 className="text-xl font-medium">Profile Information</h3>
        <Input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={profile.fullName}
          onChange={handleProfileChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleProfileChange}
        />
        <Input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={profile.phone}
          onChange={handleProfileChange}
        />
        <Input
          type="text"
          name="location"
          placeholder="Location"
          value={profile.location}
          onChange={handleProfileChange}
        />
        <Button type="submit">Update Profile</Button>
      </form>

      {/* Password Section */}
      <form onSubmit={changePassword} className="space-y-4">
        <h3 className="text-xl font-medium">Change Password</h3>
        <Input
          type="password"
          name="current"
          placeholder="Current Password"
          value={passwords.current}
          onChange={handlePasswordChange}
        />
        <Input
          type="password"
          name="new"
          placeholder="New Password"
          value={passwords.new}
          onChange={handlePasswordChange}
        />
        <Input
          type="password"
          name="confirm"
          placeholder="Confirm New Password"
          value={passwords.confirm}
          onChange={handlePasswordChange}
        />
        <Button type="submit" variant="secondary">
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default EmployeeSettings;
