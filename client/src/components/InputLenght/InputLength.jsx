import { useState } from 'react';
import './InputLength.css';

export default function InputLength({
    type,
    placeholder = '',
    value,
    setValue,
    maxLength,
}) {
    const [length, setLength] = useState(value.length);

    return (
        <div className='input-length'>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={e => {
                    setValue(e.target.value);
                    setLength(e.target.value.length);
                }}
                maxLength={maxLength}
            />
            <p>
                {length}/{maxLength}
            </p>
        </div>
    );
}
