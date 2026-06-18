import PropTypes from 'prop-types';
import styles from './HistorialCalculos.module.css';

export const HistorialCalculos = ({ calculos, onSeleccionar }) => {
    if (calculos.length === 0) return null;

    return (
        <section className={styles.historialSection}>
            <h2>Cálculos anteriores</h2>
            <ul className={styles.historialLista}>
                {calculos.map((c, index) => (
                    <li key={c.id ?? index} className={styles.historialItem}>
                        <button
                            className={styles.historialFormula}
                            onClick={() => onSeleccionar(c.formula)}
                            title="Recalcular"
                        >
                            {c.formula}
                        </button>
                        <span className={styles.historialMasa}>
                            {parseFloat(c.masa_molar).toFixed(4)} g/mol
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

HistorialCalculos.propTypes = {
    calculos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            formula: PropTypes.string.isRequired,
            masa_molar: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })
    ).isRequired,
    onSeleccionar: PropTypes.func.isRequired,
};

export default HistorialCalculos;
