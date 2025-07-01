import React, { useState } from 'react'
import './Login.css'
import Input from '../componentes/input/Input'
import { LoginDatabese } from '../Data/Login/Login';
const Login = () => {
    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    
    const entrar = () =>{
      LoginDatabese(email,senha);
    }

  return (
    <div className='tela-completa-login'>
        <div className="container-login">
            <div className="login-box">
              <h1 id='texto-login'>Clv Assistência Técnica</h1>
                <Input type='email' placeholder='Coloque seu Email' id='login-email'onChange={(e)=>{setEmail(e.target.value)}}/>
                <Input type='password' placeholder='Coloque sua Senha' id='login-senha'onChange={(e)=>{setSenha(e.target.value)}}/>
                <button id='butao-login' onClick={entrar}>Entrar</button>
            </div>
        </div>


    </div>
  )
}

export default Login