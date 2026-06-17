const API_ELEMENTOS = import.meta.env.VITE_API_ELEMENTOS;
const API_PHP = import.meta.env.VITE_API_PHP;

const nombresES = {
    Hydrogen: 'Hidrógeno',
    Helium: 'Helio',
    Lithium: 'Litio',
    Beryllium: 'Berilio',
    Boron: 'Boro',
    Carbon: 'Carbono',
    Nitrogen: 'Nitrógeno',
    Oxygen: 'Oxígeno',
    Fluorine: 'Flúor',
    Neon: 'Neón',
    Sodium: 'Sodio',
    Magnesium: 'Magnesio',
    Aluminium: 'Aluminio',
    Aluminum: 'Aluminio',
    Silicon: 'Silicio',
    Phosphorus: 'Fósforo',
    Sulfur: 'Azufre',
    Chlorine: 'Cloro',
    Argon: 'Argón',
    Potassium: 'Potasio',
    Calcium: 'Calcio',
    Scandium: 'Escandio',
    Titanium: 'Titanio',
    Vanadium: 'Vanadio',
    Chromium: 'Cromo',
    Manganese: 'Manganeso',
    Iron: 'Hierro',
    Cobalt: 'Cobalto',
    Nickel: 'Níquel',
    Copper: 'Cobre',
    Zinc: 'Zinc',
    Gallium: 'Galio',
    Germanium: 'Germanio',
    Arsenic: 'Arsénico',
    Selenium: 'Selenio',
    Bromine: 'Bromo',
    Krypton: 'Kriptón',
    Rubidium: 'Rubidio',
    Strontium: 'Estroncio',
    Yttrium: 'Itrio',
    Zirconium: 'Circonio',
    Niobium: 'Niobio',
    Molybdenum: 'Molibdeno',
    Technetium: 'Tecnecio',
    Ruthenium: 'Rutenio',
    Rhodium: 'Rodio',
    Palladium: 'Paladio',
    Silver: 'Plata',
    Cadmium: 'Cadmio',
    Indium: 'Indio',
    Tin: 'Estaño',
    Antimony: 'Antimonio',
    Tellurium: 'Telurio',
    Iodine: 'Yodo',
    Xenon: 'Xenón',
    Cesium: 'Cesio',
    Barium: 'Bario',
    Lanthanum: 'Lantano',
    Cerium: 'Cerio',
    Praseodymium: 'Praseodimio',
    Neodymium: 'Neodimio',
    Promethium: 'Prometio',
    Samarium: 'Samario',
    Europium: 'Europio',
    Gadolinium: 'Gadolinio',
    Terbium: 'Terbio',
    Dysprosium: 'Disprosio',
    Holmium: 'Holmio',
    Erbium: 'Erbio',
    Thulium: 'Tulio',
    Ytterbium: 'Iterbio',
    Lutetium: 'Lutecio',
    Hafnium: 'Hafnio',
    Tantalum: 'Tántalo',
    Tungsten: 'Tungsteno',
    Rhenium: 'Renio',
    Osmium: 'Osmio',
    Iridium: 'Iridio',
    Platinum: 'Platino',
    Gold: 'Oro',
    Mercury: 'Mercurio',
    Thallium: 'Talio',
    Lead: 'Plomo',
    Bismuth: 'Bismuto',
    Polonium: 'Polonio',
    Astatine: 'Astato',
    Radon: 'Radón',
    Francium: 'Francio',
    Radium: 'Radio',
    Actinium: 'Actinio',
    Thorium: 'Torio',
    Protactinium: 'Protactinio',
    Uranium: 'Uranio',
    Neptunium: 'Neptunio',
    Plutonium: 'Plutonio',
    Americium: 'Americio',
    Curium: 'Curio',
    Berkelium: 'Berkelio',
    Californium: 'Californio',
    Einsteinium: 'Einsteinio',
    Fermium: 'Fermio',
    Mendelevium: 'Mendelevio',
    Nobelium: 'Nobelio',
    Lawrencium: 'Lawrencio',
    Rutherfordium: 'Rutherfordio',
    Dubnium: 'Dubnio',
    Seaborgium: 'Seaborgio',
    Bohrium: 'Bohrio',
    Hassium: 'Hassio',
    Meitnerium: 'Meitnerio',
    Darmstadtium: 'Darmstadtio',
    Roentgenium: 'Roentgenio',
    Copernicium: 'Copernicio',
    Nihonium: 'Nihonio',
    Flerovium: 'Flerovio',
    Moscovium: 'Moscovio',
    Livermorium: 'Livermorio',
    Tennessine: 'Teneso',
    Oganesson: 'Oganesón',
};

const categoriasES = {
    'alkali metal': 'Metal alcalino',
    'alkaline earth metal': 'Metal alcalinotérreo',
    'transition metal': 'Metal de transición',
    'diatomic nonmetal': 'No metal diatómico',
    'polyatomic nonmetal': 'No metal poliatómico',
    nonmetal: 'No metal',
    'noble gas': 'Gas noble',
    lanthanide: 'Lantánido',
    actinide: 'Actínido',
    'post-transition metal': 'Metal post-transición',
    halogen: 'Halógeno',
    metalloid: 'Metaloide',
    unknown: 'Desconocido',
};

const ELEMENTOS_EXCLUIDOS = [119]; // Ununennium (Uue) - no reconocido oficialmente

// ── API pública ──────────────────────────────────────────
export const obtenerElementos = async () => {
    const res = await fetch(API_ELEMENTOS);
    const data = await res.json();
    return data.elements
        .filter((el) => !ELEMENTOS_EXCLUIDOS.includes(el.number))
        .map((el) => ({
            ...el,
            nombreES: nombresES[el.name] || el.name,
            categoriaES: categoriasES[el.category] || el.category,
        }));
};

// ── Usuarios ─────────────────────────────────────────────
export const login = async (form) => {
    const res = await fetch(`${API_PHP}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
    });
    return res.json();
};

export const registro = async (form) => {
    const res = await fetch(`${API_PHP}/usuarios/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
    });
    return res.json();
};

// ── Favoritos ────────────────────────────────────────────
export const obtenerFavoritos = async (usuario_id) => {
    const res = await fetch(`${API_PHP}/favoritos/get?usuario_id=${usuario_id}`);
    return res.json();
};

export const agregarFavorito = async (data) => {
    const res = await fetch(`${API_PHP}/favoritos/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const eliminarFavorito = async (data) => {
    const res = await fetch(`${API_PHP}/favoritos/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
};

// ── Historial ────────────────────────────────────────────
export const obtenerHistorial = async (usuario_id) => {
    const res = await fetch(`${API_PHP}/historial/get?usuario_id=${usuario_id}`);
    return res.json();
};

export const agregarHistorial = async (data) => {
    const res = await fetch(`${API_PHP}/historial/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
};

// ── Cálculos ─────────────────────────────────────────────
export const obtenerCalculos = async (usuario_id) => {
    const res = await fetch(`${API_PHP}/calculos/get?usuario_id=${usuario_id}`);
    return res.json();
};

export const guardarCalculo = async (data) => {
    const res = await fetch(`${API_PHP}/calculos/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
};
