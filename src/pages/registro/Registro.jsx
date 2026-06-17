import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SlChemistry } from 'react-icons/sl';
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (form.contrasena !== form.confirmar) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setCargando(true);
        const datos = { nombre: form.nombre, email: form.email, contrasena: form.contrasena };

        registro(datos)
            .then((res) => {
                if (res.error) {
                    setError(res.error);
                } else {
                    navigate('/login');
                }
            })
            .catch(() => setError('Error al conectar con el servidor'))
            .finally(() => setCargando(false));
    };

    return (
        <div className={styles.contenedor}>
            <div className={styles.card}>

                {/* Panel izquierdo — imagen + ícono */}
                <div className={styles.panelImagen}>
                    <SlChemistry className={styles.logoIcon} />
                    <span className={styles.welcomeText}>Bienvenido</span>
                </div>

                {/* Panel derecho — formulario */}
                <div className={styles.panelForm}>
                    <h2 className={styles.titulo}>Crear cuenta</h2>

                    {error && <div className={styles.error}>{error}</div>}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.campo}>
                            <label>Nombre completo</label>
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre completo"
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
                                placeholder="Correo electrónico"
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
                                placeholder="Contraseña (mín. 6 caracteres)"
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
                                placeholder="Confirmar contraseña"
                                value={form.confirmar}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.btn} disabled={cargando}>
                            {cargando ? 'Creando cuenta...' : 'Registrarse'}
                        </button>
                    </form>

                    <p className={styles.enlace}>
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login">Iniciar sesión</Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export { Registro };
