import { MiembroCard } from '../../components';
import styles from './Equipo.module.css';

// ── Datos del equipo ─────────────────────────────────────────────
const MIEMBROS = [
    {
        id: 1,
        iniciales: 'LT',
        nombre: 'Lisseth Torres',
        rol: 'Desarrolladora de Software',
        datos: [
            { label: 'Universidad', valor: 'ESPE' },
            { label: 'Carrera', valor: 'ITIN' },
            { label: 'Asignatura', valor: 'Programación Integrativa' },
        ],
    },
    {
        id: 2,
        iniciales: 'NM',
        nombre: 'Noelia Mendoza',
        rol: 'Desarrolladora de Software',
        datos: [
            { label: 'Universidad', valor: 'ESPE' },
            { label: 'Carrera', valor: 'ITIN' },
            { label: 'Asignatura', valor: 'Programación Integrativa' },
        ],
    },
];

// ── Página ───────────────────────────────────────────────────────
export const Equipo = () => {
    return (
        <div className={styles.contenedor}>
            <header className={styles.encabezado}>
                <h1>Equipo de Trabajo</h1>
                <p>Estudiantes de la Universidad de las Fuerzas Armadas (ESPE)</p>
            </header>

            <div className={styles.grid}>
                {MIEMBROS.map((miembro) => (
                    <MiembroCard
                        key={miembro.id}
                        iniciales={miembro.iniciales}
                        nombre={miembro.nombre}
                        rol={miembro.rol}
                        datos={miembro.datos}
                    />
                ))}
            </div>

            <section className={styles.proyectoMeta}>
                <h3>Información de la Asignatura</h3>
                <p>
                    Proyecto desarrollado para el Segundo Parcial de la materia de Computación Web.
                    Aplica la arquitectura basada en componentes con React, persistencia de datos relacionales en MySQL,
                    y consumo de API externa en tiempo real, cumpliendo con los estándares de diseño y desarrollo web modernos.
                </p>
            </section>
        </div>
    );
};

export default Equipo;
