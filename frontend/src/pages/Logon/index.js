import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import { FiLogIn } from 'react-icons/fi';

import heroesImage  from '../../assets/heroes.png'; 
import logoImage  from '../../assets/logo.svg'; 

import api from '../../services/api';


export default function Logon(){
    const history = useHistory();
    const [id, setId] = useState('');

    async function handleSubmmit(e){
        e.preventDefault();

        try {
            const response = await api.post('sessions', {id} );
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');

        } catch (error) {
            alert('Erro no Login');
            
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImage} alt="Be the Hero"/>
                <form onSubmit={handleSubmmit}>
                    <h1>Faça Seu Logon</h1>
                    <input placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size= {16} color="#E02041" />
                        Não Tenho Cadastro
                    </Link>
                </form>
            </section>

            

            <img src={heroesImage} alt="heroes"/>
        </div>
    );
}