import styles from './Home.module.css';

import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { useState } from 'react'
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';

export const Home = ({user}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const [isSingUpActive, setIsSignUpActive] = useState(false);
    const handleMethodChange = (e) => {
        e.preventDefault();
        setIsSignUpActive(!isSingUpActive);
    }

    const handleSignUp = () => {
        if(!email || !password) return;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setMessage("Usuário criado com sucesso!")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setMessage(`Erro ao cadastrar: ${errorCode} - ${errorMessage}` )
            })
    }

    const handleSignIn = () => {
        if(!email || !password) return;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setMessage(`Logado com sucesso` )
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setMessage(`Erro ao logar: ${errorCode} - ${errorMessage}` )
            })
    }

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    
    if(user){
        return <Navigate to="/upload"></Navigate>
    }

    return (
        <section className={styles.mainFormSection}>
            <form className={styles.mainForm}>
                {isSingUpActive && <legend>Cadastrar</legend>}
                {!isSingUpActive && <legend>Entrar</legend>}
                {message && <p>{message}</p>}
                <fieldset className={styles.nainFormFieldset}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' onChange={handleEmailChange}/>

                    <label htmlFor="password">Senha</label>
                    <input type="password" id='password' onChange={handlePasswordChange}/>

                    {isSingUpActive && <button type='button' onClick={handleSignUp}>Cadastrar</button>}
                    {!isSingUpActive && <button type='button' onClick={handleSignIn}>Logar</button>}
                </fieldset>
                {isSingUpActive && <a className={styles.linkMethod} onClick={handleMethodChange}>Login</a>}
                {!isSingUpActive && (
                    <a className={styles.linkMethod} onClick={handleMethodChange} href="">Crie uma conta</a>    
                )}
                
            </form>
        </section>
    )
}