import axios from "axios";
import { toast } from "sonner";
import { setLoading, setAppliedJobs } from "@/store/applicationSlice";

axios.defaults.withCredentials = true;

const USER_API_END_POINT = import.meta.env.VITE_BACKEND_URL + "/api/application"

export const applyForJob = async (dispatch, formData) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(
            `${USER_API_END_POINT}/apply`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        if (response.data.success) {
            toast.success(response.data.message);
            dispatch(setAppliedJobs(response.data.applications));
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data.message || error.message);
    } finally{
        dispatch(setLoading(false))

    }
}
export const getAllAppliedJobs = async (dispatch) => {
    try {
        const response = await axios.get(
            `${USER_API_END_POINT}/all`,{
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.data.success) {
            dispatch(setAppliedJobs(response.data.applications));
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data.message || error.message);
    } 
}