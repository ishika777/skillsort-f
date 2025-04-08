import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/auth/Login"
import MainLayout from "./components/MainLayout"
import { Navigate, RouterProvider } from "react-router"
import ForgotPassword from "./pages/auth/advance auth/ForgotPassword"
import ResetPassword from "./pages/auth/advance auth/ResetPassword"
import VerifyEmail from "./pages/auth/advance auth/VerifyEmail"
import { useDispatch, useSelector } from "react-redux"
import AdminHome from "./pages/AdminHome"
import { checkAuthentication } from "./actions/user-actions"
import { initializeTheme } from "./store/themeSlice"
import Loading from "./components/shared/Loading"
import { useEffect } from "react"
import SignupTabs from "./pages/auth/SignupTabs"
import VerifyEmailManually from "./pages/auth/advance auth/VerifyEmailManually"

const ProtectedRoutes = ({children}) => {
    const {isAuthenticated, user} = useSelector(state => state.user);
    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }
    if(!user?.isVerified){
        return <Navigate to="/verify-email" replace />
    }
    return children;
}

const AuthenticatedUser = ({children}) => {
    const {isAuthenticated, user} = useSelector(state => state.user); //cannot go back to login and signup page if a user is authenticated
    if(isAuthenticated && user?.isVerified){
        return <Navigate to="/" replace />
    }
    return children;
}

const RecruiterProtectedRoute = ({children}) => {
    const {isAuthenticated, user} = useSelector(state => state.user);
    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }
    if(!user?.recruiter){
        return <Navigate to="/" replace />
    }
    return children;
}

const appRouter = createBrowserRouter([
    {
        path : "/",
        // element : <MainLayout />,
        element : <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
        children : [
            {
                path : "/",
                element : <Home />,
            },
            {
                path : "/admin",
                // element : <AdminHome />,
                element : <RecruiterProtectedRoute><AdminHome /></RecruiterProtectedRoute>,
            },
        ]
    },
    {
        path : "/login",
        // element : <Login />,
        element : <AuthenticatedUser><Login /></AuthenticatedUser>,
    },
    {
        path : "/signup",
        // element : <SignupTabs />,
        element : <AuthenticatedUser><SignupTabs /></AuthenticatedUser>,
    },
    {
        path : "/forgot-password",
        element : <ForgotPassword />,
    },
    {
        path : "/reset-password/:resetToken",
        element : <ResetPassword />,
    },
    {
        path : "/verify-email",
        // element : <VerifyEmail />,
        element : <AuthenticatedUser><VerifyEmail /></AuthenticatedUser>,
    },
    {
        path : "/verify-manual",
        // element : <VerifyEmail />,
        element : <AuthenticatedUser><VerifyEmailManually /></AuthenticatedUser>,
    },
    
])

function App() {

    const {isCheckingAuth, user} = useSelector(state => state.user);
    const dispatch = useDispatch();


    useEffect(() => {
        checkAuthentication(dispatch);
        initializeTheme()
    }, [dispatch]);

    useEffect(() => {
        if (!isCheckingAuth && !user) {
            <Navigate to="/login" replace />
        }
    }, [isCheckingAuth, user]);

    if (isCheckingAuth) {
        return <Loading />;
    }



  return (

    <RouterProvider router={appRouter}></RouterProvider>
  )
}

export default App
