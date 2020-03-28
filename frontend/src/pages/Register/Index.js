import React, {useState} from 'react';
import './styles.css';
import LogoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';

export default function Register() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whastapp, setWhats] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data ={
            nome,
            email,
            whastapp,
            cidade,
            uf
        }

       try{
        const response = await api.post('ongs', data);

        alert(`Sucesso! Id registrado: ${response.data.id}`)
        history.push('/')
       } catch(err){
           alert('Erro ao cadastrar!')
       }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>

                    <img src={LogoImg} alt="Be The Hero"></img>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem seus casos.</p>

                    <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="#E02041"/>
                    Voltar ao inicio
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da Ong" 
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    />
                    <input type="email" placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />

                    <input placeholder="whatsapp" 
                    value={whastapp}
                    onChange={e => setWhats(e.target.value)}/>

                    <div className="input-group">
                    <input placeholder="Cidade" 
                    value={cidade}
                    onChange={e => setCidade(e.target.value)}
                    />
                    <input placeholder="Uf" style={{width: 80}}
                    value={uf}
                    onChange={e => setUf(e.target.value)}
                    />
                    </div>
                
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}