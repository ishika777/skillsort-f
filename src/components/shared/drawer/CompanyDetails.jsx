import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
    DrawerTitle,
    DrawerDescription
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Loader2, PlusCircle, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useState } from "react";

const ExperienceDetails = () => {
    const { user, loading } = useSelector((state) => state.user);

    const [input, setInput] = useState(user?.experience);

    const handleChange = (index, field, value) => {
        const updated = [...input];
        updated[index][field] = value;
        setInput(updated);
    };

    const addExperience = () => {
        setInput((prev) => [
            ...prev,
            {
                jobTitle: "",
                companyName: "",
                startDate: "",
                endDate: "",
                description: ""
            }
        ]);
    };

    const removeExperience = (index) => {
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
                <DrawerHeader>
                    <DrawerTitle className="flex items-center justify-between">
                        <span>Update Experience</span>
                        <div onClick={addExperience} className="bg-red-100 p-2 rounded-lg w-fit cursor-pointer">
                            <PlusCircle className="text-red-500 hover:text-red-600" size={25} />
                        </div>
                    </DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>

                <div className="p-4 space-y-6 max-h-[75vh] overflow-y-auto">
                    {input.length === 0 ? (
                        <div className="text-center text-red-400 font-medium">
                            No experience added yet.
                        </div>
                    ) : (
                        input.map((exp, index) => (
                            <div key={index} className="flex flex-col gap-4 p-4 rounded-lg border border-gray-200 relative">
                                <div className="flex flex-col items-start justify-between gap-4">
                                    <div className="w-full">
                                        <Label className="mb-2" htmlFor={`jobTitle-${index}`}>Job Title</Label>
                                        <Input
                                            id={`jobTitle-${index}`}
                                            value={exp.jobTitle}
                                            placeholder="Software Developer"
                                            onChange={(e) => handleChange(index, "jobTitle", e.target.value)}
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label className="mb-2" htmlFor={`companyName-${index}`}>Company Name</Label>
                                        <Input
                                            id={`companyName-${index}`}
                                            value={exp.companyName}
                                            placeholder="Company XYZ"
                                            onChange={(e) => handleChange(index, "companyName", e.target.value)}
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label className="mb-2" htmlFor={`startDate-${index}`}>Start Date</Label>
                                        <Input
                                            id={`startDate-${index}`}
                                            type="month"
                                            value={exp.startDate}
                                            onChange={(e) => handleChange(index, "startDate", e.target.value)}
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label className="mb-2" htmlFor={`endDate-${index}`}>End Date</Label>
                                        <Input
                                            id={`endDate-${index}`}
                                            type="month"
                                            value={exp.endDate}
                                            onChange={(e) => handleChange(index, "endDate", e.target.value)}
                                        />
                                    </div>
                                
                                    <div className="w-full">
                                        <Label className="mb-2" htmlFor={`description-${index}`}>Description</Label>
                                        <Input
                                            id={`description-${index}`}
                                            value={exp.description}
                                            placeholder="Worked on building scalable systems..."
                                            onChange={(e) => handleChange(index, "description", e.target.value)}
                                        />
                                    </div>

                                </div>


                                <button
                                    type="button"
                                    onClick={() => removeExperience(index)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        )))}
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

export default ExperienceDetails;
