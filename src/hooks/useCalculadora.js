import { useState, useCallback, useRef, useEffect } from 'react';
import { guardarCalculo } from '../services/chemistry-service';

// ── Parser de fórmulas químicas ──────────────────────────────────
// Soporta: H2O  NaCl  Ca(OH)2  Al2(SO4)3  Mg(NO3)2
export const parsearFormula = (formula) => {
    // Tokeniza la fórmula en: símbolo, número, paréntesis
    const tokens = formula.match(/([A-Z][a-z]?|\d+|[()])/g);
    if (!tokens) return null;

    // Usamos una pila para manejar paréntesis anidados
    const pila = [{}];

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token === '(') {
            pila.push({});
        } else if (token === ')') {
            const grupo = pila.pop();
            const multiplicador = parseInt(tokens[i + 1]) || 1;
            if (!isNaN(parseInt(tokens[i + 1]))) i++;

            const actual = pila[pila.length - 1];
            for (const [simbolo, cantidad] of Object.entries(grupo)) {
                actual[simbolo] = (actual[simbolo] || 0) + cantidad * multiplicador;
            }
        } else if (/^[A-Z]/.test(token)) {
            const cantidad = parseInt(tokens[i + 1]) || 1;
            if (!isNaN(parseInt(tokens[i + 1]))) i++;

            const actual = pila[pila.length - 1];
            actual[token] = (actual[token] || 0) + cantidad;
        }
    }

    return pila[0];
};

// ── Hook principal ───────────────────────────────────────────────
// Recibe `elementos` como parámetro para no repetir el fetch en cada cálculo
export const useCalculadora = (elementos) => {
    const [formula, setFormula] = useState('');
    const [resultado, setResultado] = useState(null);
    const [error, setError] = useState('');
    const [calculando, setCalculando] = useState(false);

    // Ref para que calcular() siempre vea la versión más reciente de elementos
    // sin recrear la función en cada render
    const elementosRef = useRef(elementos);
    useEffect(() => {
        elementosRef.current = elementos;
    }, [elementos]);

    const calcular = useCallback(async (formulaInput, usuario) => {
        const formulaLimpia = formulaInput.trim();
        const elementosActuales = elementosRef.current;

        if (!formulaLimpia || !elementosActuales.length) return;

        setCalculando(true);
        setError('');
        setResultado(null);

        try {
            // Construye un mapa símbolo → { masa, nombre } con los elementos ya cargados
            const mapaElementos = {};
            for (const el of elementosActuales) {
                mapaElementos[el.symbol] = {
                    masa: el.atomic_mass,
                    nombre: el.nombreES,
                };
            }

            const atomos = parsearFormula(formulaLimpia);

            if (!atomos || Object.keys(atomos).length === 0) {
                setError('Fórmula inválida. Ejemplo: H2O, NaCl, Ca(OH)2');
                return;
            }

            // Verifica que todos los símbolos existen en la tabla periódica
            const simbolosDesconocidos = Object.keys(atomos).filter(
                (s) => !mapaElementos[s]
            );
            if (simbolosDesconocidos.length > 0) {
                setError(`Símbolo(s) no reconocido(s): ${simbolosDesconocidos.join(', ')}`);
                return;
            }

            // Calcula masa molar y construye el desglose
            let masaTotal = 0;
            const desglose = Object.entries(atomos).map(([simbolo, cantidad]) => {
                const { masa, nombre } = mapaElementos[simbolo];
                const subtotal = masa * cantidad;
                masaTotal += subtotal;
                return { simbolo, nombre, cantidad, masa, subtotal };
            });

            const nuevoResultado = {
                formula: formulaLimpia,
                masa: masaTotal,
                desglose,
            };

            setResultado(nuevoResultado);

            // Guarda en historial si hay usuario logueado
            if (usuario) {
                await guardarCalculo({
                    usuario_id: usuario.id,
                    formula: formulaLimpia,
                    masa_molar: masaTotal.toFixed(4),
                });
            }
        } catch {
            setError('Error al calcular. Verifica la fórmula e intenta de nuevo.');
        } finally {
            setCalculando(false);
        }
    }, []); // calcular no cambia nunca — siempre lee elementosRef.current

    const limpiar = useCallback(() => {
        setFormula('');
        setResultado(null);
        setError('');
    }, []);

    return {
        formula,
        setFormula,
        resultado,
        error,
        calculando,
        calcular,
        limpiar,
    };
};
