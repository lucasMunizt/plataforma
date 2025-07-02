import { auth, signInWithEmailAndPassword } from '../Data';
 export async function LoginDatabese(email,senha){
    try {
         await signInWithEmailAndPassword(auth, email, senha);
         localStorage.setItem("auth", "true");  
         window.location.href = "/home";
        
    } catch (error) {
        alert("erro ao fazer login! E-mail ou Senha incorreto")
        console.error("Erro de login:", error.message);
        window.location.href = "/login";
    }
}