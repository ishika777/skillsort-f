import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// import { jsPDF } from "jspdf";

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    education: [{ degree: "", school: "", year: "" }],
    experience: [{ jobTitle: "", company: "", year: "" }],
    skills: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, index, field) => {
    const { value } = e.target;
    const updatedArray = [...resumeData[field]];
    updatedArray[index][field] = value;
    setResumeData((prev) => ({ ...prev, [field]: updatedArray }));
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", school: "", year: "" }],
    }));
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, { jobTitle: "", company: "", year: "" }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Resume data saved!");

    // You can save the data or integrate it with a backend here
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Resume", 20, 20);
    doc.setFontSize(14);

    doc.text(`Name: ${resumeData.name}`, 20, 40);
    doc.text(`Email: ${resumeData.email}`, 20, 50);
    doc.text(`Phone: ${resumeData.phone}`, 20, 60);
    doc.text(`Location: ${resumeData.location}`, 20, 70);
    doc.text(`Summary: ${resumeData.summary}`, 20, 80);

    doc.text("Education:", 20, 100);
    resumeData.education.forEach((edu, index) => {
      doc.text(`${edu.degree} - ${edu.school} (${edu.year})`, 20, 110 + index * 10);
    });

    doc.text("Experience:", 20, 130);
    resumeData.experience.forEach((exp, index) => {
      doc.text(`${exp.jobTitle} at ${exp.company} (${exp.year})`, 20, 140 + index * 10);
    });

    doc.text(`Skills: ${resumeData.skills}`, 20, 160);

    doc.save("resume.pdf");
  };

  return (
    <div className="tabs-scroll w-full p-6 overflow-y-auto h-[calc(100vh-64px)] pt-4">
      <h2 className="text-2xl font-semibold mb-4">Resume Builder</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details */}
        <div>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={resumeData.name}
            onChange={handleInputChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={resumeData.email}
            onChange={handleInputChange}
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={resumeData.phone}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="location"
            placeholder="Location"
            value={resumeData.location}
            onChange={handleInputChange}
          />
          <Textarea
            name="summary"
            placeholder="Summary"
            value={resumeData.summary}
            onChange={handleInputChange}
          />
        </div>

        {/* Education Section */}
        <div>
          <h3 className="text-xl font-medium">Education</h3>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="space-y-2">
              <Input
                type="text"
                name="degree"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleArrayChange(e, index, "degree")}
              />
              <Input
                type="text"
                name="school"
                placeholder="School"
                value={edu.school}
                onChange={(e) => handleArrayChange(e, index, "school")}
              />
              <Input
                type="text"
                name="year"
                placeholder="Year"
                value={edu.year}
                onChange={(e) => handleArrayChange(e, index, "year")}
              />
            </div>
          ))}
          <Button type="button" onClick={addEducation}>
            Add Education
          </Button>
        </div>

        {/* Experience Section */}
        <div>
          <h3 className="text-xl font-medium">Experience</h3>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="space-y-2">
              <Input
                type="text"
                name="jobTitle"
                placeholder="Job Title"
                value={exp.jobTitle}
                onChange={(e) => handleArrayChange(e, index, "jobTitle")}
              />
              <Input
                type="text"
                name="company"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleArrayChange(e, index, "company")}
              />
              <Input
                type="text"
                name="year"
                placeholder="Year"
                value={exp.year}
                onChange={(e) => handleArrayChange(e, index, "year")}
              />
            </div>
          ))}
          <Button type="button" onClick={addExperience}>
            Add Experience
          </Button>
        </div>

        {/* Skills Section */}
        <div>
          <Input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={resumeData.skills}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit">Save Resume</Button>
          <Button type="button" variant="secondary" onClick={generatePDF}>
            Generate PDF
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResumeBuilder;
