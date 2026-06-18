import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MiembroCard from './MiembroCard';

const props = {
    iniciales: 'LT',
    nombre: 'Lisseth Torres',
    rol: 'Desarrolladora de Software',
    datos: [
        { label: 'Universidad', valor: 'ESPE' },
        { label: 'Carrera', valor: 'Computación / Software' },
    ],
};

describe('MiembroCard', () => {

    it('muestra las iniciales', () => {
        render(<MiembroCard {...props} />);
        expect(screen.getByText('LT')).toBeInTheDocument();
    });

    it('muestra el nombre del integrante', () => {
        render(<MiembroCard {...props} />);
        expect(screen.getByText('Lisseth Torres')).toBeInTheDocument();
    });

    it('muestra el rol', () => {
        render(<MiembroCard {...props} />);
        expect(screen.getByText('Desarrolladora de Software')).toBeInTheDocument();
    });

    it('renderiza todos los datos con map', () => {
        render(<MiembroCard {...props} />);
        expect(screen.getByText('Universidad')).toBeInTheDocument();
        expect(screen.getByText('ESPE')).toBeInTheDocument();
        expect(screen.getByText('Carrera')).toBeInTheDocument();
        expect(screen.getByText('Computación / Software')).toBeInTheDocument();
    });

    it('renderiza el número correcto de filas de datos', () => {
        render(<MiembroCard {...props} />);
        const labels = props.datos.map(d => screen.getByText(d.label));
        expect(labels).toHaveLength(props.datos.length);
    });

});
