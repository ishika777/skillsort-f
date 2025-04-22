import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowLeft, Mail } from "lucide-react";
import { useRef, useState } from "react"; // Remove useEffect, useNavigate, useSelector, useDispatch
import { Link } from "react-router-dom"; // Remove useNavigate
import { verifyEmail } from "@/actions/user-actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSelector } from "react-redux";

const VerifyEmail = ({ shadowOtp }) => { // Pass shadowOtp as a prop
    const [otp, setOtp] = useState(shadowOtp || ["", "", "", "", "", ""]); // Initialize with shadowOtp or empty array
    const {loading} = useSelector((state) => state.user)
    const [errorMessage, setErrorMessage] = useState("");
    const inputRef = useRef([]);

    const handleChange = (index, value) => {
        if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            
            if (value !== "" && index < 5) {
                inputRef.current[index + 1].focus();
            }
            
            if (index === 5 && value !== "" && !newOtp.includes("")) {
                setTimeout(() => {
                    document.getElementById("verify-button").click();
                }, 300);
            }
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRef.current[index - 1].focus();
        }
    }

    const resendCode = () => {
        setErrorMessage("");
        setOtp(["", "", "", "", "", ""]);
        inputRef.current[0].focus();
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        const verificationCode = otp.join("");
        
        try {
            const success = await verifyEmail(dispatch, verificationCode);
            if (success) {
                navigate(user?.role === "Recruiter" ? "/admin" : "/");
            } else {
                setErrorMessage("Invalid verification code. Please try again.");
                // Clear fields on error
                setOtp(["", "", "", "", "", ""]);
                inputRef.current[0].focus();
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("Verification failed. Please try again.");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-50 dark:bg-gray-900">
            <Card className=" w-[450px] border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-gray-800/20">
                <CardHeader className="space-y-1 mb-3">
                    <div className="mx-auto bg-red-100 dark:bg-red-900/30 p-3 rounded-full ">
                        <Mail className="h-6 w-6 text-red-500" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">
                        Verify Your Email
                    </CardTitle>
                    <CardDescription className="text-center text-gray-500 dark:text-gray-400">
                        Enter the 6-digit code sent to your email
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {errorMessage && (
                        <Alert variant="destructive" className="mb-5 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
                            <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="flex justify-between gap-2">
                            {otp.map((digit, idx) => (
                                <Input
                                    required
                                    key={idx}
                                    type="text"
                                    value={digit}
                                    maxLength={1}
                                    onChange={(e) => handleChange(idx, e.target.value)}
                                    ref={(element) => inputRef.current[idx] = element}
                                    onKeyDown={(e) => handleKeyDown(idx, e)}
                                    className="w-12 h-13 text-center text-4xl font-semibold text-red-500 rounded-md"
                                />
                            ))}
                        </div>

                        <div className="flex flex-col space-y-4">
                            <Button
                                id="verify-button"
                                type="submit"
                                disabled={loading || otp.includes("")}
                                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    "Verify Email"
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 pt-0">
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                        <Button 
                            variant="link" 
                            onClick={resendCode}
                            className="text-red-500 hover:text-red-600 p-0 h-auto"
                        >
                            Resend verification code
                        </Button>
                    </div>
                    
                    <div className="flex justify-center">
                        <Link 
                            to="/verify-manual"
                            className="text-red-500 text-sm font-semibold hover:text-red-600"
                        >
                            Verify manually
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default VerifyEmail;
