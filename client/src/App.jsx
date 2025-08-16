import { useEffect, useState } from 'react';
import Add from './components/Add';
import Table from './components/Table';

export default function App() {
    const [personagens, setPersonagens] = useState([]);

    async function getPersonagens() {
        const response = await fetch('http://localhost:5000/personagens');
        const data = await response.json();
        if (data.ok) {
            setPersonagens(data.personagens);
        } else {
            alert(data.message);
        }
    }

    useEffect(() => {
        getPersonagens();
    }, []);

    return (
        <>
            <Add onAdd={getPersonagens} />
            <Table personagens={personagens} />
        </>
    );
}
