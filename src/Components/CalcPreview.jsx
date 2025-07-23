import { useContext } from "react"
import { resultsContext } from "../Contexts/Results.jsx"
import '../index.css'

const EmptyPreview = () => {
  return <div className="empty-preview text-center">
    <div className="preview-image grid place-items-center">
      <img src="./assets/images/illustration-empty.svg" alt="" />
    </div>
    <h2 className="text-[var(--white)] text-xl font-bold">Results shown here</h2>
    <p className="text-[var(--slate-300)] mt-4 px-4 leading-normal">Complete the form and click “calculate repayments” to see what
      your monthly repayments would be.</p>
  </div>
}

const CompletedPreview = () => {

  const { monthlyRepay, totalRepay } = useContext(resultsContext);

  return <div className="completed-preview p-3 py-6">
    <h2 className="text-white text-2xl font-bold mb-2">Your results</h2>
    <p className="text-[var(--slate-300)] mb-8">Your results are shown below based on the information you
      provided. To adjust the results, edit the form and click
      "calculate repayments" again.</p>
    <section id="results" className="px-4 py-6 bg-[var(--slate-950)] rounded-md border border-[4px] border-t-[var(--lime)] border-transparent">
      <div className="monthly-repay border border-transparent border-b-[var(--slate-700)]">
        <p className="text-[var(--slate-300)] mb-4">Your monthly repayments</p>
        <p id="monthly-repay" className="text-[var(--lime)] text-5xl font-bold mb-8">&pound;{monthlyRepay.toFixed(2)}</p>
      </div>
      <div className="total-repay mt-8">
        <p className="text-[var(--slate-300)] mb-4">Total you'll repay over the term</p>
        <p className="text-white font-bold text-2xl" id="total-repay">&pound;{totalRepay.toFixed(2)}</p>
      </div>
    </section>
  </div>
}

export const CalcPreview = () => {
  const { fieldValidity } = useContext(resultsContext);
  const isAllValid = Object.values(fieldValidity).every(Boolean);
  return <div className={`preview-section ${!isAllValid && 'grid place-items-center'} bg-[var(--slate-900)] rounded-bl-[4rem] p-6 lg:w-[500px]`}>
    {
      isAllValid ? <CompletedPreview /> : <EmptyPreview />
    }
  </div>
}

export default CalcPreview;