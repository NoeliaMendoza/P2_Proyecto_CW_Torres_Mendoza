import { useState, useEffect } from 'react';
import { useChemical } from '../../context/ChemicalContext';
import { obtenerElementos, obtenerCalculos } from '../../services/chemistry-service';
import { useCalculadora } from '../../hooks/useCalculadora';
import { FormulaInput, ResultadoCalculo, HistorialCalculos } from '../../components';
import styles from './Calculadora.module.css';

const EJEMPLOS = ['H2O', 'NaCl', 'CO2', 'Ca(OH)2', 'Al2(SO4)3', 'C6H12O6'];

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

    // Recarga el historial cuando se hace un nuevo cálculo
    useEffect(() => {
        if (!usuario) return;
        obtenerCalculos(usuario.id)
            .then((data) => setHistorialCalculos(Array.isArray(data) ? data : []))
            .catch(() => setHistorialCalculos([]));
    }, [usuario, resultado]);

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

            <FormulaInput
                formula={formula}
                onChange={setFormula}
                onSubmit={handleSubmit}
                onLimpiar={limpiar}
                calculando={calculando}
                ejemplos={EJEMPLOS}
                onEjemplo={handleEjemplo}
            />

            {error && <p className={styles.error}>{error}</p>}

            {resultado && <ResultadoCalculo resultado={resultado} />}

            {usuario && (
                <HistorialCalculos
                    calculos={historialCalculos}
                    onSeleccionar={handleEjemplo}
                />
            )}
        </div>
    );
};

export default Calculadora;
