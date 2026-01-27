import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function ProtectedRoute({ children }) {
  const { state } = useContext(AppContext);  // burada dediğim gibi prodvider içindeki mevcut şuanki statei alıyoruz aciton almaya gerek olmadığı için dispatch yazmadım.

  if (!state.isAuth) {                 // burada login yapmadıysa benim bu ProtectedRoute ile app.jsx de route içindeki elemntleri sarmalayacam sarmaladığım her yer /login diyerek oralara giremeyecek yani url i eliyle değiştirip giremeyecek.
    return <Navigate to="/login" />; 
  }

  return children;
}
