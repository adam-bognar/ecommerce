import { register } from "@/api";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AuthCard } from "@/Modules/Auth/AuthCard";
import { AuthLayout } from "@/Modules/Auth/AuthLayout";
import { FormInput } from "@/Modules/Auth/FormInput";
import { NameInput } from "@/Modules/Auth/NameInput";
import { PasswordInput } from "@/Modules/Auth/PasswordInput";
import { ArrowRight, MailIcon, UserIcon } from "lucide-react";
import { useState } from "preact/hooks";
import { Link, useLocation } from "wouter";

export function SignUpPage() {
    
    const [, navigate] = useLocation();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            await register(firstname,lastname, email, password);
            // Redirect to login after successful signup

            console.log(firstname,lastname, email, password)
            navigate("/sign-in");
        } catch (e: any) {
            console.log("catch")
            setError(e?.response?.data || "Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleFirstNameChange = (e: any) => setFirstname(e.target.value);
    const handleLastNameChange = (e: any) => setLastname(e.target.value);
    const handleEmailChange = (e: any) => setEmail(e.target.value);
    const handlePasswordChange = (e: any) => setPassword(e.target.value);

    return (
        <AuthLayout
            title="Regisztrálj a folytatáshoz!"
            subtitle=""
        >
            <AuthCard
                title="Regisztráció"
                description=""
                footer={
                    <div className="text-center text-sm text-neutral-400">
                        Van már fiókod?{" "}
                        <Link href="/sign-in" className="text-amber-300 hover:text-amber-200">
                            Jelentkezz be itt
                        </Link>
                    </div>
                }
            >
                <NameInput
                    id="name"
                    icon={<UserIcon className="h-4 w-4" />}
                    type="text"
                    handleFirstNameChange={handleFirstNameChange}
                    handleLastNameChange={handleLastNameChange}
                    
                />

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

                <Button className="w-full bg-amber-300 hover:bg-amber-400 text-black" size="lg" onClick={handleSubmit}>
                    Regisztráció
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </AuthCard>
        </AuthLayout>

    )
}