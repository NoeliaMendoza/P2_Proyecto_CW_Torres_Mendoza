import { useState, useEffect } from 'react';
import { useChemical } from '../../context/ChemicalContext';
import { obtenerElementos, obtenerCalculos } from '../../services/chemistry-service';
import { useCalculadora } from '../../hooks/useCalculadora';
import styles from './Calculadora.module.css';

// ── Ejemplos de fórmulas para guiar al usuario ───────────────────
const EJEMPLOS = ['H2O', 'NaCl', 'CO2', 'Ca(OH)2', 'Al2(SO4)3', 'C6H12O6'];

// ────────────────────────────────────────────────────────────────
export const Calculadora = () => {
    const { usuario } = useChemical();
    const [elementos, setElementos] = useState([]);
    const { formula, setFormula, resultado, error, calculando, calcular, limpiar } =
        useCalculadora(elementos);
    const [historialCalculos, setHistorialCalculos] = useState([]);

    // Carga los elementos una sola vez al montar
    useEffect(() => {
        obtenerElementos()
            .then((data) => setElementos(data))
            .catch(() => setElementos([]));
    }, []);

    // Carga historial de cálculos previos si hay sesión
    useEffect(() => {
        if (!usuario) return;
        obtenerCalculos(usuario.id)
            .then((data) => setHistorialCalculos(Array.isArray(data) ? data : []))
            .catch(() => setHistorialCalculos([]));
    }, [usuario, resultado]); // se recarga cuando se hace un nuevo cálculo

    const handleSubmit = (e) => {
        e.preventDefault();
        calcular(formula, usuario);
    };

    const handleEjemplo = (ej) => {
        setFormula(ej);
        calcular(ej, usuario);
    };

    return (
        <div className={styles.contenedor}>
            <div className={styles.encabezado}>
                <h1>Calculadora de Masa Molar</h1>
                <p>Ingresa una fórmula química para obtener su masa molar en g/mol.</p>
            </div>

            {/* Input de fórmula */}
            <FormulaInput
                formula={formula}
                onChange={setFormula}
                onSubmit={handleSubmit}
                onLimpiar={limpiar}
                calculando={calculando}
                ejemplos={EJEMPLOS}
                onEjemplo={handleEjemplo}
            />

            {/* Error */}
            {error && <p className={styles.error}>{error}</p>}

            {/* Resultado */}
            {resultado && <ResultadoCalculo resultado={resultado} />}

            {/* Historial de cálculos */}
            {usuario && (
                <HistorialCalculos
                    calculos={historialCalculos}
                    onSeleccionar={handleEjemplo}
                />
            )}
        </div>
    );
};

// ── Subcomponente: input y botones ───────────────────────────────
const FormulaInput = ({ formula, onChange, onSubmit, onLimpiar, calculando, ejemplos, onEjemplo }) => {
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

// ── Subcomponente: resultado del cálculo ─────────────────────────
const ResultadoCalculo = ({ resultado }) => {
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

// ── Subcomponente: historial de cálculos anteriores ──────────────
const HistorialCalculos = ({ calculos, onSeleccionar }) => {
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

export default Calculadora;
