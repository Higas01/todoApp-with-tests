import React from 'react'

type InputProps = {
    children: React.ReactNode;
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const Input = ({children, value, setValue}: InputProps) => {
  return (
    <div>
        <label>
        {children}
        <input type="text" value={value} onChange={e => setValue(e.target.value)} />
        </label>
    </div>
  )
}

export default Input