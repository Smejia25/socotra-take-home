"use client";
import { InsuranceFormContextProvider } from "@/providers/InsuranceFormProvider";
import Stepper from "@/components/stepper";
import { useState } from "react";

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [step, setStep] = useState(0);

  return (
    <div className="max-w-[25.9rem] m-auto flex flex-col py-12 justify-between">
      <>
        <Stepper />
        {children}
      </>
    </div>
  );
}
