import PropTypes from 'prop-types';
import { LuSearch } from 'react-icons/lu';
import styles from './SearchBar.module.css';

const SearchBar = ({ valor, onChange, placeholder }) => {
    return (
        <div className={styles.contenedor}>
            <span className={styles.icono}>
                <LuSearch size={18} />
            </span>
            <input
                className={styles.input}
                type="text"
                value={valor}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || 'Buscar elemento...'}
            />
            {valor && (
                <button className={styles.limpiar} onClick={() => onChange('')}>✕</button>
            )}
        </div>
    );
};

SearchBar.propTypes = {
    valor: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

export { SearchBar };
