import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FormulaInput from './FormulaInput';

const EJEMPLOS = ['H2O', 'NaCl', 'CO2'];

const defaultProps = {
    formula: '',
    onChange: vi.fn(),
    onSubmit: vi.fn(),
    onLimpiar: vi.fn(),
    calculando: false,
    ejemplos: EJEMPLOS,
    onEjemplo: vi.fn(),
};

describe('FormulaInput', () => {

    it('renderiza el input y el botón calcular', () => {
        render(<FormulaInput {...defaultProps} />);
        expect(screen.getByPlaceholderText(/H2O/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /calcular/i })).toBeInTheDocument();
    });

    it('muestra los botones de ejemplo', () => {
        render(<FormulaInput {...defaultProps} />);
        EJEMPLOS.forEach((ej) => {
            expect(screen.getByRole('button', { name: ej })).toBeInTheDocument();
        });
    });

    it('el botón calcular está deshabilitado cuando formula está vacía', () => {
        render(<FormulaInput {...defaultProps} formula="" />);
        expect(screen.getByRole('button', { name: /calcular/i })).toBeDisabled();
    });

    it('el botón calcular está habilitado cuando hay fórmula', () => {
        render(<FormulaInput {...defaultProps} formula="H2O" />);
        expect(screen.getByRole('button', { name: /calcular/i })).toBeEnabled();
    });

    it('el botón calcular está deshabilitado mientras calcula', () => {
        render(<FormulaInput {...defaultProps} formula="H2O" calculando={true} />);
        expect(screen.getByRole('button', { name: /calculando/i })).toBeDisabled();
    });

    it('llama onChange al escribir en el input', () => {
        const onChange = vi.fn();
        render(<FormulaInput {...defaultProps} onChange={onChange} />);
        fireEvent.change(screen.getByPlaceholderText(/H2O/i), { target: { value: 'NaCl' } });
        expect(onChange).toHaveBeenCalledWith('NaCl');
    });

    it('llama onEjemplo al hacer clic en un ejemplo', () => {
        const onEjemplo = vi.fn();
        render(<FormulaInput {...defaultProps} onEjemplo={onEjemplo} />);
        fireEvent.click(screen.getByRole('button', { name: 'H2O' }));
        expect(onEjemplo).toHaveBeenCalledWith('H2O');
    });

    it('muestra botón limpiar solo cuando hay fórmula', () => {
        const { rerender } = render(<FormulaInput {...defaultProps} formula="" />);
        expect(screen.queryByRole('button', { name: /limpiar/i })).not.toBeInTheDocument();

        rerender(<FormulaInput {...defaultProps} formula="H2O" />);
        expect(screen.getByRole('button', { name: /limpiar/i })).toBeInTheDocument();
    });

});
