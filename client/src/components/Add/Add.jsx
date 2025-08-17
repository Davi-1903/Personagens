import { useState } from 'react';
import './Add.css';

export default function Add({ onAddPersonage, onAdd }) {
    const [nome, setNome] = useState('');
    const [habilidade, setHabilidade] = useState('');

    async function addPersonagem(e) {
        e.preventDefault();
        const personagem = { nome, habilidade };
        const response = await fetch('/personagens/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(personagem),
        });
        const data = await response.json();
        if (data.ok) {
            setNome('');
            setHabilidade('');
            console.log(data.message);
            onAdd();
            onAddPersonage(false);
        } else {
            console.erro(data.message);
        }
    }

    return (
        <div className='add-personagem-container'>
            <form onSubmit={addPersonagem}>
                <div className='cancel-container'>
                    <button onClick={() => onAddPersonage(false)}>x</button>
                </div>
                <h2>Novo Personagem</h2>
                <input
                    type='text'
                    placeholder='Nome'
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='Habilidade'
                    value={habilidade}
                    onChange={e => setHabilidade(e.target.value)}
                    required
                />
                <button type='submit'>Adicionar</button>
            </form>
        </div>
    );
}
