import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { WriteBlogsForm } from "../../components/index";

import { PenLine } from "lucide-react";

function WriteBlogs() {
  return (
    <div className="mt-12 flex items-start justify-center min-h-screen w-full">
      <Card className="max-w-fit border-none min-w-[750px] px-8 py-6 shadow-md flex flex-col items-center justify-center ">
        <CardHeader>
          <CardTitle>
            <p className="text-3xl font-medium flex items-center"> <PenLine className="mr-3 w-8 h-8" /> Write A New Post</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-8">
          <WriteBlogsForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default WriteBlogs;
