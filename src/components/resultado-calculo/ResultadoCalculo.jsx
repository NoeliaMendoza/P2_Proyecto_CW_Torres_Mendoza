import PropTypes from 'prop-types';
import styles from './ResultadoCalculo.module.css';

export const ResultadoCalculo = ({ resultado }) => {
    const { formula, masa, desglose } = resultado;

    return (
        <section className={styles.resultado}>
            <div className={styles.resultadoHeader}>
                <span className={styles.resultadoFormula}>{formula}</span>
                <span className={styles.resultadoMasa}>
                    {masa.toFixed(4)} <small>g/mol</small>
                </span>
            </div>

            <table className={styles.tabla}>
                <thead>
                    <tr>
                        <th>Símbolo</th>
                        <th>Elemento</th>
                        <th>Cantidad</th>
                        <th>Masa atómica</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {desglose.map(({ simbolo, nombre, cantidad, masa: masaEl, subtotal }) => (
                        <tr key={simbolo}>
                            <td><span className={styles.simboloBadge}>{simbolo}</span></td>
                            <td>{nombre}</td>
                            <td>{cantidad}</td>
                            <td>{masaEl.toFixed(4)} u</td>
                            <td><strong>{subtotal.toFixed(4)} u</strong></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={4} className={styles.totalLabel}>Masa molar total</td>
                        <td className={styles.totalValor}>{masa.toFixed(4)} g/mol</td>
                    </tr>
                </tfoot>
            </table>
        </section>
    );
};

ResultadoCalculo.propTypes = {
    resultado: PropTypes.shape({
        formula: PropTypes.string.isRequired,
        masa: PropTypes.number.isRequired,
        desglose: PropTypes.arrayOf(
            PropTypes.shape({
                simbolo: PropTypes.string.isRequired,
                nombre: PropTypes.string.isRequired,
                cantidad: PropTypes.number.isRequired,
                masa: PropTypes.number.isRequired,
                subtotal: PropTypes.number.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default ResultadoCalculo;
