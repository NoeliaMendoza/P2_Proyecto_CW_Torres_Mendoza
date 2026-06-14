import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registro } from '../../services/chemistry-service';
import styles from './Registro.module.css';

const Registro = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ nombre: '', email: '', contrasena: '', confirmar: '' });
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (form.contrasena !== form.confirmar) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setCargando(true);
        try {
            const res = await registro({
                nombre: form.nombre,
                email: form.email,
                contrasena: form.contrasena,
            });
            if (res.error) {
                setError(res.error);
            } else {
                navigate('/login');
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
                <div className={styles.icono}></div>
                <h2>Crear Cuenta</h2>
                <p>Únete para guardar tus favoritos e historial</p>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.campo}>
                        <label>Nombre completo</label>
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Tu nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>

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
                            placeholder="Mínimo 6 caracteres"
                            value={form.contrasena}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.campo}>
                        <label>Confirmar contraseña</label>
                        <input
                            type="password"
                            name="confirmar"
                            placeholder="Repite tu contraseña"
                            value={form.confirmar}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.btn} disabled={cargando}>
                        {cargando ? 'Creando cuenta...' : 'Crear Cuenta'}
                    </button>
                </form>

                <p className={styles.enlace}>
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </div>
        </div>
    );
};

export default Registro;