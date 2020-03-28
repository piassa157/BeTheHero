import React, {useState,useEffect} from 'react';
import LogoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

export default function Profile(){
    const [indices, setIndices] = useState([]);
    const ongNome = localStorage.getItem('ongNome');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    useEffect( () => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIndices(response.data);
        })
    }, [ongId]);

    async function handleDelete(id){
        try{
              await api.delete(`indices/${id}`, {
                  headers: {
                      Authorization: ongId
                  }
              });
              
              setIndices(indices.filter(indices => indices.id !== id))
        }catch(err){
            alert('Erro ao deletar o caso!')
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
      <div className="profile-container">
        <header>
            <img src={LogoImg} alt="Be The Hero" />
            <span> Bem Vindo, {ongNome}</span>

            <Link className="button" to="/indice/new">Cadastrar Novo Caso</Link>
            <button type="button" onClick={handleLogout}>
                <FiPower size={18} color="#E02041" />
            </button>
        </header>

        <h1>Casos Cadastrados</h1>

        <ul>
            {indices.map(indic => (
            <li key={indic.id}>
                <strong>Caso:</strong>
                <p>{indic.titulo}</p>

                <strong>Descriçao:</strong>
                <p>{indic.descricao}</p>

                <strong>valor:</strong>
                <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(indic.valor)}</p>

                <button type="button" onClick={() => handleDelete(indic.id)}>
                    <FiTrash2 size={20} color="a8a8b3" />
                </button>
            </li>
            ))}
        </ul>
      </div> 
    );
}