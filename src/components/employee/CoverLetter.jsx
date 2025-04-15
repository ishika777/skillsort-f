import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// import { jsPDF } from "jspdf";

const CoverLetter = () => {
  const [coverLetterData, setCoverLetterData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    greeting: "",
    body: "",
    closing: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoverLetterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Cover letter data saved!");

    // You can save the data or integrate it with a backend here
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Cover Letter", 20, 20);
    doc.setFontSize(14);

    // Add Cover Letter content to PDF
    doc.text(`${coverLetterData.name}`, 20, 40);
    doc.text(`${coverLetterData.address}`, 20, 50);
    doc.text(`Email: ${coverLetterData.email}`, 20, 60);
    doc.text(`Phone: ${coverLetterData.phone}`, 20, 70);
    doc.text(`\n\n`, 20, 80); // Blank line
    doc.text(`Dear ${coverLetterData.company},`, 20, 90);
    doc.text(`\n${coverLetterData.greeting}`, 20, 100);
    doc.text(`\n${coverLetterData.body}`, 20, 110);
    doc.text(`\n\nSincerely,`, 20, 130);
    doc.text(`${coverLetterData.name}`, 20, 140);

    // Save the PDF
    doc.save("cover_letter.pdf");
  };

  return (
    <div className="tabs-scroll w-full p-6 overflow-y-auto h-[calc(100vh-64px)]">
      <h2 className="text-2xl font-semibold mb-4">Cover Letter Generator</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={coverLetterData.name}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="address"
            placeholder="Address"
            value={coverLetterData.address}
            onChange={handleInputChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={coverLetterData.email}
            onChange={handleInputChange}
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={coverLetterData.phone}
            onChange={handleInputChange}
          />
        </div>

        {/* Job Information */}
        <div>
          <Input
            type="text"
            name="company"
            placeholder="Company Name"
            value={coverLetterData.company}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={coverLetterData.jobTitle}
            onChange={handleInputChange}
          />
        </div>

        {/* Cover Letter Body */}
        <div>
          <Textarea
            name="greeting"
            placeholder="Greeting (e.g., I am writing to express my interest...)"
            value={coverLetterData.greeting}
            onChange={handleInputChange}
          />
          <Textarea
            name="body"
            placeholder="Body of the letter (Tell them about your skills and experience)"
            value={coverLetterData.body}
            onChange={handleInputChange}
          />
          <Textarea
            name="closing"
            placeholder="Closing (e.g., Thank you for considering my application.)"
            value={coverLetterData.closing}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit">Save Cover Letter</Button>
          <Button type="button" variant="secondary" onClick={generatePDF}>
            Generate PDF
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CoverLetter;
