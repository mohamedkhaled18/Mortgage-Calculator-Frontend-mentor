import { useState } from 'react';
import '../index.css';


export const NumberInput = ({ inputName, direction, icon, myref, onValidityChange }) => {
  const pattern = /\B(?=(\d{3})+(?!\d))/g;
  const [format, setFormat] = useState();
  const [isEmpty, setIsEmpty] = useState(false);


  const numberStyles = {
    outline: 0,
    borderRadius: '3px',
    paddingInline: '0.75rem',
    caretColor: 'var(--slate-500)',
    flexGrow: 1,
    fontWeight: 'bold',
  }

  function checkInput(e) {
    const input = e.target;
    if (input.value.trim() === '') {
      setIsEmpty(true);
      onValidityChange(false);
    } else {
      setIsEmpty(false);
      onValidityChange(true);
    }
  }


  return <div className={`${inputName} my-3 flex-1`}>
    <label htmlFor={inputName} className="capitalize text-[var(--slate-700)] text-lg block mb-2">
      {inputName}
    </label>
    <div className={`input-container group focus-within:border-[var(--lime)] flex ${direction === "left" ? 'flex-row' : 'flex-row-reverse'} border ${isEmpty && 'border-[var(--red)]'} rounded`}>
      <span className={`icon bg-[var(--slate-100)] px-3 py-1 text-[var(--slate-700)] text-lg font-bold group-focus-within:bg-[var(--lime)] ${isEmpty && 'bg-[var(--red)] text-white'}`}>{icon}</span>
      {
        inputName === 'Mortgage Amount' ? (<input
          style={numberStyles}
          type="text"
          value={format}
          onChange={(e) => {
            const input = e.target.value;
            const raw = input.replace(/,/g, ''); // remove previous commas
            if (!isNaN(raw)) {
              const withCommas = Number(raw).toLocaleString('en-US');
              setFormat(withCommas);
            }
            checkInput(e);
          }}
          ref={myref}
        />) : (<input type="number" onChange={checkInput} className='font-bold' style={numberStyles} ref={myref} />)
      }
    </div>
    <p className={`text-[var(--red)] my-2 ${isEmpty ? 'block' : 'hidden  '}`}>This field is required </p>
  </div>
}

export const RadioInput = ({ type, setType }) => {

  const radioStyles = {
    border: '2px solid var(--slate-700)',
    borderRadius: '50%',
    width: '15px',
    height: '15px',
  }

  return (
    <div onChange={(e) => {
      let type = e.target.id;
      setType(type);
    }}
      className={`${type} group focus-within:bg-[var(--lime-lighty)] focus-within:border-[var(--lime)] hover:border-[var(--lime-light)] border border-[var(--slate-700)] p-2 px-4 my-2 rounded flex items-center cursor-pointer`}>
      <input type="radio" name="mortgage-type" id={type}
        className='size-6 relative border border-[var(--slate-700)] checked:border-[var(--lime)] rounded-full'
      />
      <label
        htmlFor={type}
        className='flex-1 ml-3 font-bold text-[var(--slate-900)] cursor-pointer'
      >
        {type}
      </label>
    </div>
  )
}