import { setLoading, setJobs, setJob} from "@/store/jobSlice";
import axios from "axios";
import { toast } from "sonner";

axios.defaults.withCredentials = true;

const USER_API_END_POINT = import.meta.env.VITE_BACKEND_URL + "/api/job"

export const createJob = async (dispatch, input) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(
            `${USER_API_END_POINT}/new`,
            input,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.data.success) {
            toast.success(response.data.message);
            dispatch(setJobs(response.data.allJobs));
            return true;
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data.message || error.message);
    } finally{
        dispatch(setLoading(false))
    }
    return false;
}

export const getAllJobs = async (dispatch) => {
    try {
        const response = await axios.get(
            `${USER_API_END_POINT}/all`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.data.success) {
            dispatch(setJobs(response.data.allJobs));
            return true;
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data.message || error.message);
    }
    return false;
}

export const editJob = async (dispatch, input) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(
            `${USER_API_END_POINT}/edit`,
            input, 
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.data.success) {
            toast.success(response.data.message);
            dispatch(setJobs(response.data.allJobs));
            return true;
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data.message || error.message);
    }finally{
        dispatch(setLoading(false))
    }
    return false;
}

export const getJobById = async (dispatch, id) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(
            `${USER_API_END_POINT}/get`,
            { id }, 
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.data.success) {
            dispatch(setJob(response.data.job));
            return true;
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data.message || error.message);
    }finally{
        dispatch(setLoading(false))
    }
    return false;
}

