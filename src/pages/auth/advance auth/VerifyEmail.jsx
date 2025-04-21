import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, ArrowLeft, Mail } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { verifyEmail } from "@/actions/user-actions"
import ThemeButton from "@/components/shared/ThemeButton";
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const VerifyEmail = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(60);
    const [errorMessage, setErrorMessage] = useState("");
    const [timerActive, setTimerActive] = useState(true);
    const inputRef = useRef([]);
    const navigate = useNavigate();
    const { loading, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // Timer countdown effect
    useEffect(() => {
        let interval;
        if (timerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setTimerActive(false);
        }
        return () => clearInterval(interval);
    }, [timer, timerActive]);

    const handleChange = (index, value) => {
        if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            
            // Auto-focus next input
            if (value !== "" && index < 5) {
                inputRef.current[index + 1].focus();
            }
            
            // Auto-submit when all fields are filled
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
        // Logic to resend code would go here
        setTimer(60);
        setTimerActive(true);
        setErrorMessage("");
        // Reset OTP fields
        setOtp(["", "", "", "", "", ""]);
        // Focus on first input
        inputRef.current[0].focus();
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        const verificationCode = otp.join("");
        
        try {
            const success = await verifyEmail(dispatch, verificationCode);
            if (success) {
                if(user?.role === "Recruiter") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
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
        <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-50 dark:bg-gray-900">
            <div className="absolute top-4 right-4">
                <ThemeButton />
            </div>
            
            <div className="absolute top-4 left-4">
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </div>

            <Card className="w-full max-w-md border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-gray-800/20">
                <CardHeader className="space-y-1">
                    <div className="mx-auto bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-4">
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
                        <Alert variant="destructive" className="mb-4 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
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
                                    inputMode="numeric"
                                    value={digit}
                                    maxLength={1}
                                    onChange={(e) => handleChange(idx, e.target.value)}
                                    ref={(element) => inputRef.current[idx] = element}
                                    onKeyDown={(e) => handleKeyDown(idx, e)}
                                    className="w-12 h-14 text-center text-xl font-semibold rounded-md focus-visible:ring-2 focus-visible:ring-red-500 p-0 transition-all border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                                    aria-label={`Digit ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <div className="flex flex-col space-y-4">
                            <Button
                                id="verify-button"
                                type="submit"
                                disabled={loading || otp.includes("")}
                                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-6"
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
                        {timerActive ? (
                            <p>Resend code in <span className="font-semibold">{timer}s</span></p>
                        ) : (
                            <Button 
                                variant="link" 
                                onClick={resendCode}
                                className="text-red-500 hover:text-red-600 p-0 h-auto"
                            >
                                Resend verification code
                            </Button>
                        )}
                    </div>
                    
                    <div className="flex justify-center">
                        <Button 
                            type="button" 
                            variant="link" 
                            onClick={() => navigate("/verify-manual")} 
                            className="text-gray-500 dark:text-gray-400 hover:text-red-500"
                        >
                            Verify with another method
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default VerifyEmail