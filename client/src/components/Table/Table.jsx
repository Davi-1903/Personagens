import { useState } from 'react';
import InputLength from '../InputLenght/InputLength';
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
        const response = await fetch(`/personagens/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPersonagem),
        });
        const data = await response.json();
        if (data.ok) {
            changeToNormal();
            onUpdate();
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
                        {updatingId === personagem.id ? (
                            <>
                                <td>
                                    <InputLength
                                        type={'text'}
                                        value={newNome}
                                        setValue={setNewNome}
                                        maxLength={100}
                                        required={true}
                                        />
                                </td>
                                <td>
                                    <InputLength
                                        type={'text'}
                                        value={newHabilidade}
                                        setValue={setNewHabilidade}
                                        maxLength={200}
                                        required={true}
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            updatePersonagem(personagem.id)
                                        }
                                    >
                                        Save
                                    </button>
                                </td>
                                <td>
                                    <button onClick={changeToNormal}>
                                        Cancel
                                    </button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td>{personagem.nome}</td>
                                <td>{personagem.habilidade}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            changeToUpdating(personagem)
                                        }
                                    >
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            deletePersonagem(personagem.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
