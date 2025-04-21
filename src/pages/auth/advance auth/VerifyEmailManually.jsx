import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Mail, ArrowLeft, Send } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "sonner"
import { useState } from 'react'
import ThemeButton from "@/components/shared/ThemeButton"
import { useDispatch, useSelector } from 'react-redux'
import { sendCode } from '@/actions/user-actions'

const VerifyEmailManually = () => {
    const [email, setEmail] = useState("")
    const { loading } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const submitHandler = async(e) => {
        e.preventDefault()
        if(!email){
            toast.error("Please enter your email address")
            return
        }
        
        try {
            await sendCode(dispatch, email)
            toast.success("Verification code sent successfully")
            setEmail("")
            navigate("/verify-email")
        } catch (error) {
            console.log(error)
            toast.error("Failed to send verification code. Please try again.")
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
                        <Send className="h-6 w-6 text-red-500" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">
                        Send Verification Code
                    </CardTitle>
                    <CardDescription className="text-center text-gray-500 dark:text-gray-400">
                        Enter your email address to receive a verification code
                    </CardDescription>
                </CardHeader>
                
                <CardContent>
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                            <div className="relative">
                                <Input 
                                    id="email"
                                    required
                                    type="email"
                                    value={email}
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email@example.com"
                                    className="pl-10 h-12 border-gray-300 dark:border-gray-700 focus-visible:ring-2 focus-visible:ring-red-500 transition-all"
                                />
                                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                We'll send a 6-digit verification code to this email
                            </p>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium h-12 rounded-md"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Sending Code...
                                </>
                            ) : (
                                "Send Verification Code"
                            )}
                        </Button>
                    </form>
                </CardContent>
                
                <CardFooter className="flex justify-center pb-6 pt-2">
                    <Button 
                        variant="link" 
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => navigate("/login")}
                    >
                        Return to login
                    </Button>
                </CardFooter>
            </Card>
            
            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>Having trouble? <Link to="/contact" className="text-red-500 hover:text-red-600 font-medium">Contact Support</Link></p>
            </div>
        </div>
    )
}

export default VerifyEmailManually