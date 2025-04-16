import { setSavedJobs} from "@/store/jobSlice";
import axios from "axios";
import { toast } from "sonner";

axios.defaults.withCredentials = true;

const USER_API_END_POINT = import.meta.env.VITE_BACKEND_URL + "/api/job"


export const saveJob = async (id) => {
    try {
        const response = await axios.post(
            `${USER_API_END_POINT}/save`,
            {id},
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.data.success) {
            toast.success(response.data.message);
            dispatch(setSavedJobs(response.data.allSavedJobs));
            return true;
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data.message || error.message);
    } 
    return false;
}
export const unsaveJob = async (id) => {
    try {
        const response = await axios.post(
            `${USER_API_END_POINT}/unsave`,
            {id},
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.data.success) {
            toast.success(response.data.message);
            dispatch(setSavedJobs(response.data.allSavedJobs));
            return true;
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data.message || error.message);
    } 
    return false;
}
export const getSavedJobs = async (dispatch) => {
    try {
        const response = await axios.get(
            `${USER_API_END_POINT}/saved/all`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.data.success) {
            dispatch(setSavedJobs(response.data.allSavedJobs));
            return true;
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data.message || error.message);
    } 
    return false;
}