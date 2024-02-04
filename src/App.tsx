import { FormEvent, useState } from "react";
import { AccountForm } from "./AccountForm";
import { AddressForm } from "./AddressForm";
import { UserForm } from "./UserForm";
import { useMultiStapsForm } from "./useMultiStapsForm";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: string;
  street: string;
  city: string;
  state: string;
  zip: string;
};

const INITIAL_STATE: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
};

function App() {
  const [data, setData] = useState(INITIAL_STATE);
  function updateFields(fields: Partial<FormData>){
    setData(prev => {
      return{...prev,...fields}
    });
  }

  const { staps, currentStepIndex, isFirstStep, isLastStep, step, back, next } =
    useMultiStapsForm(
      [<UserForm  {...data}  updateFields={updateFields}/>,
       <AddressForm  {...data} updateFields={updateFields} />,
        <AccountForm {...data} updateFields={updateFields} />
      ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    alert("Successfull account creation");
  }

  return (
    <div
      style={{
        position: `relative`,
        background: "white",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: ".5rem",
        fontFamily: "Arial",
        maxWidth: "max-content"
      }}
    >
      <form onSubmit={onSubmit}>
        <div
          style={{
            position: "absolute",
            top: ".5rem",
            right: ".5rem",
          }}
        >
          {currentStepIndex + 1}/{staps.length}
        </div>

        {step}

        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "flex-end",
            gap: ".5rem",
          }}
        >
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}

          <button type="submit">{!isLastStep ? "Next" : "Finish"}</button>
        </div>
      </form>
    </div>
  );
}

export default App;
