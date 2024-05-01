"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { messages } from "./messages";
import { recordsSchema } from "@/lib/formSchema";
import Card from "@/components/card";
import Button from "@/components/button";
import Input from "@/components/input";
import {
  Record,
  useInsuranceFormContext,
  UserInsurance,
} from "@/providers/InsuranceFormProvider";
import { useRouter } from "next/navigation";
import Select from "@/components/select";

type Inputs = z.infer<typeof recordsSchema>;

export default function Records() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onBlur",
    resolver: zodResolver(recordsSchema),
  });
  const router = useRouter();

  const fields = Object.keys(recordsSchema.shape);
  type User = z.infer<typeof recordsSchema>;
  const { updateInsuranceForm, insuranceForm } = useInsuranceFormContext();
  const processForm = (data: Record) => {
    updateInsuranceForm({ ...insuranceForm, recordAnswers: data });
    router.push('/quote')
  };

  return (
    <>
      <section className=" flex flex-col justify-between">
        <form className=" py-12" onSubmit={handleSubmit(processForm)}>
          <>
            <h2 className="mt-1 text-center text-2xl font-spaceGrotesk font-bold leading-6 text-gray-900">
              Tell us about the drivers’ record
            </h2>
            <div className="mt-10 flex flex-col ">
              {fields.map((field) => (
                <Select
                  key={field}
                  field={field}
                  register={register}
                  label={messages[field]}
                  errorMessage={errors[field as keyof Inputs]?.message}
                  name="pets"
                  id="pet-select"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
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
