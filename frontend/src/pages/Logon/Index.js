import React, {useState} from 'react';
import './styles.css';
import heroesImg from '../../assets/heroes.png'
import LogoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';
import api from '../../services/api';

export default function Logon() {
    const [id, setId] = useState('');
    const History = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try{
        const response = await api.post('session', {id});

        localStorage.setItem('ongId', id);
        localStorage.setItem('ongNome', response.data.nome);

        History.push('/profile')
        } catch(err){
            alert('Falha no login!');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
            <img src={LogoImg} alt="Be The Hero"></img>

            <form onSubmit={handleLogin}>
                <h1>Faça seu Logon</h1>
                <input placeholder="Sua ID" 
                value={id}
                onChange={e => setId(e.target.value)}
                />
                <button type="submit" className="button">Entrar</button>

                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#E02041"/>
                     Não tenho cadastro
                </Link>
            </form>
            </section>
            <img src={heroesImg} alt="Heroes"></img>
        </div>
    );
}