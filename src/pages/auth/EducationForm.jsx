import { PlusCircle, Trash2 } from "lucide-react";
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
        }
        );
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
            return (
                edu.degree === "" ||
                edu.institution === "" ||
                edu.startYear === "" ||
                edu.endYear === ""
            );
        });
        if (hasEmptyField) {
            toast.error("Please fill all the education fields.");
            return;
        }
        setSubmitted(true);
    }

    return (
        <div className="flex flex-col overflow-y-auto items-start  justify-end w-full h-fit bg-white">

            <div className="flex gap-3 mb-4 items-center">
                <Label className="mb-1">Education</Label>
                {
                    !submitted && (

                        <div className="flex justify-center">
                            <Button type="button" onClick={addEducation} className="flex items-center gap-2">
                                <PlusCircle size={18} /> Add Education
                            </Button>
                        </div>
                    )
                }
            </div>


            <div>
                {input.education.map((edu, index) => (
                    <div key={index} className="flex items-center justify-between w-full gap-4 p-4 rounded-lg relative">
                        <div>
                            <Label className="mb-1" htmlFor={`degree-${index}`}>Degree</Label>
                            <Input
                                id={`degree-${index}`}
                                type="text"
                                placeholder="B.Tech in Computer Science"
                                value={edu.degree}
                                onChange={(e) => handleChange(index, "degree", e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label className="mb-1" htmlFor={`institution-${index}`}>Institution</Label>
                            <Input
                                id={`institution-${index}`}
                                type="text"
                                placeholder="XYZ University"
                                value={edu.institution}
                                onChange={(e) => handleChange(index, "institution", e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label className="mb-1" htmlFor={`startYear-${index}`}>Start Year</Label>
                            <Input
                                id={`startYear-${index}`}
                                type="number"
                                min="1900" max="2099"
                                step="1"
                                value={edu.startYear}
                                onChange={(e) => handleChange(index, "startYear", e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label className="mb-1" htmlFor={`endYear-${index}`}>End Year</Label>
                            <Input
                                id={`endYear-${index}`}
                                type="number"
                                min="1900" max="2099"
                                step="1"
                                value={edu.endYear}
                                onChange={(e) => handleChange(index, "endYear", e.target.value)}
                            />
                        </div>

                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => removeEducation(index)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                            >
                                <Trash2 size={20} />
                            </button>
                        )}
                    </div>
                ))}

                {
                    !submitted && (
                        <Button onClick={submitHandler} type="button" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium">
                            Submit
                        </Button>
                    )
                }
            </div>
        </div>
    );
}

export default EducationForm    