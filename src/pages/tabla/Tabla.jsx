import { useState, useEffect } from 'react';
import { useChemical } from '../../context/ChemicalContext';
import { ElementCard, SearchBar } from '../../components';
import { obtenerElementos, agregarHistorial, agregarFavorito, eliminarFavorito, obtenerFavoritos } from '../../services/chemistry-service';
import styles from './Tabla.module.css';

const mostrarDato = (valor, unidad = '') => {
    if (valor === null || valor === undefined || valor === '') return 'N/A';
    return `${valor}${unidad}`;
};

const Tabla = () => {
    const { usuario, elementoSeleccionado, setElementoSeleccionado, favoritos, setFavoritos } = useChemical();
    const [elementos, setElementos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarElementos = async () => {
            const data = await obtenerElementos();
            setElementos(data);
            setCargando(false);
        };
        cargarElementos();
    }, []);

    useEffect(() => {
        if (usuario) {
            obtenerFavoritos(usuario.id).then(data => setFavoritos(data));
        }
    }, [usuario, setFavoritos]);

    const handleClick = async (elemento) => {
        setElementoSeleccionado(elemento);
        if (usuario) {
            await agregarHistorial({
                usuario_id: usuario.id,
                numero_atomico: elemento.number,
                simbolo: elemento.symbol,
                nombre_es: elemento.nombreES,
            });
        }
    };

    const esFavorito = (numero) =>
        favoritos.some(f => f.numero_atomico === numero);

    const toggleFavorito = async (e, elemento) => {
        e.stopPropagation();
        if (!usuario) return alert('Debes iniciar sesión para guardar favoritos');

        if (esFavorito(elemento.number)) {
            await eliminarFavorito({ usuario_id: usuario.id, numero_atomico: elemento.number });
            setFavoritos(favoritos.filter(f => f.numero_atomico !== elemento.number));
        } else {
            await agregarFavorito({
                usuario_id: usuario.id,
                numero_atomico: elemento.number,
                simbolo: elemento.symbol,
                nombre_es: elemento.nombreES,
            });
            setFavoritos([...favoritos, { numero_atomico: elemento.number }]);
        }
    };

    const elementosFiltrados = elementos.filter(el =>
        el.nombreES.toLowerCase().includes(busqueda.toLowerCase()) ||
        el.symbol.toLowerCase().includes(busqueda.toLowerCase()) ||
        String(el.number).includes(busqueda)
    );

    const imagenElemento =
        elementoSeleccionado?.image?.url ||
        elementoSeleccionado?.bohr_model_image ||
        elementoSeleccionado?.spectral_img;

    const datosImportantes = elementoSeleccionado
        ? [
            ['Categoría', elementoSeleccionado.categoriaES],
            ['Masa atómica', mostrarDato(elementoSeleccionado.atomic_mass, ' u')],
            ['Fase', elementoSeleccionado.phase],
            ['Periodo / Grupo', `${mostrarDato(elementoSeleccionado.period)} / ${mostrarDato(elementoSeleccionado.group)}`],
            ['Punto de fusión', mostrarDato(elementoSeleccionado.melt, ' K')],
            ['Punto de ebullición', mostrarDato(elementoSeleccionado.boil, ' K')],
            ['Electronegatividad', elementoSeleccionado.electronegativity_pauling],
            ['Configuración electrónica', elementoSeleccionado.electron_configuration],
        ]
        : [];

    if (cargando) return <div className={styles.cargando}>Cargando elementos...</div>;

    return (
        <div className={styles.contenedor}>
            <div className={styles.encabezado}>
                <h1>Tabla Periódica</h1>
                <SearchBar valor={busqueda} onChange={setBusqueda} placeholder="Buscar por nombre, símbolo o número..." />
            </div>

            {/* Panel de detalle */}
            {elementoSeleccionado && (
                <div className={styles.detalle}>
                    <div className={styles.detallePrincipal}>
                        <div className={styles.detalleVisual}>
                            <div className={styles.detalleSimboloBox}>
                                <span className={styles.detalleNumero}>{elementoSeleccionado.number}</span>
                                <span className={styles.detalleSimbolo}>{elementoSeleccionado.symbol}</span>
                                <span className={styles.detalleNombre}>{elementoSeleccionado.nombreES}</span>
                                <button
                                    className={`${styles.btnFavDetalle} ${esFavorito(elementoSeleccionado.number) ? styles.favActivo : ''}`}
                                    onClick={(e) => toggleFavorito(e, elementoSeleccionado)}
                                    title={esFavorito(elementoSeleccionado.number) ? "Quitar de favoritos" : "Agregar a favoritos"}
                                >
                                    {esFavorito(elementoSeleccionado.number) ? '★' : '☆'}
                                </button>
                            </div>
                            <div className={styles.detalleImagenBox}>
                                {imagenElemento ? (
                                    <img
                                        className={styles.detalleImagen}
                                        src={imagenElemento}
                                        alt={`Imagen de ${elementoSeleccionado.nombreES}`}
                                    />
                                ) : (
                                    <div className={styles.detalleImagenFallback}>
                                        <span>{elementoSeleccionado.symbol}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles.detalleInfo}>
                            <h2>Datos importantes</h2>
                            <div className={styles.detalleDatosGrid}>
                                {datosImportantes.map(([etiqueta, valor]) => (
                                    <div key={etiqueta} className={styles.detalleDato}>
                                        <span>{etiqueta}</span>
                                        <strong>{mostrarDato(valor)}</strong>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button className={styles.cerrar} onClick={() => setElementoSeleccionado(null)}>✕ Cerrar</button>
                </div>
            )}

            {/* Tabla o resultados de búsqueda */}
            {busqueda ? (
                <div className={styles.resultados}>
                    {elementosFiltrados.length === 0 ? (
                        <p className={styles.sinResultados}>No se encontraron elementos</p>
                    ) : (
                        <div className={styles.gridResultados}>
                            {elementosFiltrados.map(el => (
                                <div key={el.number} className={styles.cardResultado} onClick={() => handleClick(el)}>
                                    <ElementCard
                                        simbolo={el.symbol}
                                        nombre={el.nombreES}
                                        numeroAtomico={el.number}
                                        masaAtomica={el.atomic_mass}
                                        categoria={el.category}
                                        col={1}
                                        fila={1}
                                        onClick={() => handleClick(el)}
                                    />
                                    <button
                                        className={`${styles.btnFav} ${esFavorito(el.number) ? styles.favActivo : ''}`}
                                        onClick={(e) => toggleFavorito(e, el)}
                                    >
                                        {esFavorito(el.number) ? '★' : '☆'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.tablaWrapper}>
                    <div className={styles.grilla}>
                        {elementos.map(el => (
                            <ElementCard
                                key={el.number}
                                simbolo={el.symbol}
                                nombre={el.nombreES}
                                numeroAtomico={el.number}
                                masaAtomica={el.atomic_mass}
                                categoria={el.category}
                                col={el.xpos}
                                fila={el.ypos}
                                onClick={() => handleClick(el)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export { Tabla };
