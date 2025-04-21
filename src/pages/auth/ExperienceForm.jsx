import { PlusCircle, Trash2, Briefcase, Building, Calendar, AlignLeft, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export default function ExperienceForm({ input, setInput }) {
    const [submitted, setSubmitted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    const handleChange = (index, field, value) => {
        const newExperiences = input.experience.map((exp, i) => {
            if (i === index) {
                return { ...exp, [field]: value };
            }
            return exp;
        });
        setInput({ ...input, experience: newExperiences });
    };

    const addExperience = () => {
        const newIndex = input.experience.length;
        setInput((prevInput) => ({
            ...prevInput,
            experience: [
                ...prevInput.experience,
                { jobTitle: "", companyName: "", startDate: "", endDate: "", description: "" }
            ]
        }));
        // Set the newly added experience as active
        setTimeout(() => setActiveIndex(newIndex), 100);
    };

    const removeExperience = (index) => {
        const newExperiences = input.experience.filter((_, i) => i !== index);
        setInput((prevInput) => ({
            ...prevInput,
            experience: newExperiences
        }));
        
        // Reset active index if the active card is removed
        if (activeIndex === index) {
            setActiveIndex(null);
        } else if (activeIndex > index) {
            // Adjust active index if a card before it is removed
            setActiveIndex(activeIndex - 1);
        }
    };

    const toggleExpand = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    };

    const submitHandler = () => {
        console.log(input.experience);
        const hasEmptyField = input.experience.some((exp) => {
            return (
                exp.jobTitle === "" ||
                exp.companyName === "" ||
                exp.startDate === "" ||
                exp.endDate === "" ||
                exp.description === ""
            );
        });
        if (hasEmptyField) {
            toast.error("Please fill all the experience fields.");
            return;
        }
        toast.success("Experience details saved successfully!");
        setSubmitted(true);
        console.log("Experience Data:", input.experience);
    };

    return (
        <div className="flex w-full overflow-y-auto items-center justify-center p-4 md:p-6">
            <div className="w-full max-w-3xl space-y-6">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Professional Experience</h2>
                    <p className="text-gray-500 mt-2">Add your work experience to showcase your professional journey</p>
                </div>

                {/* Experience Cards */}
                {input.experience.length > 0 ? (
                    <div className="space-y-4">
                        {input.experience.map((exp, index) => (
                            <div 
                                key={index} 
                                className={`border rounded-lg transition-all duration-200 ${
                                    activeIndex === index || submitted ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-white'
                                } ${submitted ? 'cursor-default' : 'cursor-pointer hover:border-blue-300'}`}
                            >
                                {/* Experience Card Header - Always Visible */}
                                <div 
                                    className="p-4 flex items-center justify-between"
                                    onClick={() => !submitted && toggleExpand(index)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                            exp.jobTitle ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                                        }`}>
                                            <Briefcase size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">
                                                {exp.jobTitle || "New Position"}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {exp.companyName ? (
                                                    <>
                                                        {exp.companyName} • {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                                                    </>
                                                ) : (
                                                    "Click to add details"
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {!submitted && (
                                        <div className="flex items-center space-x-2">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeExperience(index);
                                                }}
                                                className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Experience Form Fields - Expandable */}
                                {(activeIndex === index || submitted) && (
                                    <div className="p-4 pt-0 border-t border-gray-100">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor={`jobTitle-${index}`} className="flex items-center text-gray-700">
                                                    <Briefcase size={16} className="mr-2 text-gray-500" />
                                                    Job Title
                                                </Label>
                                                <Input
                                                    id={`jobTitle-${index}`}
                                                    type="text"
                                                    placeholder="Software Engineer"
                                                    value={exp.jobTitle}
                                                    onChange={(e) => handleChange(index, "jobTitle", e.target.value)}
                                                    className="focus:ring-blue-500 focus:border-blue-500"
                                                    disabled={submitted}
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor={`companyName-${index}`} className="flex items-center text-gray-700">
                                                    <Building size={16} className="mr-2 text-gray-500" />
                                                    Company Name
                                                </Label>
                                                <Input
                                                    id={`companyName-${index}`}
                                                    type="text"
                                                    placeholder="Google"
                                                    value={exp.companyName}
                                                    onChange={(e) => handleChange(index, "companyName", e.target.value)}
                                                    className="focus:ring-blue-500 focus:border-blue-500"
                                                    disabled={submitted}
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor={`startDate-${index}`} className="flex items-center text-gray-700">
                                                    <Calendar size={16} className="mr-2 text-gray-500" />
                                                    Start Date
                                                </Label>
                                                <Input
                                                    id={`startDate-${index}`}
                                                    type="month"
                                                    value={exp.startDate}
                                                    onChange={(e) => handleChange(index, "startDate", e.target.value)}
                                                    className="focus:ring-blue-500 focus:border-blue-500"
                                                    disabled={submitted}
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor={`endDate-${index}`} className="flex items-center text-gray-700">
                                                    <Calendar size={16} className="mr-2 text-gray-500" />
                                                    End Date
                                                </Label>
                                                <Input
                                                    id={`endDate-${index}`}
                                                    type="month"
                                                    value={exp.endDate}
                                                    onChange={(e) => handleChange(index, "endDate", e.target.value)}
                                                    className="focus:ring-blue-500 focus:border-blue-500"
                                                    disabled={submitted}
                                                    placeholder="Leave blank if current position"
                                                />
                                            </div>

                                            <div className="md:col-span-2 space-y-2">
                                                <Label htmlFor={`description-${index}`} className="flex items-center text-gray-700">
                                                    <AlignLeft size={16} className="mr-2 text-gray-500" />
                                                    Description
                                                </Label>
                                                <Textarea
                                                    id={`description-${index}`}
                                                    placeholder="Describe your responsibilities and achievements..."
                                                    value={exp.description}
                                                    onChange={(e) => handleChange(index, "description", e.target.value)}
                                                    className="min-h-24 focus:ring-blue-500 focus:border-blue-500"
                                                    disabled={submitted}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                        <Briefcase size={40} className="text-gray-400 mb-3" />
                        <p className="text-gray-500 text-center mb-4">No experience added yet. Add your work history to enhance your profile.</p>
                        <Button 
                            type="button" 
                            onClick={addExperience} 
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            <PlusCircle size={18} className="mr-2" /> Add Your First Experience
                        </Button>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    {!submitted && input.experience.length > 0 && (
                        <>
                            <Button 
                                type="button" 
                                onClick={addExperience} 
                                variant="outline"
                                className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                            >
                                <PlusCircle size={18} className="mr-2" /> Add Another Experience
                            </Button>
                            
                            <Button 
                                type="button" 
                                onClick={submitHandler} 
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                <CheckCircle size={18} className="mr-2" /> Save Experience
                            </Button>
                        </>
                    )}

                    {submitted && (
                        <div className="w-full p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                            <CheckCircle size={20} className="text-green-600 mx-auto mb-2" />
                            <p className="text-green-700 font-medium">Your experience has been successfully saved!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}