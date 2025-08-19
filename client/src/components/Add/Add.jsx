import { useEffect, useRef, useState } from 'react';
import InputLength from '../InputLenght/InputLength';
import './Add.css';

export default function Add({ onAddPersonage, onAdd }) {
    const [nome, setNome] = useState('');
    const [habilidade, setHabilidade] = useState('');
    const formsRef = useRef(null);

    async function addPersonagem(e) {
        e.preventDefault();
        const personagem = { nome, habilidade };
        const response = await fetch('/personagens', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(personagem),
        });
        const data = await response.json();
        if (data.ok) {
            setNome('');
            setHabilidade('');
            onAdd();
            onAddPersonage(false);
        }
        alert(data.message);
    }

    useEffect(() => {
        function clickOnScreen(event) {
            if (formsRef.current && !formsRef.current.contains(event.target)) {
                onAddPersonage(false);
            }
        }

        window.addEventListener('mousedown', clickOnScreen);
        return () => window.removeEventListener('mousedown', clickOnScreen);
    }, [onAddPersonage]);

    return (
        <div className='add-personagem-container'>
            <form onSubmit={addPersonagem} ref={formsRef}>
                <div className='cancel-container'>
                    <button type='button' onClick={() => onAddPersonage(false)}>x</button>
                </div>
                <h2>Novo Personagem</h2>
                <InputLength
                    type={'text'}
                    placeholder={'Nome'}
                    value={nome}
                    setValue={setNome}
                    maxLength={100}
                    required={true}
                />
                <InputLength
                    type={'text'}
                    placeholder={'Habilidade'}
                    value={habilidade}
                    setValue={setHabilidade}
                    maxLength={200}
                    required={true}
                />
                <button type='submit'>Adicionar</button>
            </form>
        </div>
    );
}
