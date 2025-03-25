"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function NewJob() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          New Job
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-[450px] p-6 bg-white rounded-lg shadow-lg">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold">Post a New Job</DrawerTitle>
        </DrawerHeader>
        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="Job Title" />

          {/* Job Type Dropdown */}
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
            </SelectContent>
          </Select>

          <Textarea placeholder="Job Description" className="col-span-2" />
          <Input placeholder="Required Skills (comma separated)" className="col-span-2" />

          {/* Experience Required Dropdown */}
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Experience Required" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1">0-1 year</SelectItem>
              <SelectItem value="1-3">1-3 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="5+">5+ years</SelectItem>
            </SelectContent>
          </Select>

          {/* Minimum Qualification Dropdown */}
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Minimum Qualification" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high-school">High School</SelectItem>
              <SelectItem value="bachelor">Bachelor's</SelectItem>
              <SelectItem value="master">Master's</SelectItem>
              <SelectItem value="phd">PhD</SelectItem>
            </SelectContent>
          </Select>

          {/* Job Location Dropdown */}
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Job Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="on-site">On-site</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>

          <Input placeholder="Salary Range (e.g., ₹6-10 LPA)" />

          {/* Application Deadline (Date Picker) */}
          <Input type="date" placeholder="Application Deadline" />
          <Input type="text" placeholder="Number of openings" />
        </div>

        <DrawerFooter className="mt-4">
          <Button className="w-full">Post Job</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
