import { useEffect, useState } from 'react';
import Add from './components/Add/Add';
import Table from './components/Table/Table';
import './App.css';

export default function App() {
    const [addPersonagem, setAddPersonagem] = useState(false);
    const [personagens, setPersonagens] = useState([]);

    async function getPersonagens() {
        const response = await fetch('/personagens');
        const data = await response.json();
        if (data.ok) {
            setPersonagens(data.personagens);
        } else {
            alert(data.message);
        }
    }

    async function deletePersonagem(id) {
        if (confirm('Você tem certeza?')) {
            const response = await fetch(`/personagens/delete/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.ok) getPersonagens();
            alert(data.message);
        }
    }

    useEffect(() => {
        getPersonagens();
    }, []);

    return (
        <div className='wrapper'>
            <div className='personagens-container'>
                {addPersonagem && (
                    <Add
                        onAddPersonage={setAddPersonagem}
                        onAdd={getPersonagens}
                    />
                )}
                <button onClick={() => setAddPersonagem(true)}>
                    Adicionar personagem
                </button>
                <Table
                    personagens={personagens}
                    onUpdate={getPersonagens}
                    deletePersonagem={deletePersonagem}
                />
            </div>
        </div>
    );
}
