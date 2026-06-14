import styles from './Footer.module.css';

const Footer = () => {
    const anioActual = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.contenido}>
                <div className={styles.seccion}>
                    <h3>ChemReact</h3>
                    <p>Plataforma interactiva para explorar la tabla periódica y realizar cálculos químicos.</p>
                </div>

                <div className={styles.seccion}>
                    <h4>Navegación</h4>
                    <ul>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/tabla">Tabla Periódica</a></li>
                        <li><a href="/calculadora">Calculadora</a></li>
                    </ul>
                </div>

                <div className={styles.seccion}>
                    <h4>Fuentes</h4>
                    <ul>
                        <li><a href="https://github.com/Bowserinator/Periodic-Table-JSON" target="_blank" rel="noreferrer">Periodic Table JSON</a></li>
                        <li><a href="https://pubchem.ncbi.nlm.nih.gov" target="_blank" rel="noreferrer">PubChem</a></li>
                    </ul>
                </div>
            </div>

            <div className={styles.copy}>
                <p>© {anioActual} ChemReact — Todos los derechos reservados</p>
                <p>Desarrollado con React + Vite</p>
            </div>
        </footer>
    );
};

export default Footer;