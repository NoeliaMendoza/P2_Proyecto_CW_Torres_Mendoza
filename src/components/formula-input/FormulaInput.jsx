import PropTypes from 'prop-types';
import styles from './FormulaInput.module.css';

export const FormulaInput = ({ formula, onChange, onSubmit, onLimpiar, calculando, ejemplos, onEjemplo }) => {
    return (
        <section className={styles.inputSection}>
            <form onSubmit={onSubmit} className={styles.form}>
                <input
                    className={styles.input}
                    type="text"
                    value={formula}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Ej: H2O, NaCl, Ca(OH)2"
                    autoFocus
                />
                <button
                    type="submit"
                    className={styles.btnCalcular}
                    disabled={calculando || !formula.trim()}
                >
                    {calculando ? 'Calculando...' : 'Calcular'}
                </button>
                {formula && (
                    <button type="button" className={styles.btnLimpiar} onClick={onLimpiar}>
                        Limpiar
                    </button>
                )}
            </form>

            <div className={styles.ejemplos}>
                <span className={styles.ejemplosLabel}>Ejemplos:</span>
                {ejemplos.map((ej) => (
                    <button
                        key={ej}
                        className={styles.btnEjemplo}
                        onClick={() => onEjemplo(ej)}
                        type="button"
                    >
                        {ej}
                    </button>
                ))}
            </div>
        </section>
    );
};

FormulaInput.propTypes = {
    formula: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onLimpiar: PropTypes.func.isRequired,
    calculando: PropTypes.bool.isRequired,
    ejemplos: PropTypes.arrayOf(PropTypes.string).isRequired,
    onEjemplo: PropTypes.func.isRequired,
};

export default FormulaInput;
