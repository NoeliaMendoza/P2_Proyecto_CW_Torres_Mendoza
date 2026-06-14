import PropTypes from 'prop-types';
import styles from './ElementCard.module.css';

const colores = {
    "alkali metal": "#ff6b6b",
    "alkaline earth metal": "#ffb703",
    "transition metal": "#4dabf7",
    "metalloid": "#8cc63f",
    "diatomic nonmetal": "#38b000",
    "polyatomic nonmetal": "#20c997",
    "noble gas": "#845ef7",
    "lanthanide": "#f783ac",
    "actinide": "#ff6d60",
    "post-transition metal": "#5c7cfa",
    "halogen": "#e64980",
    "unknown": "#adb5bd",
};

const ElementCard = ({ simbolo, nombre, numeroAtomico, masaAtomica, categoria, col, fila, onClick }) => {
    const masa = masaAtomica != null ? parseFloat(masaAtomica).toFixed(2) : '—';

    return (
        <div
            className={styles.card}
            style={{
                gridColumn: col,
                gridRow: fila,
                background: colores[categoria] || "#adb5bd",
            }}
            onClick={onClick}
            title={nombre}
        >
            <span className={styles.numero}>{numeroAtomico}</span>
            <span className={styles.simbolo}>{simbolo}</span>
            <span className={styles.nombre}>{nombre}</span>
            <span className={styles.masa}>{masa}</span>
        </div>
    );
};

ElementCard.propTypes = {
    simbolo: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    numeroAtomico: PropTypes.number.isRequired,
    masaAtomica: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    categoria: PropTypes.string.isRequired,
    col: PropTypes.number.isRequired,
    fila: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ElementCard;
