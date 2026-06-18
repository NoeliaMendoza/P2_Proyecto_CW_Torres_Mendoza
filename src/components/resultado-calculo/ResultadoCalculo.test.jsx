import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultadoCalculo from './ResultadoCalculo';

const resultadoH2O = {
    formula: 'H2O',
    masa: 18.015,
    desglose: [
        { simbolo: 'H', nombre: 'Hidrógeno', cantidad: 2, masa: 1.008, subtotal: 2.016 },
        { simbolo: 'O', nombre: 'Oxígeno', cantidad: 1, masa: 15.999, subtotal: 15.999 },
    ],
};

describe('ResultadoCalculo', () => {

    it('muestra la fórmula correctamente', () => {
        render(<ResultadoCalculo resultado={resultadoH2O} />);
        expect(screen.getByText('H2O')).toBeInTheDocument();
    });

    it('muestra la masa molar total en el footer de la tabla', () => {
        render(<ResultadoCalculo resultado={resultadoH2O} />);
        const elementos = screen.getAllByText(/18\.0150/);
        expect(elementos.length).toBeGreaterThanOrEqual(1);
    });

    it('muestra los símbolos de cada elemento', () => {
        render(<ResultadoCalculo resultado={resultadoH2O} />);
        expect(screen.getByText('H')).toBeInTheDocument();
        expect(screen.getByText('O')).toBeInTheDocument();
    });

    it('muestra los nombres de los elementos en español', () => {
        render(<ResultadoCalculo resultado={resultadoH2O} />);
        expect(screen.getByText('Hidrógeno')).toBeInTheDocument();
        expect(screen.getByText('Oxígeno')).toBeInTheDocument();
    });

    it('muestra la cantidad de cada elemento', () => {
        render(<ResultadoCalculo resultado={resultadoH2O} />);
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('muestra el texto Masa molar total', () => {
        render(<ResultadoCalculo resultado={resultadoH2O} />);
        expect(screen.getByText(/masa molar total/i)).toBeInTheDocument();
    });

});
