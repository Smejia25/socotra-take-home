"use client";
import Card from "@/components/card";
import { useInsuranceFormContext } from "@/providers/InsuranceFormProvider";

export default function Quote() {
  const { insuranceForm } = useInsuranceFormContext();

  return (
    <>
      <section className=" text-center flex flex-col justify-between items-center gap-10 pt-12">
        <div className=" flex flex-col justify-between font-raleway text-left w-[25.8rem] text-white shadow-lg p-5 rounded-lg h-[8.75rem] bg-secondary">
          <h4 className="font-[300] text-[20px] leading-[28px]">Auto Quote</h4>
          <h1 className="mt-4 font-bold text-3xl">$150.00</h1>
          <p className="mt-1 text-opacity-60 font-[200]"> per month</p>
        </div>
        <div className="border-b-[1px] heig  pt-0 w-[15.75rem] h-8 border-White/Darkest">
          <span>Vehicles</span>
        </div>
        {insuranceForm?.drivers &&
          insuranceForm?.drivers.map(
            ({ firstName, lastName, licenseNumber }, index) => (
              <Card
                key={firstName + lastName + licenseNumber}
                iconSrc="/user.svg"
                title={`${firstName} ${lastName}`}
              />
            )
          )}
        <div className="border-b-[1px] pt-0 w-[15.75rem] h-8 border-White/Darkest">
          <span>Drivers</span>
        </div>

        {insuranceForm?.vehicles &&
          insuranceForm?.vehicles.map(({ year, make, model, value }, index) => (
            <Card
              key={make + model + year}
              iconSrc="/icon.svg"
              title={`${year} ${make} ${model}`}
            />
          ))}
      </section>
    </>
  );
}
