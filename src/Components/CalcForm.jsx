import { NumberInput, RadioInput } from "./InputLabeled";
import { useState, useRef, useContext } from "react";
import { resultsContext } from '../Contexts/Results.jsx'
import "../index.css"


const CalcForm = () => {

  const [mortgageType, setMortgageType] = useState('');
  const { setMonthlyRepay, setTotalRepay, fieldValidity, setFieldValidity } = useContext(resultsContext); 


  const refs = {
    myForm: useRef(null),
    mortgageAmount: useRef(null),
    mortgageTerm: useRef(null),
    mortgageInterest: useRef(null)
  }

  function resetForm() {
    refs.myForm.current.reset();
    setMonthlyRepay(0);
    setTotalRepay(0);
    setMortgageType('');
  }

  function handleMortgage(e) {
    e.preventDefault();
    const mortgageAmount = parseFloat(refs.mortgageAmount.current.value.replace(',', ''));
    const yearlyTerm = refs.mortgageTerm.current.value;
    const annualInterest = refs.mortgageInterest.current.value / 100;
    const allValid = Object.values(fieldValidity).every(Boolean);

    if (!allValid || mortgageType === '') {
      return;
    }

    let totalRepay, monthlyRepay;
    
    if (mortgageType.toLowerCase() === "interest only") {
      let interestAmount = mortgageAmount * annualInterest;
      totalRepay = interestAmount * yearlyTerm;
      monthlyRepay = totalRepay / (yearlyTerm * 12);
    } else if (mortgageType.toLowerCase() === "repayment") {
      let monthlyRate = annualInterest / 12;
      let monthlyTerm = yearlyTerm * 12;
      const dividened = mortgageAmount * monthlyRate * Math.pow(1 + monthlyRate, monthlyTerm);
      const divisor = Math.pow(1 + monthlyRate, monthlyTerm) - 1;
      monthlyRepay = dividened / divisor;
      totalRepay = monthlyRepay * monthlyTerm;
    }
    setFieldValidity({
      mortgageAmount: true,
      mortgageInterest: true,
      mortgageTerm: true,
    });
    setMonthlyRepay(monthlyRepay);
    setTotalRepay(totalRepay);
  }
  
  return <form ref={refs.myForm} className="p-5 md:p-8 flex-1">
    <header className="flex justify-between items-center mb-4">
      <h2 className="font-bold text-[var(--slate-900)] text-xl">Mortage Calculator</h2>
      <p className="underline text-[var(--slate-700)] cursor-pointer" onClick={resetForm}>Clear All</p>
    </header>
    <section id="numbers">
      <NumberInput inputName={'Mortgage Amount'} icon={'\u00A3'} direction={'left'} myref={refs.mortgageAmount} 
        onValidityChange={(valid) => setFieldValidity(prev => {
          return {...prev, mortgageAmount: valid}
        })}  />
      <div className="flex md:flex-row flex-col md:gap-3">
        <NumberInput inputName={'Mortgage Term'} icon={'years'} direction={'right'} myref={refs.mortgageTerm} 
          onValidityChange={(valid) => setFieldValidity(prev => ({...prev, mortgageTerm: valid}))}  />
        <NumberInput inputName={'Interest Rate'} icon={'%'} direction={'right'} myref={refs.mortgageInterest} 
          onValidityChange={(valid) => setFieldValidity(prev => ({...prev, mortgageInterest: valid}))}  />
      </div>
    </section>
    <section id="mortgage-type" className="my-3">
      <p className="text-[var(--slate-700)] text-lg">Mortgage Type</p>
      <RadioInput type={"Repayment"} setType={setMortgageType} />
      <RadioInput type={"Interest Only"} setType={setMortgageType} />
      <p className="text-[var(--red)] my-2 hidden">This field is required </p>
    </section>
    <button  className="flex justify-center items-center bg-[var(--lime)] rounded-full mt-8 p-3  md:py-4 md:px-10 font-bold text-lg transition hover:bg-[var(--lime-light)] w-full md:w-[fit-content]" onClick={handleMortgage}>
      <img className="w-[20px] h-[20px]" src="./assets/images/icon-calculator.svg" alt="calculator icon" />
      <span className="mx-3">Calculate Repayments</span>
    </button>
  </form>
}

export default CalcForm;