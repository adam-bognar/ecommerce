import { login } from "@/api";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthCard } from "@/Modules/Auth/AuthCard";
import { AuthLayout } from "@/Modules/Auth/AuthLayout";
import { FormInput } from "@/Modules/Auth/FormInput";
import { PasswordInput } from "@/Modules/Auth/PasswordInput";
import { Label } from "@radix-ui/react-label";
import { ArrowRight, MailIcon } from "lucide-react";
import { useState } from "preact/hooks";
import { Link } from "wouter";

export function SignInPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const handleSubmit = async () => {
    try{
      await login(email, password);
      console.log(email, password)

      //navigate("/");
    } catch (e: any) {
      console.log("catch")
      console.error(e?.response?.data || "Login failed.");
    }
  };

  return (
    <AuthLayout 
      title="Üdv újra!" 
      subtitle="Jelentkezz be a folytatáshoz"
    >
      <AuthCard
        title="Bejelentkezés"
        description="Add meg az email címed és a jelszavad"
        footer={
          <div className="text-center text-sm text-neutral-400">
            Nincsen fiókod?{" "}
            <Link href="/sign-up" className="text-amber-300 hover:text-amber-200">
              Regisztrálj itt
            </Link>
          </div>
        }
      >
        <FormInput
          id="email"
          label="Email"
          type="email"
          placeholder="name@example.com"
          icon={<MailIcon className="h-4 w-4" />}
          onChange={handleEmailChange}
        />
        
        <PasswordInput
          id="password"
          label="Jelszó"
          forgotPasswordLink={true}
          onChange={handlePasswordChange}
        />
        
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm font-normal">
            Emlékezz rám 7 napig
          </Label>
        </div>
        
        <Button className="w-full bg-amber-300 hover:bg-amber-400 text-black py-5" size="lg" onClick={handleSubmit}>
          Bejelentkezés
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </AuthCard>
    </AuthLayout>
  );
}