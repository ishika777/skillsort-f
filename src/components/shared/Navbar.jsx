import React from 'react'
import { Button } from '../ui/button'
import { logout } from '@/actions/user-actions'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const Navbar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user);


    const logoutHandler = async () => {
        const res = await logout(dispatch);
        if(res){
            navigate("/login")
        }
    }


  return (
    <nav className="flex items-center justify-between px-6 py-3 h-[64px] bg-white">
            <div className="text-xl font-bold text-gray-800">
            <span className="text-red-500">Skill</span>Sort
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center space-x-3 cursor-pointer bg-gray-200 px-3 py-1 rounded-lg">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src={user?.profilePicture || "https://via.placeholder.com/150"} alt={user?.fullname} />
                            <AvatarFallback>{user?.fullname?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <span className="text-gray-700 font-medium">{user?.fullname || "User"}</span>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => console.log("Profile Clicked")}>Profile</DropdownMenuItem>
                    <DropdownMenuItem className="bg-red-200" onClick={logoutHandler}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </nav>
  )
}

export default Navbar

