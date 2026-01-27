import { createContext, useReducer, useEffect } from "react";

export const AppContext = createContext(); // uygulama içinde paylaşılacak bir kanal oluşturmak için.

const savedState = localStorage.getItem("appState"); // başlangıç state i her şey boş oluyor. eğer bir user ile eşleşirse o zaman state i değiştir diyip bunların içini dolduracaz.

const initialState = savedState
  ? JSON.parse(savedState)
  : {
      userId: null,
      user: null,
      cart: [],
      favourites: [],
      isAuth: false,
    };

// function reducer(state, action) {     // reducer dispatch in getirdiği action ı alır ve mevcut state i alıp action ile o state üzerinde yeni değişikliği yapıp geri state i döndürür.
//   switch (action.type) {

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        userId: action.payload.id,
        user: action.payload,
        cart: action.payload.cart || [],
        favourites: action.payload.favourites || [],
        isAuth: true,
      };
    case "LOGOUT":
      return {
        userId: null,
        user: null,
        cart: [],
        favourites: [],
        isAuth: false,
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState); // const [state, dispatch] = useReducer(reducer, initialState);

  // state : mevcut durum yani objenin içi (mesela cart içindeki ürünleri tutan, veya userı tutan veya favouritesleri mevcut tutan object ) dipatch: hangi action yapılacağını belirtir kendisi yapmaz sadece reducer a bunu yapıcaksın der, reducer ise o actionı yapar, initialState se state in ilk hali. bunun sonucunda reducer yeni state döner.yukarıda da reducer fonksiyonu var onun içinde gerçekleşir ve return state eder.

  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(state));
  }, [state]); // state.cart veya state.favourites değişirse tetiklenecek çalışıcak ve güncel veriyi alıcak bu şekilde her zaman güncel kalıcak.Tabiki de başta ne olur ne olmaaz diye user var mı diye de kontrol ediyoruz.(hata almamak için)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {" "}
      {/*“Rr” */}
      {children}
    </AppContext.Provider>
  );
}
