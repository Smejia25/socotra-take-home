"use client";
import Button from "@/components/button";
import Card from "@/components/card";
import Input from "@/components/input";
import SideBar from "@/components/sideBar";
import { driverInfoSchema } from "@/lib/formSchema";
import {
  Driver,
  useInsuranceFormContext,
} from "@/providers/InsuranceFormProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { messages } from "./messages";

type Inputs = z.infer<typeof driverInfoSchema>;

export default function DriverInfo() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onBlur",
    resolver: zodResolver(driverInfoSchema),
  });
  const router = useRouter();

  const fields = Object.keys(driverInfoSchema.shape);
  const [open, setOpen] = useState(false);
  const [editingIndex, setIsEditing] = useState<number | null>(null);

  const { updateInsuranceForm, insuranceForm } = useInsuranceFormContext();

  const processForm = (data: Driver) => {
    updateInsuranceForm({
      drivers: [
        ...(insuranceForm?.drivers ? insuranceForm?.drivers : []),
        data,
      ],
    });
    resetDefaultValues();
    setOpen(false);
  };

  const resetDefaultValues = () => {
    reset({
      firstName: "",
      lastName: "",
      licenseNumber: "",
    });
  };

  const updateDriver = (data: Driver, index: number) => {
    const drivers = insuranceForm?.drivers || [];
    drivers?.splice(index, 1, data);
    updateInsuranceForm({
      drivers: [...drivers],
    });
    resetDefaultValues();
    setOpen(false);
    setIsEditing(null);
  };

  return (
    <>
      <section className=" flex flex-col justify-between gap-20 pt-10">
        <h2 className="mt-1 text-center text-3xl font-spaceGrotesk font-bold leading-6 text-gray-900">
          Tell us about the driver(s)
        </h2>
        {insuranceForm?.drivers &&
          insuranceForm?.drivers.map(
            ({ firstName, lastName, licenseNumber }, index) => (
              <Card
                onClick={() => {
                  reset({ firstName, lastName, licenseNumber });
                  setOpen(true);
                  setIsEditing(index);
                }}
                key={firstName + lastName + licenseNumber}
                iconSrc="/user.svg"
                title={`${firstName} ${lastName}`}
                subtitle={`${licenseNumber}`}
              />
            )
          )}
        <Button
          onClick={() => setOpen(true)}
          className="text-white bg-Socotra/Balance self-center"
          text="Add Driver"
          iconSrc="/add.svg"
        />
        {
          <SideBar
            open={open}
            title={editingIndex === null ? "Add Driver" : "Edit Driver"}
          >
            {
              <>
                <form className="px-10 mt-3 grow">
                  <>
                    <div className=" flex flex-col ">
                      {fields.map((field) => (
                        <Input
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
                <div className="justify-self-end pt-5 px-10 flex gap-3 justify-end border-t-[1px]">
                  <Button
                    onClick={() => {
                      resetDefaultValues();
                      setOpen(false);
                      setIsEditing(null);
                    }}
                    text="Cancel"
                  />
                  <Button
                    onClick={
                      Number.isInteger(editingIndex)
                        ? handleSubmit((data) => updateDriver(data, 1))
                        : handleSubmit(processForm)
                    }
                    className="text-white bg-Socotra/Balance"
                    text="Confirm"
                    disabled={!isValid}
                  />
                </div>
              </>
            }
          </SideBar>
        }
        {insuranceForm?.drivers?.length && (
          <Button
            className="text-white bg-Socotra/Balance self-end"
            text="Continue"
            onClick={() => router.push("./records")}

          />
        )}
      </section>
    </>
  );
}
