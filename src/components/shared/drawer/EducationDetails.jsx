import {
    Drawer, DrawerClose, DrawerContent, DrawerFooter,
    DrawerHeader, DrawerTrigger, DrawerTitle, DrawerDescription
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Loader2, PlusCircle, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useState } from "react";

const EducationDetails = () => {
    const { user, loading } = useSelector((state) => state.user);

    const [input, setInput] = useState(user?.education);


    const handleChange = (index, field, value) => {
        const updated = [...input];
        updated[index][field] = value;
        setEducation(updated);
    };


    const addEducation = () => {
        setInput((prev) => [
            ...prev,
            { degree: "", institution: "", startYear: "", endYear: "" }
        ]);
    };

    const removeEducation = (index) => {
        setInput((prev) => prev.filter((_, i) => i !== index));
    };


    const submitHandler = () => {
        

    };


    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button
                    className="bg-red-50 hover:bg-red-100"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => e.currentTarget.blur()}
                >
                    <Edit className="h-4 w-4 mr-1 text-red-500" />
                    <span className="text-red-500 text-md">Edit</span>
                </Button>
            </DrawerTrigger>

            <DrawerContent className="p-4">

                <DrawerHeader >
                    <DrawerTitle className="flex items-center justify-between">
                        <span>
                            Update Educational Details
                        </span>
                        <div onClick={addEducation} className="bg-red-100 p-2 rounded-lg w-fit">
                            <PlusCircle className=" text-red-500 hover:text-red-600" size={25} />
                        </div>
                    </DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>

                <div className="p-4 space-y-6 max-h-[75vh] overflow-y-auto">



                    {input.map((edu, index) => (
                        <div key={index} className="flex flex-col items-start justify-between w-full gap-4 p-4 rounded-lg relative border border-gray-200">
                            <div className="w-full">
                                <Label className="mb-2" htmlFor={`degree-${index}`}>Degree</Label>
                                <Input
                                    id={`degree-${index}`}
                                    type="text"
                                    placeholder="B.Tech in Computer Science"
                                    className="flex flex-1"
                                    value={edu.degree}
                                    onChange={(e) => handleChange(index, "degree", e.target.value)}
                                />
                            </div>

                            <div className="w-full">
                                <Label className="mb-2" htmlFor={`institution-${index}`}>Institution</Label>
                                <Input
                                    id={`institution-${index}`}
                                    type="text"
                                    placeholder="XYZ University"
                                    className="flex flex-3"
                                    value={edu.institution}
                                    onChange={(e) => handleChange(index, "institution", e.target.value)}
                                />
                            </div>
                            <div className="flex items-center justify-start w-full gap-4">
                                <div className="w-full">
                                    <Label className="mb-2" htmlFor={`startYear-${index}`}>Start Year</Label>
                                    <Input
                                        id={`startYear-${index}`}
                                        type="number"
                                        placeholder="XXXX"
                                        min="1900" max="2099"
                                        value={edu.startYear}
                                        onChange={(e) => handleChange(index, "startYear", e.target.value)}
                                    />
                                </div>

                                <div className="w-full">
                                    <Label className="mb-2" htmlFor={`endYear-${index}`}>End Year</Label>
                                    <Input
                                        id={`endYear-${index}`}
                                        type="number"
                                        placeholder="XXXX"
                                        min="1900" max="2099"
                                        value={edu.endYear}
                                        onChange={(e) => handleChange(index, "endYear", e.target.value)}
                                    />
                                </div>
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

                </div>

                <DrawerFooter className="flex gap-2">
                    <Button
                        onClick={submitHandler}
                        disabled={loading}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default EducationDetails;
