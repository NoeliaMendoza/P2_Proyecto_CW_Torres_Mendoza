import { createContext, useContext, useState } from 'react';

const ChemicalContext = createContext();

export const ChemicalProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem('usuario')) || null
    );
    const [elementoSeleccionado, setElementoSeleccionado] = useState(null);
    const [favoritos, setFavoritos] = useState([]);

    const iniciarSesion = (datos) => {
        setUsuario(datos);
        localStorage.setItem('usuario', JSON.stringify(datos));
    };

    const cerrarSesion = () => {
        setUsuario(null);
        localStorage.removeItem('usuario');
    };

    return (
        <ChemicalContext.Provider value={{
            usuario,
            iniciarSesion,
            cerrarSesion,
            elementoSeleccionado,
            setElementoSeleccionado,
            favoritos,
            setFavoritos,
        }}>
            {children}
        </ChemicalContext.Provider>
    );
};

export const useChemical = () => useContext(ChemicalContext);