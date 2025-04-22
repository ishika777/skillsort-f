import {
    Drawer, DrawerClose, DrawerContent, DrawerFooter,
    DrawerHeader, DrawerTrigger, DrawerTitle, DrawerDescription
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Loader2, PlusCircle, Trash2, GraduationCap, School, Calendar } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useState } from "react";
import { updateEducationalDetails } from "@/actions/user-actions";

const EducationDetails = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.user);
    const [input, setInput] = useState(() => user?.education?.map(e => ({ ...e })) || []);

    const handleChange = (index, field, value) => {
        const updated = [...input];
        updated[index][field] = value;
        setInput(updated);
    };

    const addEducation = () => {
        setInput((prev) => [...prev, { degree: "", institution: "", startYear: "", endYear: "" }]);
    };

    const removeEducation = (index) => {
        setInput((prev) => prev.filter((_, i) => i !== index));
    };

    const submitHandler = async() => {
        if(input.length === 0){
            toast.error("Education can't be empty");
            return;
        }
        const hasEmptyField = input.some((edu) => {
            return (!edu.degree || !edu.institution || !edu.startYear || !edu.endYear);
        });
        const invalidTimeline = input.some((edu) => {
            return Number(edu.startYear) >= Number(edu.endYear) 
        });
        
        if (hasEmptyField) {
            toast.error("Please fill all the education fields.");
            return;
        }
        if (invalidTimeline) {
            toast.error("Start year must be before end year.");
            return;
        }
        
        try {
            await updateEducationalDetails(dispatch, input);
            toast.success("Education details updated successfully!");
        } catch (error) {
            toast.error("Failed to update education details.");
            console.log(error);
        }
    };

    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button
                    className="bg-red-50 hover:bg-red-100 transition-colors"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => e.currentTarget.blur()}
                >
                    <Edit className="h-4 w-4 mr-1 text-red-500" />
                    <span className="text-red-500 text-md">Edit</span>
                </Button>
            </DrawerTrigger>

            <DrawerContent className="p-4 bg-white">
                <DrawerHeader className="pb-2 border-b">
                    <DrawerTitle className="flex items-center justify-between text-xl font-bold">
                        <span>Educational Background</span>
                        <Button 
                            onClick={addEducation} 
                            className="bg-red-100 hover:bg-red-200 transition-colors rounded-full p-2"
                            variant="ghost"
                            size="icon"
                        >
                            <PlusCircle className="text-red-500 hover:text-red-600" size={20} />
                        </Button>
                    </DrawerTitle>
                    <DrawerDescription className="text-gray-500">
                        Add or update your academic qualifications
                    </DrawerDescription>
                </DrawerHeader>

                <div className="py-6 space-y-6 max-h-[70vh] tabs-scroll overflow-y-auto">
                    {input.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <GraduationCap className="mx-auto text-gray-400 mb-2" size={30} />
                            <p className="text-gray-500 font-medium">No education entries added yet</p>
                            <Button 
                                onClick={addEducation} 
                                className="mt-4 bg-red-500 hover:bg-red-600 text-white"
                                size="sm"
                            >
                                Add Education
                            </Button>
                        </div>
                    ) : (
                        input.map((edu, index) => (
                            <div key={index} className="flex flex-col gap-4 p-6 rounded-lg border border-gray-200 bg-gray-50 relative shadow-sm hover:shadow-md transition-shadow">
                                <div className="absolute top-4 right-4 flex gap-2">
                                    {
                                        index > 0 && (
                                            <button
                                            type="button"
                                            onClick={() => removeEducation(index)}
                                            className="text-gray-500 hover:text-red-500 transition-colors bg-white p-1.5 rounded-full border border-gray-200"
                                            aria-label="Remove education"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        )
                                    }
                                   
                                </div>
                                
                                <h3 className="font-medium text-gray-700 mb-2">Education #{index + 1}</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="w-full">
                                        <Label className="mb-1.5 flex items-center gap-1.5" htmlFor={`degree-${index}`}>
                                            <GraduationCap className="h-4 w-4 text-gray-500" />
                                            <span>Degree</span>
                                        </Label>
                                        <Input
                                            id={`degree-${index}`}
                                            type="text"
                                            placeholder="B.Tech in Computer Science"
                                            className="bg-white"
                                            value={edu.degree}
                                            onChange={(e) => handleChange(index, "degree", e.target.value)}
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label className="mb-1.5 flex items-center gap-1.5" htmlFor={`institution-${index}`}>
                                            <School className="h-4 w-4 text-gray-500" />
                                            <span>Institution</span>
                                        </Label>
                                        <Input
                                            id={`institution-${index}`}
                                            type="text"
                                            placeholder="XYZ University"
                                            className="bg-white"
                                            value={edu.institution}
                                            onChange={(e) => handleChange(index, "institution", e.target.value)}
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="w-full">
                                        <Label className="mb-1.5 flex items-center gap-1.5" htmlFor={`startYear-${index}`}>
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                            <span>Start Year</span>
                                        </Label>
                                        <Input
                                            id={`startYear-${index}`}
                                            type="number"
                                            placeholder="YYYY"
                                            min="1900" max="2099"
                                            className="bg-white"
                                            value={edu.startYear}
                                            onChange={(e) => handleChange(index, "startYear", e.target.value)}
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label className="mb-1.5 flex items-center gap-1.5" htmlFor={`endYear-${index}`}>
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                            <span>End Year</span>
                                        </Label>
                                        <Input
                                            id={`endYear-${index}`}
                                            type="number"
                                            placeholder="YYYY"
                                            min="1900" max="2099"
                                            className="bg-white"
                                            value={edu.endYear}
                                            onChange={(e) => handleChange(index, "endYear", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <DrawerFooter className="pt-4 border-t">
                    <div className="flex gap-2 w-full">
                        <DrawerClose asChild>
                            <Button 
                                variant="outline" 
                                className="w-1/3 border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </Button>
                        </DrawerClose>
                        <Button
                            onClick={submitHandler}
                            disabled={loading}
                            className="w-2/3 bg-red-500 hover:bg-red-600 text-white font-medium"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    <span>Saving...</span>
                                </div>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default EducationDetails;