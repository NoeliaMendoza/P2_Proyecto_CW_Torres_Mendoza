import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useChemical } from '../../context/ChemicalContext';
import { login } from '../../services/chemistry-service';
import styles from './Login.module.css';

export const Login = () => {
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

                {/* Panel izquierdo — imagen decorativa */}
                <div className={styles.panelImagen}>
                    <span className={styles.welcomeText}>Bienvenido</span>
                </div>

                {/* Panel derecho — formulario */}
                <div className={styles.panelForm}>
                    <h2 className={styles.titulo}>Iniciar sesión</h2>

                    {error && <div className={styles.error}>{error}</div>}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.campo}>
                            <label>Correo electrónico</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Correo electrónico"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.filaPassword}>
                            <div className={styles.campo}>
                                <label>Contraseña</label>
                                <input
                                    type="password"
                                    name="contrasena"
                                    placeholder="Contraseña"
                                    value={form.contrasena}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className={styles.btn} disabled={cargando}>
                            {cargando ? 'Ingresando...' : 'Acceder'}
                        </button>
                    </form>

                    <p className={styles.enlace}>
                        ¿No tienes cuenta?{' '}
                        <Link to="/registro">Regístrate</Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

