"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState, useFormStatus } from "react-dom";
import { smsVerification } from "./actions";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogIn() {
  const [state, trigger] = useFormState(smsVerification, initialState);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={trigger} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            key="tk"
            name="token"
            type="number"
            placeholder="Verification code"
            required
            min={100000}
            max={999999}
          />
        ) : (
          <Input
            key="ph"
            name="phone"
            type="text"
            placeholder="Phone number"
            required
            errors={state.error?.formErrors}
          />
        )}
        <Button text={state.token ? "Verify" : "Get verify code"} />
      </form>
    </div>
  );
}
