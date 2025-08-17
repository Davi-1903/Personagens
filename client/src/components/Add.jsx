import { useState } from 'react';

export default function Add({ onAdd }) {
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
        } else {
            console.erro(data.message);
        }
    }

    return (
        <form onSubmit={addPersonagem}>
            <input
                type='text'
                placeholder='Nome'
                value={nome}
                onChange={e => setNome(e.target.value)}
            />
            <input
                type='text'
                placeholder='Habilidade'
                value={habilidade}
                onChange={e => setHabilidade(e.target.value)}
            />
            <button type='submit'>Adicionar</button>
        </form>
    );
}
