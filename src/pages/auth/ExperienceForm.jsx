import { PlusCircle, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function ExperienceForm({input, setInput}) {

    const [submitted, setSubmitted] = useState(false);

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
        setInput((prevInput) => ({
            ...prevInput,
            experience: [
                ...prevInput.experience, 
                { jobTitle: "", companyName: "", startDate: "", endDate: "", description: "" } // Add new experience
            ]
        }));
    };

    const removeExperience = (index) => {
        const newExperiences = input.experience.filter((_, i) => i !== index);
        setInput((prevInput) => ({
            ...prevInput,
            experience: newExperiences
        }));
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
        setSubmitted(true);
        console.log("Experience Data:", input.experience);
    }



    return (
        <div className="flex w-full overflow-y-auto items-center justify-center px-6">
            <div className="space-y-6">
                {input.experience.map((exp, index) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 border p-4 rounded-lg relative">
                        <div>
                            <Label className="mb-2" htmlFor={`jobTitle-${index}`}>Job Title</Label>
                            <Input
                                id={`jobTitle-${index}`}
                                type="text"
                                placeholder="Software Engineer"
                                value={exp.jobTitle}
                                onChange={(e) => handleChange(index, "jobTitle", e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label className="mb-2" htmlFor={`companyName-${index}`}>Company Name</Label>
                            <Input
                                id={`companyName-${index}`}
                                type="text"
                                placeholder="Google"
                                value={exp.companyName}
                                onChange={(e) => handleChange(index, "companyName", e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label className="mb-2" htmlFor={`startDate-${index}`}>Start Date</Label>
                            <Input
                                id={`startDate-${index}`}
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => handleChange(index, "startDate", e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label className="mb-2" htmlFor={`endDate-${index}`}>End Date</Label>
                            <Input
                                id={`endDate-${index}`}
                                type="month"
                                value={exp.endDate}
                                onChange={(e) => handleChange(index, "endDate", e.target.value)}
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <Label className="mb-2" htmlFor={`description-${index}`}>Description</Label>
                            <Input
                                id={`description-${index}`}
                                type="text"
                                placeholder="Worked on building scalable applications..."
                                value={exp.description}
                                onChange={(e) => handleChange(index, "description", e.target.value)}
                            />
                        </div>

                        {
                            !submitted && (
                                <button
                                type="button"
                                onClick={() => removeExperience(index)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                            >
                                <Trash2 size={20} />
                            </button>
                            )
                        }
                      
                    </div>
                ))}

                {
                    !submitted && (
                <div className="flex justify-center">
                    <Button type="button" onClick={addExperience} className="flex items-center gap-2">
                        <PlusCircle size={18} /> Add Experience
                    </Button>
                </div>

                    )
                }
                {
                    !submitted && (
                <Button type="button" onClick={submitHandler} className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-medium `} disabled={input.experience.length === 0}>
                    Submit
                </Button>

                    )
                }

            </div>
        </div>
    );
}
