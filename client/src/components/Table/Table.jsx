import { useState } from 'react';
import './Table.css';

export default function Table({ personagens, onUpdate, deletePersonagem }) {
    const [updatingId, setUpdating] = useState(null);
    const [newNome, setNewNome] = useState('');
    const [newHabilidade, setNewHabilidade] = useState('');

    function changeToUpdating(personagem) {
        setNewNome(personagem.nome);
        setNewHabilidade(personagem.habilidade);
        setUpdating(personagem.id);
    }

    function changeToNormal() {
        setNewNome('');
        setNewHabilidade('');
        setUpdating(null);
    }

    async function updatePersonagem(id) {
        const newPersonagem = { newNome, newHabilidade };
        const response = await fetch(`/personagens/update/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPersonagem),
        });
        const data = await response.json();
        if (data.ok) {
            changeToNormal();
            onUpdate()
        }
        alert(data.message);
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Habilidade</th>
                    <th colSpan={2}>Ações</th>
                </tr>
            </thead>
            <tbody>
                {personagens.map(personagem => (
                    <tr key={personagem.id}>
                        <td>
                            {updatingId === personagem.id ? (
                                <input
                                    type='text'
                                    value={newNome}
                                    onChange={e => setNewNome(e.target.value)}
                                />
                            ) : (
                                personagem.nome
                            )}
                        </td>
                        <td>
                            {updatingId === personagem.id ? (
                                <input
                                    type='text'
                                    value={newHabilidade}
                                    onChange={e =>
                                        setNewHabilidade(e.target.value)
                                    }
                                />
                            ) : (
                                personagem.habilidade
                            )}
                        </td>
                        <td>
                            {updatingId === personagem.id ? (
                                <button
                                    onClick={() =>
                                        updatePersonagem(personagem.id)
                                    }
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => changeToUpdating(personagem)}
                                >
                                    Update
                                </button>
                            )}
                        </td>
                        <td>
                            {updatingId === personagem.id ? (
                                <button onClick={changeToNormal}>Cancel</button>
                            ) : (
                                <button
                                    onClick={() =>
                                        deletePersonagem(personagem.id)
                                    }
                                >
                                    Delete
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
