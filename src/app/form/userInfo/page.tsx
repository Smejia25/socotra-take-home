"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { messages } from "./messages";
import { userInfoSchema } from "@/lib/formSchema";
import Card from "@/components/card";
import Button from "@/components/button";
import Input from "@/components/input";
import {
  useInsuranceFormContext,
  UserInsurance,
} from "@/providers/InsuranceFormProvider";
import { useRouter } from "next/navigation";

type Inputs = z.infer<typeof userInfoSchema>;

export default function UserInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onBlur",
    resolver: zodResolver(userInfoSchema),
  });
  const router = useRouter();

  const fields = Object.keys(userInfoSchema.shape);
  const { updateInsuranceForm } = useInsuranceFormContext();
  const processForm = (data: Partial<UserInsurance>) => {
    updateInsuranceForm(data);
    router.push("vehicles");
  };

  return (
    <>
      <section className=" flex flex-col justify-between">
        <form className=" py-12" onSubmit={handleSubmit(processForm)}>
          <>
            <h2 className="mt-1 text-center text-3xl font-spaceGrotesk font-bold leading-6 text-gray-900">
              Tell us about yourself
            </h2>
            <div className="mt-10 flex flex-col ">
              {fields.map((field) => (
                <Input
                  placeholder={field === "birthDate" ? "MM/DD/YYYY" : ""}
                  key={field}
                  field={field}
                  register={register}
                  label={messages[field]}
                  errorMessage={errors[field as keyof Inputs]?.message}
                />
              ))}
            </div>
          </>
        </form>
        <Button
          onClick={handleSubmit(processForm)}
          disabled={!isValid}
          className="self-end text-white bg-Socotra/Balance"
          text="Continue"
        />
      </section>
    </>
  );
}
