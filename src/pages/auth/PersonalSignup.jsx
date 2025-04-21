import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  PhoneCall, 
  User2, 
  LockKeyhole, 
  UploadCloud,
  ChevronRight,
  Info,
  Trash2
} from "lucide-react";
import EducationForm from "./EducationForm";
import SignupNav from "./SignupNav";
import { toast } from "sonner";

const PersonalSignup = ({ input, setInput, setActiveTab }) => {
  const [seePassword, setSeePassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [currentSection, setCurrentSection] = useState("personalInfo"); // 'personalInfo' or 'education'

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (file.size >= maxSize) {
      toast.error("File size should not exceed 5MB.");
      return;
    }
    
    setInput((prev) => ({
      ...prev,
      profilePicture: file,
    }));
    
    const imageURL = URL.createObjectURL(file);
    setProfileImage(imageURL);
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    setInput((prev) => ({
      ...prev,
      profilePicture: null,
    }));
  };

  const validatePersonalInfo = () => {
    if (!input.fullname || !input.email || !input.password || !input.contact) {
      toast.error("Please fill in all required fields");
      return false;
    }
    
    if (input.contact.length !== 10) {
      toast.error("Contact number must be exactly 10 digits");
      return false;
    }
    
    if (input.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }
    
    return true;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    // Final validation before proceeding
    if (!validatePersonalInfo()) {
      return;
    }
    
    if (!submitted) {
      toast.error("Please complete your education details before proceeding");
      setCurrentSection("education");
      return;
    }
    
    if (input.profilePicture && input.profilePicture.size >= 5 * 1024 * 1024) {
      toast.error("Profile image should not exceed 5MB");
      return;
    }
    
    toast.success("Personal details saved successfully!");
    setActiveTab("professional");
  };

  const continueToEducation = () => {
    if (validatePersonalInfo()) {
      setCurrentSection("education");
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-50">
      <SignupNav />
      
      <div className="flex-1 flex flex-col items-center py-6 px-4 md:px-0">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Progress Bar */}
          <div className="w-full bg-gray-100 h-2">
            <div className="bg-blue-600 h-2 transition-all duration-300" style={{ width: currentSection === "personalInfo" ? "50%" : "75%" }}></div>
          </div>
          
          {/* Section Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              className={`flex-1 py-4 font-medium text-sm transition-colors duration-200 ${
                currentSection === "personalInfo" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setCurrentSection("personalInfo")}
            >
              Personal Information
            </button>
            <button
              type="button"
              className={`flex-1 py-4 font-medium text-sm transition-colors duration-200 ${
                currentSection === "education" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => validatePersonalInfo() && setCurrentSection("education")}
            >
              Education Details
            </button>
          </div>
          
          <form onSubmit={submitHandler} className="p-6">
            {currentSection === "personalInfo" ? (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Profile Picture Upload Section */}
                  <div className="w-full md:w-1/3 flex flex-col items-center">
                    <Label className="mb-3 text-gray-700 font-medium">Profile Picture</Label>
                    <div className="relative w-40 h-40">
                      <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm bg-gray-50 flex items-center justify-center">
                        {profileImage || input.profilePicture ? (
                          <img 
                            src={profileImage} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User2 size={64} className="text-gray-300" />
                        )}
                      </div>
                      
                      <Input
                        id="profilePicture"
                        name="profilePicture"
                        type="file"
                        accept="image/*"
                        onChange={fileHandler}
                        className="hidden"
                      />
                      
                      <div className="absolute bottom-0 right-0 flex space-x-2">
                        <Label 
                          htmlFor="profilePicture" 
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white cursor-pointer shadow-md hover:bg-blue-700 transition-colors"
                        >
                          <UploadCloud size={18} />
                        </Label>
                        
                        {profileImage && (
                          <button
                            type="button"
                            onClick={removeProfileImage}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 text-white cursor-pointer shadow-md hover:bg-red-700 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      Upload a clear photo (max 5MB)
                    </p>
                  </div>
                  
                  {/* Personal Details Section */}
                  <div className="w-full md:w-2/3 space-y-5">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="fullname" className="text-gray-700">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="fullname"
                            type="text"
                            placeholder="John Doe"
                            name="fullname"
                            value={input.fullname}
                            onChange={changeHandler}
                            required
                            className="pl-10 py-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                          />
                          <User2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="email"
                            type="email"
                            placeholder="email@example.com"
                            name="email"
                            value={input.email}
                            onChange={changeHandler}
                            required
                            className="pl-10 py-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                          />
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact" className="text-gray-700">
                          Contact Number <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="contact"
                            type="number"
                            placeholder="1234567890"
                            name="contact"
                            value={input.contact}
                            onChange={changeHandler}
                            required
                            className="pl-10 py-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                          />
                          <PhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-500">Must be exactly 10 digits</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-700">
                          Password <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={seePassword ? "text" : "password"}
                            placeholder="••••••••"
                            name="password"
                            value={input.password}
                            onChange={changeHandler}
                            required
                            className="pl-10 py-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                          />
                          <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <button
                            type="button"
                            onClick={() => setSeePassword(!seePassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {seePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500">Minimum 8 characters</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 mt-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                      <Info size={16} className="mr-2 flex-shrink-0" />
                      <p>All information is kept secure and will only be shared with employers when you apply for jobs.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button
                    type="button"
                    onClick={continueToEducation}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                  >
                    Continue <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <EducationForm 
                  submitted={submitted} 
                  setSubmitted={setSubmitted} 
                  input={input} 
                  setInput={setInput} 
                />
                
                <div className="flex justify-between pt-4 border-t border-gray-100">
                  <Button
                    type="button"
                    onClick={() => setCurrentSection("personalInfo")}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Back to Personal Info
                  </Button>
                  
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                    disabled={!submitted}
                  >
                    Next Step <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalSignup;