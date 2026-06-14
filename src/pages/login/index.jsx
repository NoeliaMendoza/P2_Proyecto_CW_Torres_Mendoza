import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useChemical } from '../../context/ChemicalContext';
import { login } from '../../services/chemistry-service';
import styles from './Login.module.css';

const Login = () => {
    const navigate = useNavigate();
    const { iniciarSesion } = useChemical();
    const [form, setForm] = useState({ email: '', contrasena: '' });
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        setError('');
        try {
            const res = await login(form);
            if (res.data.error) {
                setError(res.data.error);
            } else {
                iniciarSesion(res.data.usuario);
                navigate('/tabla');
            }
        } catch {
            setError('Error al conectar con el servidor');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className={styles.contenedor}>
            <div className={styles.card}>
                <div className={styles.icono}>⚗️</div>
                <h2>Iniciar Sesión</h2>
                <p>Accede a tus favoritos e historial</p>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.campo}>
                        <label>Correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="ejemplo@correo.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.campo}>
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="contrasena"
                            placeholder="Tu contraseña"
                            value={form.contrasena}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.btn} disabled={cargando}>
                        {cargando ? 'Ingresando...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <p className={styles.enlace}>
                    ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;