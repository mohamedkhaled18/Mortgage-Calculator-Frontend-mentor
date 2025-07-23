import CalcForm from "./Components/CalcForm"
import CalcPreview from "./Components/CalcPreview"
import ResultsProvider from "./Contexts/Results"
import "./index.css"

function App() {

  return (
    <ResultsProvider>
    <div className="App_Container m-4 flex flex-col lg:flex-row justify-between gap-3 rounded-2xl bg-white overflow-hidden lg:min-w-[700px]">
      <CalcForm />
      <CalcPreview />
    </div>
  </ResultsProvider>
  
  )
}

export default App
