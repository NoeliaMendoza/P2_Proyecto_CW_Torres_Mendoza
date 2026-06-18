import { FaFlask, FaSatelliteDish, FaDatabase, FaLayerGroup } from 'react-icons/fa';
import { InfoCard } from '../../components';
import styles from './Acerca.module.css';

// ── Datos de las características ────────────────────────────────
const CARACTERISTICAS = [
    {
        id: 1,
        icono: <FaFlask />,
        titulo: 'Calculadora de Masa Molar',
        descripcion: 'Analizador sintáctico que desglosa fórmulas químicas complejas como H₂O, Ca(OH)₂ o Al₂(SO₄)₃. Calcula la masa molar sumando las masas atómicas de cada elemento multiplicadas por su frecuencia, manejando correctamente coeficientes y paréntesis anidados.',
    },
    {
        id: 2,
        icono: <FaSatelliteDish />,
        titulo: 'Consumo de API Externa',
        descripcion: 'Consumimos una API pública de elementos químicos para obtener información precisa y en tiempo real sobre masas atómicas, densidades, puntos de fusión/ebullición, configuraciones electrónicas y demás datos científicos esenciales.',
    },
    {
        id: 3,
        icono: <FaDatabase />,
        titulo: 'Persistencia con MySQL',
        descripcion: 'Conexión directa a una base de datos MySQL mediante un backend desarrollado en Node.js y Express. Permite a los usuarios registrados mantener sesiones seguras, guardar elementos favoritos y consultar historial de cálculos de manera persistente.',
    },
    {
        id: 4,
        icono: <FaLayerGroup />,
        titulo: 'Arquitectura del Software',
        descripcion: 'Construido sobre React con enrutamiento dinámico mediante React Router, control de estado global a través de React Context, y diseño modular con CSS Modules, garantizando una experiencia de usuario fluida e interactiva.',
    },
];

// ── Página ───────────────────────────────────────────────────────
export const Acerca = () => {
    return (
        <div className={styles.contenedor}>
            <header className={styles.encabezado}>
                <h1>Acerca del Proyecto</h1>
                <p>Conoce los fundamentos teóricos y técnicos detrás de ChemReact.</p>
            </header>

            <section className={styles.card}>
                <h2>¿Qué es ChemReact?</h2>
                <p>
                    <strong>ChemReact</strong> es una Single Page Application (SPA) interactiva diseñada
                    con fines académicos para facilitar el aprendizaje y la resolución de problemas químicos.
                    Permite explorar los 118 elementos de la tabla periódica, registrar un historial de consultas,
                    guardar elementos favoritos y calcular instantáneamente la masa molar de cualquier compuesto químico.
                </p>
            </section>

            <div className={styles.grid}>
                {CARACTERISTICAS.map((item) => (
                    <InfoCard
                        key={item.id}
                        icono={item.icono}
                        titulo={item.titulo}
                        descripcion={item.descripcion}
                    />
                ))}
            </div>
        </div>
    );
};

export default Acerca;
