import React, { useState } from 'react';

import './styles.css';
import logoImage  from '../../assets/logo.svg'; 
import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';


export default function NewIncident(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };
        try {

            await api.post('incident', data, { 
                headers: {
                Authorization: ongId
             }
            })

            history.push('/profile')
            
        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente');
            
        }
       
    }


    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImage} alt="Be The Hero"/>
                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva o Caso</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size= {16} color="#E02041" />
                        Voltar para Home
                    </Link>
                </section>

                <form onSubmit= { handleNewIncident } >
                    <input 
                    placeholder="Título do Caso"     
                    value ={title}
                    onChange= {e => setTitle(e.target.value) } />
                    <textarea  
                    placeholder="Descrição"    
                    value={description}
                    onChange={e => setDescription(e.target.value)} />
                    <input 
                    placeholder="Valor em Reais"    
                    value={value}
                    onChange= {e => setValue(e.target.value)}  />
                    
                    <button className="button" ></button>
                </form>

            </div>
        </div>
    );
}