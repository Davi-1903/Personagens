import { useState } from 'react';

export default function Table() {
    const [personagens, setPersonagens] = useState([]);

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Habilidade</th>
                </tr>
            </thead>
            <tbody>
                {personagens.map(personagem => (
                    <tr>
                        <td>{personagem.id}</td>
                        <td>{personagem.nome}</td>
                        <td>{personagem.habilidade}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
