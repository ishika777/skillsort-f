import { login } from "@/actions/user-actions";
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
    const { loading, user } = useSelector((state) => state.user);

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
                navigate(input.role === "Recruiter" ? "/admin" : "/");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-50">
                <Card className="border-0 w-[450px] shadow-lg overflow-hidden">
                    <CardHeader className="bg-white">
                        <div className="flex justify-center items-center">
                            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                                <img
                                    src='/logo.png'
                                    alt='SkillSort Logo'
                                    className='w-6 h-6 md:w-8 md:h-8 object-contain'
                                />
                                <span className="font-bold text-2xl md:text-3xl flex items-center">
                                    <span className="text-red-500">Skill</span>
                                    <span className="">Sort</span>
                                </span>
                            </CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent className="">
                        <form onSubmit={loginSubmitHandler} className="space-y-3">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
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
                                        className={`pl-10 h-9 rounded-lg ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-200'}`}
                                    />
                                    <Mail className="absolute left-3 top-2 h-5 w-5 text-gray-400 " />
                                    {errors.email && (
                                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                        Password
                                    </Label>
                                    <Link to="/forgot-password" className="text-xs font-semibold text-red-600 hover:text-red-800">
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
                                        className={`pl-10 h-9 rounded-lg ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-200'}`}
                                    />
                                    <LockKeyhole className="absolute left-3 top-2 h-5 w-5 text-gray-400 " />
                                    <button
                                        type="button"
                                        onClick={() => setSeePassword(!seePassword)}
                                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                    >
                                        {seePassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                    {errors.password && (
                                        <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2 pt-2">
                                <Label className="text-sm font-medium text-gray-700">
                                    I'm signing in as
                                </Label>
                                <RadioGroup
                                    value={input.role}
                                    onValueChange={handleRadioChange}
                                    className="grid grid-cols-2 gap-3 pt-1"
                                >
                                    <div className={`flex items-center border rounded-lg p-3 cursor-pointer transition-all ${input.role === "Employee"
                                        ? "border-red-500 bg-red-50 "
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}>
                                        <RadioGroupItem value="Employee" id="Employee" className="sr-only" />
                                        <Label
                                            htmlFor="Employee"
                                            className="flex items-center cursor-pointer w-full"
                                        >
                                            <UserCircle2 className={`h-5 w-5 mr-2 ${input.role === "Employee"
                                                ? "text-red-500"
                                                : "text-gray-400"
                                                }`} />
                                            <span className={input.role === "Employee" ? "font-medium" : ""}>
                                                Employee
                                            </span>
                                        </Label>
                                    </div>

                                    <div className={`flex items-center border rounded-lg p-3 cursor-pointer transition-all ${input.role === "Recruiter"
                                        ? "border-red-500 bg-red-50"
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}>
                                        <RadioGroupItem value="Recruiter" id="Recruiter" className="sr-only" />
                                        <Label
                                            htmlFor="Recruiter"
                                            className="flex items-center cursor-pointer w-full"
                                        >
                                            <Building className={`h-5 w-5 mr-2 ${input.role === "Recruiter"
                                                ? "text-red-500"
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
                                className="w-full h-9 mt-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
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
                                <Link to="/verify-email" className="text-sm text-red-600 hover:text-red-700 font-medium">
                                    Need to verify your email?
                                </Link>
                            </div>
                        </form>
                    </CardContent>

                    <CardFooter className="flex justify-center bg-gray-50 border-t border-gray-100">
                        <div className="text-center text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-red-600 m-0 p-0 hover:text-red-700 font-medium">
                                Create an account
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
        </div>
    );
};

export default Login;