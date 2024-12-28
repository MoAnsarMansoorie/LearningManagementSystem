import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Login = () => {
  const [signupInput, setSignupInput] = useState({name: "", email: "", password: ""})
  const [loginInput, setLoginInput] = useState({email: "", password: ""})

  const changeInputHandler = (e, type) => {
    const {name, value} = e.target
    if(type === "signup"){
      setSignupInput({...signupInput, [name]: value })
    } else {
      setLoginInput({...loginInput, [name]: value})
    }
  }

  const handleRegistration = (type) => {
    const inputData = type === "signup" ? signupInput : loginInput
    console.log(inputData)
  }

  return (
    <div className="flex items-center justify-center w-full">
      <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">SignUp</TabsTrigger>
        <TabsTrigger value="login">LogIn</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>SignUp</CardTitle>
            <CardDescription>
              Create a new account and click signup when you are done
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                placeholder="Enter your name"
                required="true"
                onChange={(e) => changeInputHandler(e, "signup")}
                name="name"
                value={signupInput.name}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                required="true"
                onChange={(e) => changeInputHandler(e, "signup")}
                name="email"
                value={signupInput.email}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                required="true"
                onChange={(e) => changeInputHandler(e, "signup")}
                name="password"
                value={signupInput.password}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleRegistration("signup")}>SignUp</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>LogIn</CardTitle>
            <CardDescription>
              Login your password here. After signup you can logged in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                required="true"
                onChange={(e) => changeInputHandler(e, "login")}
                name="email"
                value={loginInput.email}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                required="true"
                onChange={(e) => changeInputHandler(e, "login")}
                name="password"
                value={loginInput.password}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleRegistration("login")}>LogIn</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  );
};

export default Login;
