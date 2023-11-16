import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { ArrowRightCircle } from "lucide-react"
  
import { Login, Signup } from "../../index.js"

function ModalLoginForm() {
    const [formType, setFormType] = useState("login")
    

    const toggleFormType = () => {
        if (formType === "login") {
            setFormType("signup");
        } else {
            setFormType("login");
        }
    }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="h-12">
            Get Started <ArrowRightCircle className="ml-1.5 h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="py-14">
        <DialogHeader>
          <DialogTitle className="text-center font-medium mb-10 text-2xl capitalize">
            {formType=="login" ? "Login To get started" : "Register a new account"}
          </DialogTitle>
          <DialogDescription>
            {formType=="login" ? <Login /> : <Signup />}
            <p onClick={toggleFormType} className="mt-8 text-right text-sm font-medium cursor-pointer hover:text-primary duration-200 transition-colors ease-in-out pr-16">
              {formType=="login" ? "Don't have an account? Signup" : "Already have an account? Login"}
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ModalLoginForm;
