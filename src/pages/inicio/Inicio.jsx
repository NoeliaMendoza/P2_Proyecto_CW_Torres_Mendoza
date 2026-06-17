import { useNavigate } from 'react-router-dom';
import {
    LuSearch,
    LuCalculator,
    LuStar,
    LuHistory,
    LuArrowRight,
    LuAtom,
} from 'react-icons/lu';
import styles from './Inicio.module.css';


const categorias = [
    { label: 'Metal alcalino', color: '#c0392b' },
    { label: 'Metal alcalinotérreo', color: '#e67e22' },
    { label: 'Metal de transición', color: '#097886' },
    { label: 'Metaloide', color: '#27ae60' },
    { label: 'No metal', color: '#16a085' },
    { label: 'Gas noble', color: '#8e44ad' },
    { label: 'Lantánido', color: '#2980b9' },
    { label: 'Actínido', color: '#1abc9c' },
    { label: 'Metal post-transición', color: '#3498db' },
    { label: 'Halógeno', color: '#e91e8c' },
];

const funciones = [
    { Ico: LuSearch, titulo: 'Tabla Periódica', desc: 'Explora los 118 elementos.', ruta: '/tabla' },
    { Ico: LuCalculator, titulo: 'Calculadora', desc: 'Calcula masas molares.', ruta: '/calculadora' },
    { Ico: LuStar, titulo: 'Favoritos', desc: 'Consulta tus elementos guardados.', ruta: '/favoritos' },
    { Ico: LuHistory, titulo: 'Historial', desc: 'Revisa tus búsquedas recientes.', ruta: '/historial' },
];


export const Inicio = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.heroBadge}><LuAtom size={16} /> ChemReact</span>
                    <h1 className={styles.heroTitle}>Tabla periódica interactiva</h1>
                    <p className={styles.heroSub}>
                        Explora elementos, revisa sus propiedades principales,
                        calcula masas molares y guarda tus favoritos.
                    </p>
                    <div className={styles.heroBtns}>
                        <button onClick={() => navigate('/tabla')} className={styles.btnP}>
                            Ver Tabla Periódica <LuArrowRight size={15} />
                        </button>
                        <button onClick={() => navigate('/calculadora')} className={styles.btnS}>
                            Calculadora Molar
                        </button>
                    </div>
                </div>
                <div className={styles.heroPanel}>
                    <LuAtom size={58} strokeWidth={1.4} />
                    <strong>118</strong>
                    <span>elementos confirmados</span>
                </div>
            </section>

            <div className={styles.statsGrid}>
                {[
                    ['118', 'Elementos confirmados'],
                    ['94', 'Existen en la naturaleza'],
                    ['24', 'Creados en laboratorio'],
                    ['1869', 'Primera tabla de Mendeléyev'],
                ].map(([v, l]) => (
                    <div key={l} className={styles.statCard}>
                        <div className={styles.statVal}>{v}</div>
                        <div className={styles.statLbl}>{l}</div>
                    </div>
                ))}
            </div>

            <section className={styles.sec}>
                <div className={styles.secHead}>
                    <h2 className={styles.secH2}>Accesos rápidos</h2>
                </div>
                <div className={styles.funGrid}>
                    {funciones.map(({ Ico, titulo, desc, ruta }) => (
                        <button key={titulo} className={styles.funCard} onClick={() => navigate(ruta)}>
                            <div className={styles.funIcoWrap}>
                                <Ico size={26} strokeWidth={1.5} />
                            </div>
                            <h3 className={styles.funTitulo}>{titulo}</h3>
                            <p className={styles.funDesc}>{desc}</p>
                        </button>
                    ))}
                </div>
            </section>

            <section className={styles.sec}>
                <div className={styles.secHead}>
                    <h2 className={styles.secH2}>Categorías de Elementos</h2>
                </div>
                <div className={styles.chips}>
                    {categorias.map((c) => (
                        <span
                            key={c.label}
                            className={styles.chip}
                            style={{ color: c.color, borderColor: c.color + '55', background: c.color + '11' }}
                        >
                            {c.label}
                        </span>
                    ))}
                </div>
            </section>

        </div>
    );
};
