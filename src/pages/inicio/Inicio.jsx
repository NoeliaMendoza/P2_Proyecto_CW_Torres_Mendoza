import { useNavigate } from 'react-router-dom';
import styles from './Inicio.module.css';

const Inicio = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.contenedor}>

            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroTexto}>
                    <h1>Explora la Tabla Periódica</h1>
                    <p>
                        Descubre los 118 elementos químicos, consulta sus propiedades,
                        calcula masas molares y guarda tus elementos favoritos.
                    </p>
                    <div className={styles.heroBotones}>
                        <button onClick={() => navigate('/tabla')} className={styles.btnPrimario}>
                            Ver Tabla Periódica
                        </button>
                        <button onClick={() => navigate('/calculadora')} className={styles.btnSecundario}>
                            Calculadora Molar
                        </button>
                    </div>
                </div>
                <div className={styles.heroIcono}>
                    <span></span>
                </div>
            </section>

            {/* Tarjetas de características */}
            <section className={styles.caracteristicas}>
                <h2>¿Qué puedes hacer?</h2>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <span></span>
                        <h3>Explorar Elementos</h3>
                        <p>Consulta propiedades como masa atómica, punto de fusión, ebullición y electronegatividad.</p>
                    </div>
                    <div className={styles.card}>
                        <span></span>
                        <h3>Calcular Masa Molar</h3>
                        <p>Ingresa una fórmula química como H₂O o NaCl y obtén su masa molar al instante.</p>
                    </div>
                    <div className={styles.card}>
                        <span></span>
                        <h3>Guardar Favoritos</h3>
                        <p>Marca los elementos que más te interesan y accede a ellos rápidamente.</p>
                    </div>
                    <div className={styles.card}>
                        <span></span>
                        <h3>Ver Historial</h3>
                        <p>Revisa todos los elementos que has consultado en tus sesiones anteriores.</p>
                    </div>
                </div>
            </section>

            {/* Categorías */}
            <section className={styles.categorias}>
                <h2>Categorías de Elementos</h2>
                <div className={styles.categoriasGrid}>
                    <span style={{ background: '#ff6b6b' }}>Metal alcalino</span>
                    <span style={{ background: '#ffa94d' }}>Metal alcalinotérreo</span>
                    <span style={{ background: '#74c0fc' }}>Metal de transición</span>
                    <span style={{ background: '#a9e34b' }}>Metaloide</span>
                    <span style={{ background: '#69db7c' }}>No metal</span>
                    <span style={{ background: '#cc5de8' }}>Gas noble</span>
                    <span style={{ background: '#66d9e8' }}>Lantánido</span>
                    <span style={{ background: '#38d9a9' }}>Actínido</span>
                    <span style={{ background: '#4dabf7' }}>Metal post-transición</span>
                    <span style={{ background: '#f783ac' }}>Halógeno</span>
                </div>
            </section>

        </div>
    );
};

export default Inicio;