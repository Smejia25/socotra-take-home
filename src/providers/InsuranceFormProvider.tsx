import { createContext, useContext, useEffect, useState } from "react";

export type UserInsurance = {
  name: string;
  birthDate: Date;
  vehicles: Vehicle[];
  drivers: Driver[];
  recordAnswers: Record;
};

export type Vehicle = {
  make: string;
  model: string;
  year: number;
  value: number;
};
export type Driver = {
  firstName: string;
  lastName: string;
  licenseNumber: string;
};

export type Record = {
  faultAccidents?: string;
  convictions?: string;
  revocations?: string;
};
export interface UserInsuranceContextProps {
  insuranceForm: Partial<UserInsurance> | null;
  updateInsuranceForm: (data: Partial<UserInsurance>) => void;
  step: number;
}

export const InsuranceFormContext =
  createContext<UserInsuranceContextProps | null>({
    insuranceForm: { vehicles: [], drivers: [], recordAnswers: {} },
    updateInsuranceForm: () => null,
    step: 0,
  });

export function InsuranceFormContextProvider({
  children,
}: React.PropsWithChildren) {
  const [step, setStep] = useState(0);
  const [userInsurance, setUserInsurance] =
    useState<Partial<UserInsurance> | null>(null);
  const nextStep = () =>
    setStep((previous) => {
      return previous + 1;
    });

  const updateInsuranceForm = (values: Partial<UserInsurance>) => {
    setUserInsurance({ ...userInsurance, ...values });
    nextStep();
  };

  useEffect(() => {
    console.log(step, userInsurance);
  }, [step, userInsurance]);

  // adding this code 👇🏽
  return (
    <InsuranceFormContext.Provider
      value={{ insuranceForm: userInsurance, updateInsuranceForm, step }}
    >
      {children}
    </InsuranceFormContext.Provider>
  );
}

export const useInsuranceFormContext = () => {
  const context = useContext(InsuranceFormContext);
  if (!context) {
    throw new Error("Provider must be used within a InsuranceFormProvider");
  }

  return context;
};
