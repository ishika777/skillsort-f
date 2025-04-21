import { PlusCircle, Trash2, GraduationCap, School, CalendarClock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EducationForm = ({ input, setInput, submitted, setSubmitted }) => {
    const handleChange = (index, field, value) => {
        const newEducations = input.education.map((edu, i) => {
            if (i === index) {
                return { ...edu, [field]: value };
            }
            return edu;
        });
        setInput({ ...input, education: newEducations });
    };

    const addEducation = () => {
        setInput((prevInput) => ({
            ...prevInput,
            education: [
                ...prevInput.education,
                { degree: "", institution: "", startYear: "", endYear: "" }
            ]
        }));
    };

    const removeEducation = (index) => {
        const newEducations = input.education.filter((_, i) => i !== index);
        setInput((prevInput) => ({
            ...prevInput,
            education: newEducations
        }));
    };

    const submitHandler = () => {
        const hasEmptyField = input.education.some((edu) => {
            return (!edu.degree || !edu.institution || !edu.startYear || !edu.endYear);
        });
        const invalidTimeline = input.education.some((edu) => {
            return Number(edu.startYear) >= Number(edu.endYear);
        });
        
        if (hasEmptyField) {
            toast.error("Please fill all the education fields.");
            return;
        }
        if (invalidTimeline) {
            toast.error("End year must be after start year.");
            return;
        }
        setSubmitted(true);
    };

    return (
        <div className="flex flex-col w-full bg-white rounded-lg border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <GraduationCap className="text-blue-600" size={24} />
                    <h2 className="text-xl font-semibold text-gray-800">Education Details</h2>
                </div>
                
                {!submitted && (
                    <Button 
                        type="button" 
                        onClick={addEducation} 
                        variant="outline"
                        className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 text-blue-600"
                    >
                        <PlusCircle size={16} /> Add Education
                    </Button>
                )}
            </div>

            <div className="space-y-6">
                {input.education.map((edu, index) => (
                    <div 
                        key={index} 
                        className="p-4 border rounded-lg bg-gray-50 relative hover:shadow-sm transition-shadow"
                    >
                        <div className="absolute top-3 right-3 flex items-center gap-2">
                            {index > 0 && !submitted && (
                                <button
                                    type="button"
                                    onClick={() => removeEducation(index)}
                                    className="p-1 rounded-full bg-white text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                                    title="Remove education"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                                <Label 
                                    className="flex items-center gap-1 text-gray-700" 
                                    htmlFor={`degree-${index}`}
                                >
                                    <GraduationCap size={16} />
                                    Degree
                                </Label>
                                <Input
                                    id={`degree-${index}`}
                                    type="text"
                                    placeholder="B.Tech in Computer Science"
                                    value={edu.degree}
                                    onChange={(e) => handleChange(index, "degree", e.target.value)}
                                    className="border-gray-300 focus:border-blue-400 focus:ring-blue-400"
                                    disabled={submitted}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label 
                                    className="flex items-center gap-1 text-gray-700" 
                                    htmlFor={`institution-${index}`}
                                >
                                    <School size={16} />
                                    Institution
                                </Label>
                                <Input
                                    id={`institution-${index}`}
                                    type="text"
                                    placeholder="XYZ University"
                                    value={edu.institution}
                                    onChange={(e) => handleChange(index, "institution", e.target.value)}
                                    className="border-gray-300 focus:border-blue-400 focus:ring-blue-400"
                                    disabled={submitted}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label 
                                    className="flex items-center gap-1 text-gray-700" 
                                    htmlFor={`startYear-${index}`}
                                >
                                    <CalendarClock size={16} />
                                    Start Year
                                </Label>
                                <Input
                                    id={`startYear-${index}`}
                                    type="number"
                                    placeholder="YYYY"
                                    min="1900"
                                    max="2099"
                                    step="1"
                                    value={edu.startYear}
                                    onChange={(e) => handleChange(index, "startYear", e.target.value)}
                                    className="border-gray-300 focus:border-blue-400 focus:ring-blue-400"
                                    disabled={submitted}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label 
                                    className="flex items-center gap-1 text-gray-700" 
                                    htmlFor={`endYear-${index}`}
                                >
                                    <CalendarClock size={16} />
                                    End Year
                                </Label>
                                <Input
                                    id={`endYear-${index}`}
                                    type="number"
                                    placeholder="YYYY"
                                    min="1900"
                                    max="2099"
                                    step="1"
                                    value={edu.endYear}
                                    onChange={(e) => handleChange(index, "endYear", e.target.value)}
                                    className="border-gray-300 focus:border-blue-400 focus:ring-blue-400"
                                    disabled={submitted}
                                    required
                                />
                                {Number(edu.startYear) >= Number(edu.endYear) && edu.startYear && edu.endYear && (
                                    <p className="text-red-500 text-sm mt-1">End year must be after start year</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {input.education.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-lg border border-dashed">
                        <GraduationCap size={40} className="text-gray-300 mb-3" />
                        <p className="text-gray-500 mb-3">No education details added yet</p>
                        <Button 
                            type="button" 
                            onClick={addEducation} 
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <PlusCircle size={16} /> Add Education
                        </Button>
                    </div>
                )}

                {!submitted && input.education.length > 0 && (
                    <div className="mt-6">
                        <Button 
                            onClick={submitHandler} 
                            type="button" 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2"
                        >
                            Save Education Details
                        </Button>
                    </div>
                )}

                {submitted && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-700 text-sm flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Education details saved successfully
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EducationForm;