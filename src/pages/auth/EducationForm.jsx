import { PlusCircle, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


const EducationForm = ({input, setInput}) => {

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
                { degree: "", institution: "", startDate: "", endDate: "" }
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

    return (
        <div className="flex flex-col overflow-y-auto items-start  justify-end w-full h-fit bg-white">


            <div className="flex gap-3 mb-4 items-center">
                <Label className="mb-1">Education</Label>
                <div className="flex justify-center">
                    <Button type="button" onClick={addEducation} className="flex items-center gap-2">
                        <PlusCircle size={18} /> Add Education
                    </Button>
                </div>
            </div>


            <form className="">
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
                            <Label className="mb-1" htmlFor={`startDate-${index}`}>Start Date</Label>
                            <Input
                                id={`startDate-${index}`}
                                type="date"
                                value={edu.startDate}
                                onChange={(e) => handleChange(index, "startDate", e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label className="mb-1" htmlFor={`endDate-${index}`}>End Date</Label>
                            <Input
                                id={`endDate-${index}`}
                                type="date"
                                value={edu.endDate}
                                onChange={(e) => handleChange(index, "endDate", e.target.value)}
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

                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium">
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default EducationForm    