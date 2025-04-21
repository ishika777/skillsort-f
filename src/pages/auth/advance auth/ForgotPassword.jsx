import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Mail, ArrowLeft, ShieldAlert, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from "sonner"
import { useState } from 'react'
import { forgotPassword } from '@/actions/user-actions'
import ThemeButton from "@/components/shared/ThemeButton"
import { useDispatch, useSelector } from 'react-redux'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [emailSent, setEmailSent] = useState(false)
    const { loading } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    
    const submitHandler = async(e) => {
        e.preventDefault()
        if(!email){
            toast.error("Please enter your email address")
            return
        }
        try {
            await forgotPassword(dispatch, email)
            setEmailSent(true)
            toast.success("Password reset link sent to your email")
        } catch (error) {
            console.log(error)
        }
    }

    const handleTryAgain = () => {
        setEmailSent(false)
        setEmail("")
    }

    return (
        <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-50 dark:bg-gray-900">
            <div className="absolute top-4 right-4">
                <ThemeButton />
            </div>
            
            <div className="w-full max-w-md">
                <Link to="/login" className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-6 group transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Login
                </Link>
                
                <Card className="border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-gray-800/20 overflow-hidden">
                    {!emailSent ? (
                        <>
                            <CardHeader className="space-y-1 border-b pb-6">
                                <div className="mx-auto bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-fit mb-2">
                                    <ShieldAlert className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                                    Forgot Password?
                                </CardTitle>
                                <CardDescription className="text-center text-gray-600 dark:text-gray-400">
                                    No worries, we'll send you a reset link
                                </CardDescription>
                            </CardHeader>
                            
                            <CardContent className="pt-6">
                                <form onSubmit={submitHandler} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email Address</Label>
                                        <div className="relative">
                                            <Input 
                                                id="email"
                                                required
                                                type="email"
                                                value={email}
                                                name="email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="email@example.com"
                                                className="pl-10 border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Sending reset link...
                                            </>
                                        ) : (
                                            "Send Reset Link"
                                        )}
                                    </Button>
                                </form>
                                
                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                                        Remember your password?{" "}
                                        <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors">
                                            Sign In
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </>
                    ) : (
                        <>
                            <CardHeader className="space-y-1 border-b pb-6">
                                <div className="mx-auto bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-fit mb-2">
                                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                                    Check Your Email
                                </CardTitle>
                                <CardDescription className="text-center text-gray-600 dark:text-gray-400">
                                    We've sent a password reset link to:
                                </CardDescription>
                            </CardHeader>
                            
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="font-medium text-lg mb-6 bg-gray-100 dark:bg-gray-800 py-3 rounded-md">
                                        {email}
                                    </div>
                                    
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                        <p>The link will expire in 10 minutes.</p>
                                        <p className="mt-2">If you don't see the email, check your spam folder.</p>
                                    </div>
                                    
                                    <Button 
                                        onClick={handleTryAgain}
                                        variant="outline" 
                                        className="w-full mb-4 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                                    >
                                        Try a different email
                                    </Button>
                                    
                                    <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                                        Back to login
                                    </Link>
                                </div>
                            </CardContent>
                        </>
                    )}
                    
                    <CardFooter className="flex justify-center py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Need help? <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Support</a>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default ForgotPassword