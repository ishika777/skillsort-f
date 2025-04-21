import { login } from "@/actions/user-actions";
import ThemeButton from "@/components/shared/ThemeButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail, UserCircle2, Building } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SignupNav from "./SignupNav";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.user);

    const [errors, setErrors] = useState({});
    const [seePassword, setSeePassword] = useState(false);
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "Employee"
    });

    const handleRadioChange = (value) => {
        setInput((prev) => ({ ...prev, role: value }));
        if (errors.recruiter) {
            setErrors({ ...errors, recruiter: undefined });
        }
    };

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: undefined });
        }
    };

    const loginSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const success = await login(dispatch, input);
            if (success) {
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-50 dark:bg-gray-900 p-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h1>
                    <p className="text-gray-600 dark:text-gray-400">Sign in to access your account</p>
                </div>
                
                <Card className="border-0 shadow-lg dark:shadow-gray-800/20 overflow-hidden">
                    <CardHeader className="bg-white dark:bg-gray-800 pb-4 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                                <SignupNav />
                            </CardTitle>
                            <ThemeButton />
                        </div>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <form onSubmit={loginSubmitHandler} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        required
                                        type="email"
                                        placeholder="email@example.com"
                                        name="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        className={`pl-10 h-11 rounded-lg ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                                    />
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
                                    {errors.email && (
                                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Password
                                    </Label>
                                    <Link to="/forgot-password" className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        required
                                        type={seePassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        name="password"
                                        value={input.password}
                                        onChange={changeEventHandler}
                                        className={`pl-10 h-11 rounded-lg ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                                    />
                                    <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
                                    <button
                                        type="button"
                                        onClick={() => setSeePassword(!seePassword)}
                                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                                    >
                                        {seePassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                    {errors.password && (
                                        <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    I'm signing in as
                                </Label>
                                <RadioGroup 
                                    value={input.role} 
                                    onValueChange={handleRadioChange} 
                                    className="grid grid-cols-2 gap-3 pt-1"
                                >
                                    <div className={`flex items-center border rounded-lg p-3 cursor-pointer transition-all ${
                                        input.role === "Employee" 
                                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                                            : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                                    }`}>
                                        <RadioGroupItem value="Employee" id="Employee" className="sr-only" />
                                        <Label 
                                            htmlFor="Employee" 
                                            className="flex items-center cursor-pointer w-full"
                                        >
                                            <UserCircle2 className={`h-5 w-5 mr-2 ${
                                                input.role === "Employee" 
                                                    ? "text-blue-500" 
                                                    : "text-gray-400"
                                            }`} />
                                            <span className={input.role === "Employee" ? "font-medium" : ""}>
                                                Employee
                                            </span>
                                        </Label>
                                    </div>
                                    
                                    <div className={`flex items-center border rounded-lg p-3 cursor-pointer transition-all ${
                                        input.role === "Recruiter" 
                                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                                            : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                                    }`}>
                                        <RadioGroupItem value="Recruiter" id="Recruiter" className="sr-only" />
                                        <Label 
                                            htmlFor="Recruiter" 
                                            className="flex items-center cursor-pointer w-full"
                                        >
                                            <Building className={`h-5 w-5 mr-2 ${
                                                input.role === "Recruiter" 
                                                    ? "text-blue-500" 
                                                    : "text-gray-400"
                                            }`} />
                                            <span className={input.role === "Recruiter" ? "font-medium" : ""}>
                                                Recruiter
                                            </span>
                                        </Label>
                                    </div>
                                </RadioGroup>
                                {errors.recruiter && (
                                    <p className="text-xs text-red-500 mt-1">{errors.recruiter}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign in"
                                )}
                            </Button>

                            <div className="text-center">
                                <Link to="/verify-email" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                                    Need to verify your email?
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                    
                    <CardFooter className="flex justify-center py-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
                        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                                Create an account
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Login;