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
            const data = res?.data ?? res;

            if (data?.error) {
                setError(data.error);
            } else if (data?.usuario) {
                iniciarSesion(data.usuario);
                navigate('/tabla');
            } else {
                setError('Credenciales incorrectas');
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
                <div className={styles.panelImagen}>
                    <span className={styles.welcomeText}>Welcome</span>
                </div>

                <div className={styles.panelForm}>
                    <h2 className={styles.titulo}>Login</h2>

                    {error && <div className={styles.error}>{error}</div>}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.campo}>
                            <label>Correo electrónico</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
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
                                    placeholder="Password"
                                    value={form.contrasena}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <a href="#" className={styles.olvidaste}>Forgot password?</a>
                        </div>

                        <button type="submit" className={styles.btn} disabled={cargando}>
                            {cargando ? 'Ingresando...' : 'Login'}
                        </button>
                    </form>

                    <p className={styles.enlace}>
                        ¿No tienes cuenta?{' '}
                        <Link to="/registro">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
