import { useEffect, useState } from 'react';

export default function Table() {
    const [personagens, setPersonagens] = useState([]);

    useEffect(() => {    
        getPersonagens();
    }, []);

    async function getPersonagens() {
        const response = await fetch('http://localhost:5000/personagens');
        const data = await response.json();
        if (data.ok) {
            setPersonagens(data.personagens);
        } else {
            alert(data.message);
        }
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
                        <td>{personagem.nome}</td>
                        <td>{personagem.habilidade}</td>
                        <td>
                            <button>Update</button>
                        </td>
                        <td>
                            <button>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
