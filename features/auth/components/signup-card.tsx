import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "./types";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";
interface SignupCardProps {
  setState: (state: SignInFlow) => void;
}

export default function SignupCard({ setState }: SignupCardProps) {
  const { signIn } = useAuthActions();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleProviderSignup = (provider: "github" | "google") => {
    signIn(provider);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    signIn("password", { name, email, password, flow: "signUp" })
      .catch((error) => {
        setError("Invalid email or password");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Card className="w-ful h-full p-8">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
      </CardHeader>
      <CardDescription>
        Use your email or another service to continue
      </CardDescription>
      {error && (
        <div className="bg-destructive text-secondary-foreground p-2 rounded flex items-center gap-2">
          <TriangleAlert className="h-4 w-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            disabled={loading}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
            required
          />
          <Input
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Input
            disabled={loading}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            type="password"
            required
          />
          <Button
            disabled={loading}
            onClick={() => {}}
            className="w-full"
            type="submit"
          >
            {loading ? "Loading..." : "Sign up"}
          </Button>
          <Separator />
          <div className="flex flex-col gap-2">
            <Button
              disabled={loading}
              variant="outline"
              onClick={() => {}}
              className="w-full relative"
              type="button"
            >
              <FcGoogle className="absolute left-2.5 top-2.5 h-4 w-4" />
              Continue with Google
            </Button>
            <Button
              disabled={loading}
              variant="outline"
              onClick={() => {}}
              className="w-full relative"
              type="button"
            >
              <FaGithub className="size-4 absolute left-2.5 top-2.5 " />
              Continue with Github
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setState("signin")}
            >
              Sign in
            </span>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
