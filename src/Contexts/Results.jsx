
import { createContext, useState } from 'react';

export const resultsContext = createContext();

const ResultsProvider = ({children}) => {
  const [monthlyRepay, setMonthlyRepay] = useState(0);
  const [totalRepay, setTotalRepay] = useState(0);
  const [fieldValidity, setFieldValidity] = useState({
      mortgageAmount: false,
      mortgageTerm: false,
      mortgageInterest: false,
    });
  const props = {
    monthlyRepay,
    setMonthlyRepay,
    totalRepay,
    setTotalRepay,
    fieldValidity, 
    setFieldValidity
  };


  return (
    <resultsContext.Provider value={props}>
      {children}
    </resultsContext.Provider>
  )
}

export default ResultsProvider;