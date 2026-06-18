import PropTypes from 'prop-types';
import styles from './MiembroCard.module.css';

export const MiembroCard = ({ iniciales, nombre, rol, datos }) => {
    return (
        <div className={styles.card}>
            <div className={styles.avatar}>{iniciales}</div>
            <h2 className={styles.nombre}>{nombre}</h2>
            <span className={styles.rol}>{rol}</span>
            <div className={styles.info}>
                {datos.map((dato) => (
                    <div key={dato.label} className={styles.dato}>
                        <span>{dato.label}</span>
                        <strong>{dato.valor}</strong>
                    </div>
                ))}
            </div>
        </div>
    );
};

MiembroCard.propTypes = {
    iniciales: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    rol: PropTypes.string.isRequired,
    datos: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            valor: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default MiembroCard;
