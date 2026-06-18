import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import InfoCard from './InfoCard';

describe('InfoCard', () => {

    it('muestra el título correctamente', () => {
        render(<InfoCard icono={<span>🔬</span>} titulo="Calculadora" descripcion="Descripción de prueba" />);
        expect(screen.getByText('Calculadora')).toBeInTheDocument();
    });

    it('muestra la descripción correctamente', () => {
        render(<InfoCard icono={<span>🔬</span>} titulo="Calculadora" descripcion="Descripción de prueba" />);
        expect(screen.getByText('Descripción de prueba')).toBeInTheDocument();
    });

    it('renderiza el icono', () => {
        render(<InfoCard icono={<span data-testid="icono">🔬</span>} titulo="Test" descripcion="Desc" />);
        expect(screen.getByTestId('icono')).toBeInTheDocument();
    });

});
