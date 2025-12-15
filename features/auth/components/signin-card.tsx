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
interface SigninCardProps {
  setState: (state: SignInFlow) => void;
}

export default function SigninCard({ setState }: SigninCardProps) {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleProviderLogin = (provider: "github" | "google") => {
    signIn(provider);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    signIn("password", { email, password })
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
        <CardTitle>Login to continue</CardTitle>
      </CardHeader>
      <CardDescription className="px-6">
        Use your email or another service to continue
      </CardDescription>
      {error && (
        <div className="px-6">
          <div className="bg-destructive/15 text-destructive p-2 rounded flex items-center gap-2">
            <TriangleAlert className="h-4 w-4" />
            <p>{error}</p>
          </div>
        </div>
      )}
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
          <Button
            disabled={loading}
            onClick={() => {}}
            className="w-full"
            type="submit"
          >
            {loading ? "Loading..." : "Login"}
          </Button>
          <Separator />
          <div className="flex flex-col gap-2">
            <Button
              disabled={loading}
              variant="outline"
              onClick={() => {
                handleProviderLogin("google");
              }}
              className="w-full relative"
              type="button"
            >
              <FcGoogle className="absolute left-2.5 top-2.5 h-4 w-4" />
              Continue with Google
            </Button>
            <Button
              disabled={loading}
              variant="outline"
              onClick={() => {
                handleProviderLogin("github");
              }}
              className="w-full relative"
              type="button"
            >
              <FaGithub className="size-4 absolute left-2.5 top-2.5 " />
              Continue with Github
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setState("signup")}
            >
              Sign up
            </span>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
