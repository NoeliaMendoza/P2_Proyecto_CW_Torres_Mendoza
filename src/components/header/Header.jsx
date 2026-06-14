import { Link, useNavigate } from 'react-router-dom';
import { useChemical } from '../../context/ChemicalContext';
import styles from './Header.module.css';

const Header = () => {
    const { usuario, cerrarSesion } = useChemical();
    const navigate = useNavigate();

    const handleCerrarSesion = () => {
        cerrarSesion();
        navigate('/');
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1>ChemReact</h1>
                <span>Tabla Periódica Interactiva</span>
            </div>

            <nav className={styles.nav}>
                <Link to="/">Inicio</Link>
                <Link to="/tabla">Tabla Periódica</Link>
                <Link to="/calculadora">Calculadora</Link>
                {usuario && <Link to="/favoritos">Favoritos</Link>}
                {usuario && <Link to="/historial">Historial</Link>}
            </nav>

            <div className={styles.usuario}>
                {usuario ? (
                    <>
                        <span>Hola, {usuario.nombre}</span>
                        <button onClick={handleCerrarSesion}>Cerrar sesión</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Iniciar sesión</Link>
                        <Link to="/registro" className={styles.btnRegistro}>Registrarse</Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;