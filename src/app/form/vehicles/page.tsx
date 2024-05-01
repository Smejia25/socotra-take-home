"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import SideBar from "@/components/sideBar";
import { vehicleInfoSchema } from "@/lib/formSchema";
import {
  useInsuranceFormContext,
  Vehicle,
} from "@/providers/InsuranceFormProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { messages } from "./messages";
import Card from "@/components/card";

type Inputs = z.infer<typeof vehicleInfoSchema>;

export default function VehicleInfo() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onBlur",
    resolver: zodResolver(vehicleInfoSchema),
  });
  const router = useRouter();

  const fields = Object.keys(vehicleInfoSchema.shape);
  const [open, setOpen] = useState(false);
  const [editingIndex, setIsEditing] = useState<number | null>(null);

  const { updateInsuranceForm, insuranceForm } = useInsuranceFormContext();

  const processForm = (data: Vehicle) => {
    updateInsuranceForm({
      vehicles: [
        ...(insuranceForm?.vehicles ? insuranceForm?.vehicles : []),
        data,
      ],
    });
    resetDefaultValues();
    setOpen(false);
  };

  const resetDefaultValues = () => {
    reset({
      make: "",
      year: 0,
      model: "",
      value: 0,
    });
  };

  const updateVehicle = (data: Vehicle, index: number) => {
    const vehicles = insuranceForm?.vehicles || [];
    vehicles?.splice(index, 1, data);
    updateInsuranceForm({
      vehicles: [...vehicles],
    });
    resetDefaultValues();
    setOpen(false);
    setIsEditing(null);
  };

  return (
    <>
      <section className=" flex flex-col justify-between gap-20 pt-10">
        <h2 className="mt-1 text-center text-3xl font-spaceGrotesk font-bold leading-6 text-gray-900">
          Tell us about your vehicle(s)
        </h2>
        {insuranceForm?.vehicles &&
          insuranceForm?.vehicles.map(({ year, make, model, value }, index) => (
            <Card
              onClick={() => {
                reset({ year, make, model, value });
                setOpen(true);
                setIsEditing(index);
              }}
              key={make + model + year}
              iconSrc="/icon.svg"
              title={`${year} ${make} ${model}`}
              subtitle={`${value}`}
            />
          ))}
        <Button
          onClick={() => setOpen(true)}
          className="text-white bg-Socotra/Balance self-center"
          text="Add Vehicle"
          iconSrc="/add.svg"
        />
        {
          <SideBar
            open={open}
            title={editingIndex === null ? "Add Vehicle" : "Edit Vehicle"}
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
                        ? handleSubmit((data) => updateVehicle(data, 1))
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
        {insuranceForm?.vehicles?.length && (
          <Button
            onClick={() => router.push("./drivers")}
            className="text-white bg-Socotra/Balance self-end"
            text="Continue"
          />
        )}
      </section>
    </>
  );
}
