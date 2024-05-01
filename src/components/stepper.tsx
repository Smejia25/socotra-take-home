import { FunctionComponent, useContext, Fragment } from "react";
import {
  InsuranceFormContext,
  useInsuranceFormContext,
} from "../providers/InsuranceFormProvider";

interface Props {}

const Stepper: FunctionComponent<{}> = () => {
  const { step } = useInsuranceFormContext();
  const steps = Array.from(Array(4).keys());
  return (
    <div className="h-[3.2rem] p-4 flex  ">
      {steps.map((item) => (
        <Fragment key={item}>
          <div
            className={`w-6 h-6 px-0.5 pb-[1px] text-center border-[1px] rounded-full font-raleway text-sm ${
              item !== step
                ? "text-Primary/Normal "
                : "text-white bg-Socotra/Growth"
            }`}
          >
            {item + 1}
          </div>
          {item !== steps.length - 1 ? (
            <hr className=" border-White/Darkest w-[5.87rem] my-auto" />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
};

export default Stepper;
