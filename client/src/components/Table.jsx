export default function Table({ personagens, deletePersonagem }) {
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
                            <button
                                onClick={() => deletePersonagem(personagem.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
