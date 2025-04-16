import { Settings2 } from "lucide-react";
import PersonalDetails from "../shared/drawer/PersonalDetails";
import CompanyDetails from "../shared/drawer/CompanyDetails";
import DeleteAccount from "../shared/dialog/DeleteAccount";

const EmployeeSettings = () => {

    const deleteHandler = () => {
        console.log("delete")
    }
    return (
        <div className="tabs-scroll w-full p-6 overflow-y-auto h-[calc(100vh-64px)]">
            <h2 className="text-2xl font-semibold mb-6"><span className="flex items-center justify-start gap-5"><Settings2 />Employee Settings</span></h2>

            <PersonalDetails />
            <CompanyDetails />

                <DeleteAccount deleteHandler={deleteHandler} />
           
            <div>
                job history
            </div>
     
        </div>
    );
}
export default EmployeeSettings