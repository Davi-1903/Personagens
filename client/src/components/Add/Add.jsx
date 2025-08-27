import { useEffect, useRef, useState } from 'react';
import InputLength from '../InputLenght/InputLength';
import './Add.css';

export default function Add({ onAddPersonage, onAdd }) {
    const [form, setForm] = useState({
        nome: '',
        habilidade: '',
    });
    const formsRef = useRef(null);

    async function addPersonagem(e) {
        e.preventDefault();
        const response = await fetch('/personagens', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        const data = await response.json();
        if (data.ok) {
            setForm({ nome: '', habilidade: '' });
            onAdd();
            onAddPersonage(false);
        }
        alert(data.message);
    }

    useEffect(() => {
        function clickOnScreen(event) {
            if (!formsRef.current?.contains(event.target)) {
                onAddPersonage(false);
            }
        }

        window.addEventListener('mousedown', clickOnScreen);
        return () => window.removeEventListener('mousedown', clickOnScreen);
    }, [onAddPersonage]);

    return (
        <div className='add-personagem-container'>
            <form onSubmit={addPersonagem} ref={formsRef}>
                <h2>Novo Personagem</h2>
                <InputLength
                    type={'text'}
                    placeholder={'Nome'}
                    value={form.nome}
                    setValue={value => setForm({ ...form, nome: value })}
                    maxLength={100}
                    required={true}
                />
                <InputLength
                    type={'text'}
                    placeholder={'Habilidade'}
                    value={form.habilidade}
                    setValue={value => setForm({ ...form, habilidade: value })}
                    maxLength={200}
                    required={true}
                />
                <button type='submit'>Adicionar</button>
            </form>
        </div>
    );
}
