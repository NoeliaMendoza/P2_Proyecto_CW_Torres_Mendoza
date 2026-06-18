import PropTypes from 'prop-types';
import styles from './InfoCard.module.css';

export const InfoCard = ({ icono, titulo, descripcion }) => {
    return (
        <section className={styles.card}>
            <div className={styles.icono}>{icono}</div>
            <h3 className={styles.titulo}>{titulo}</h3>
            <p className={styles.descripcion}>{descripcion}</p>
        </section>
    );
};

InfoCard.propTypes = {
    icono: PropTypes.node.isRequired,
    titulo: PropTypes.string.isRequired,
    descripcion: PropTypes.node.isRequired,
};

export default InfoCard;
