import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, Loader2, LockKeyhole, ArrowLeft } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '@/actions/user-actions'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'

const ResetPassword = () => {
    const params = useParams();
    const resetToken = params.resetToken;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { loading } = useSelector((state) => state.user);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [seePassword, setSeePassword] = useState(false);
    const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);

    const validatePassword = () => {
        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
        }
        
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        
        return true;
    };

    const submitHandler = async(e) => {
        e.preventDefault();
        setError("");
        
        if (!validatePassword()) {
            return;
        }
        
        try {
            const res = await resetPassword(dispatch, resetToken, newPassword);
            if(res) {
                setSuccess(true);
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            setError("Failed to reset password. The link may be expired or invalid.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-50 dark:bg-gray-900">
                <Card className="border-gray-200  w-[450px] dark:border-gray-800 shadow-lg dark:shadow-gray-800/20 overflow-hidden">
                    <CardHeader className="pt-4 dark:border-gray-800">
                        <div className="flex justify-center">
                            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/20">
                                <LockKeyhole className="h-6 w-6 text-red-500" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold text-center">
                            Reset Password
                        </CardTitle>
                        <CardDescription className="text-center text-gray-500 dark:text-gray-400">
                            Create a new password for your account
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-3">
                        {success ? (
                            <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
                                <AlertDescription className="text-green-600 dark:text-green-400 py-2">
                                    Password reset successful! Redirecting to login...
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <form onSubmit={submitHandler} className="space-y-6">
                                <div className="space-y-1">
                                    <Label htmlFor="password" className="text-sm font-medium">
                                        New Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            required
                                            type={seePassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            name="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="pl-10"
                                        />
                                        <LockKeyhole className="absolute left-3 top-2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                                        <button
                                            type="button"
                                            onClick={() => setSeePassword(!seePassword)}
                                            className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                                        >
                                            {seePassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="space-y-1">
                                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                                        Confirm Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            required
                                            type={seeConfirmPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="pl-10"
                                        />
                                        <LockKeyhole className="absolute left-3 top-2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                                        <button
                                            type="button"
                                            onClick={() => setSeeConfirmPassword(!seeConfirmPassword)}
                                            className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                                        >
                                            {seeConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {error && (
                                    <Alert className="bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800 py-2">
                                        <AlertDescription className="text-red-600 dark:text-red-400 text-sm">
                                            {error}
                                        </AlertDescription>
                                    </Alert>
                                )}

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-5"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Resetting Password...
                                        </>
                                    ) : (
                                        "Reset Password"
                                    )}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
    );
};

export default ResetPassword;