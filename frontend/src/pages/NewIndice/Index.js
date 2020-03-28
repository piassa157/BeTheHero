import React, {useState} from 'react';
import './styles.css';
import LogoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';

export default function NewIndice() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    async function handleNewIndice(e) {
        e.preventDefault();

        const data ={
            titulo,
            descricao,
            valor
        }

        try {
            await api.post('indices', data, {
                headers: {
                    Authorization: ongId
                }
            });

            history.push('/profile');
        } catch(err){
            alert('Erro ao cadastrar caso!')
        }
    }

    return (
        <div className="new-incident-container"> 
        <div className="content">
            <section>

                <img src={LogoImg} alt="Be The Hero"></img>
                <h1>Cadastrar Novo Caso</h1>
                <p>Descreva o caso para encontrar um novo heroi</p>

                <Link className="back-link" to="/profile">
                <FiArrowLeft size={16} color="#E02041"/>
                Voltar para home
                </Link>
            </section>

            <form onSubmit={handleNewIndice}>
                <input 
                placeholder="Titulo do " 
                value={titulo}
                onChange={e => setTitulo(e.target.value)}    
                />
                <textarea 
                placeholder="Descrição" 
                value={descricao}
                onChange={e => setDescricao(e.target.value)}    
                />
                <input 
                placeholder="Valor em Reais" 
                value={valor}
                onChange={e => setValor(e.target.value)}    
                />

                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    );
}