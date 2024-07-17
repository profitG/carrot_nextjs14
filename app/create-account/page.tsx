"use client";

import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import Input from "@/components/input";
import Button from "@/components/button";

export default function CreateAccount() {
  const [state, trigger] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={trigger} className="flex flex-col gap-3">
        <Input
          type="text"
          placeholder="Username"
          required
          name="username"
          errors={state?.fieldErrors.username}
          minLength={3}
          maxLength={10}
        />
        <Input
          type="email"
          placeholder="Email"
          required
          name="email"
          errors={state?.fieldErrors.email}
        />
        <Input
          type="password"
          placeholder="Password"
          required
          name="password"
          errors={state?.fieldErrors.password}
          minLength={4}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          required
          name="confirmPassword"
          errors={state?.fieldErrors.confirmPassword}
          minLength={4}
        />
        <Button text="Create account" />
      </form>
      <SocialLogin />
    </div>
  );
}
