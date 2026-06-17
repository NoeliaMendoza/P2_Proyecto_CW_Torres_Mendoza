import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChemical } from '../../context/ChemicalContext';
import { obtenerHistorial } from '../../services/chemistry-service';
import styles from './Historial.module.css';

export const Historial = () => {
    const { usuario } = useChemical();
    const navigate = useNavigate();
    const [historial, setHistorial] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (!usuario) {
            setCargando(false);
            return;
        }

        obtenerHistorial(usuario.id)
            .then((data) => setHistorial(Array.isArray(data) ? data : []))
            .catch(() => setHistorial([]))
            .finally(() => setCargando(false));
    }, [usuario]);

    // ── Sin sesión ──────────────────────────────────────────────
    if (!usuario) {
        return (
            <div className={styles.contenedor}>
                <div className={styles.sinSesion}>
                    <span className={styles.icono}>🔒</span>
                    <h2>Acceso restringido</h2>
                    <p>Debes iniciar sesión para ver tu historial de elementos consultados.</p>
                    <button className={styles.btnPrimario} onClick={() => navigate('/login')}>
                        Iniciar sesión
                    </button>
                </div>
            </div>
        );
    }

    // ── Cargando ────────────────────────────────────────────────
    if (cargando) {
        return (
            <div className={styles.contenedor}>
                <p className={styles.cargando}>Cargando historial...</p>
            </div>
        );
    }

    // ── Sin registros ───────────────────────────────────────────
    if (historial.length === 0) {
        return (
            <div className={styles.contenedor}>
                <div className={styles.encabezado}>
                    <h1>Historial</h1>
                    <span className={styles.contador}>0 consultas</span>
                </div>
                <div className={styles.vacio}>
                    <span className={styles.icono}>📭</span>
                    <p>Aún no has consultado ningún elemento.</p>
                    <button className={styles.btnSecundario} onClick={() => navigate('/tabla')}>
                        Explorar la tabla periódica
                    </button>
                </div>
            </div>
        );
    }

    // ── Lista de registros ──────────────────────────────────────
    return (
        <div className={styles.contenedor}>
            <div className={styles.encabezado}>
                <h1>Historial</h1>
                <span className={styles.contador}>{historial.length} consulta{historial.length !== 1 ? 's' : ''}</span>
            </div>

            <ul className={styles.lista}>
                {historial.map((item, index) => (
                    <HistorialItem key={item.id ?? index} item={item} />
                ))}
            </ul>
        </div>
    );
};

// ── Subcomponente: fila del historial ───────────────────────────
const HistorialItem = ({ item }) => {
    return (
        <li className={styles.item}>
            <div className={styles.itemSimbolo}>
                {item.simbolo}
            </div>
            <div className={styles.itemInfo}>
                <span className={styles.itemNombre}>{item.nombre_es}</span>
                <span className={styles.itemMeta}>N.º atómico {item.numero_atomico}</span>
            </div>
            {item.fecha && (
                <span className={styles.itemFecha}>
                    {new Date(item.fecha).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                    })}
                </span>
            )}
        </li>
    );
};

export default Historial;
