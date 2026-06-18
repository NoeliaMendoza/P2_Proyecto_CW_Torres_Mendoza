import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuLock, LuStar, LuStarOff } from 'react-icons/lu';
import { useChemical } from '../../context/ChemicalContext';
import { obtenerFavoritos, eliminarFavorito } from '../../services/chemistry-service';
import styles from './Favoritos.module.css';

export const Favoritos = () => {
    const { usuario, favoritos, setFavoritos } = useChemical();
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (!usuario) {
            setCargando(false);
            return;
        }

        obtenerFavoritos(usuario.id)
            .then((data) => setFavoritos(Array.isArray(data) ? data : []))
            .catch(() => setFavoritos([]))
            .finally(() => setCargando(false));
    }, [usuario]);

    const handleEliminar = async (numeroAtomico) => {
        await eliminarFavorito({ usuario_id: usuario.id, numero_atomico: numeroAtomico });
        // Actualiza el contexto global → la estrella en /tabla también cambia
        setFavoritos(favoritos.filter((f) => f.numero_atomico !== numeroAtomico));
    };

    // ── Sin sesión ──────────────────────────────────────────────
    if (!usuario) {
        return (
            <div className={styles.contenedor}>
                <div className={styles.sinSesion}>
                    <span className={styles.icono}><LuLock size={32} /></span>
                    <h2>Acceso restringido</h2>
                    <p>Debes iniciar sesión para ver tus elementos favoritos.</p>
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
                <p className={styles.cargando}>Cargando favoritos...</p>
            </div>
        );
    }

    // ── Sin favoritos ───────────────────────────────────────────
    if (favoritos.length === 0) {
        return (
            <div className={styles.contenedor}>
                <div className={styles.encabezado}>
                    <h1>Favoritos</h1>
                    <span className={styles.contador}>0 elementos</span>
                </div>
                <div className={styles.vacio}>
                    <span className={styles.icono}><LuStar size={32} /></span>
                    <p>Aún no tienes elementos favoritos.</p>
                    <button className={styles.btnSecundario} onClick={() => navigate('/tabla')}>
                        Explorar la tabla periódica
                    </button>
                </div>
            </div>
        );
    }

    // ── Lista de favoritos ──────────────────────────────────────
    return (
        <div className={styles.contenedor}>
            <div className={styles.encabezado}>
                <h1>Favoritos</h1>
                <span className={styles.contador}>
                    {favoritos.length} elemento{favoritos.length !== 1 ? 's' : ''}
                </span>
            </div>

            <ul className={styles.lista}>
                {favoritos.map((item, index) => (
                    <FavoritoItem
                        key={item.id ?? index}
                        item={item}
                        onEliminar={handleEliminar}
                    />
                ))}
            </ul>
        </div>
    );
};

// ── Subcomponente: fila de favorito ─────────────────────────────
const FavoritoItem = ({ item, onEliminar }) => {
    const [eliminando, setEliminando] = useState(false);

    const handleClick = async () => {
        setEliminando(true);
        await onEliminar(item.numero_atomico);
        // No hace falta setEliminando(false) porque el item desaparece de la lista
    };

    return (
        <li className={styles.item}>
            <div className={styles.itemSimbolo}>
                {item.simbolo}
            </div>
            <div className={styles.itemInfo}>
                <span className={styles.itemNombre}>{item.nombre_es}</span>
                <span className={styles.itemMeta}>N.º atómico {item.numero_atomico}</span>
            </div>
            <button
                className={styles.btnEliminar}
                onClick={handleClick}
                disabled={eliminando}
                title="Quitar de favoritos"
            >
                {eliminando ? '...' : <LuStar size={18} />}
            </button>
        </li>
    );
};

export default Favoritos;
