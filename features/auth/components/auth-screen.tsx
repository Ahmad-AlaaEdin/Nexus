"use client";

import { useState } from "react";
import SigninCard from "./signin-card";
import SignupCard from "./signup-card";
import { SignInFlow } from "./types";
export default function AuthScreen() {
  const [state, setState] = useState<SignInFlow>("signin");
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="md:h-auto md:w-md">
        {state === "signin" ? (
          <SigninCard setState={setState} />
        ) : (
          <SignupCard setState={setState} />
        )}
      </div>
    </div>
  );
}
