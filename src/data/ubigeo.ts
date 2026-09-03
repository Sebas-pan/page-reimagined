export const DEPARTAMENTOS = [
  "Amazonas",
  "Áncash",
  "Apurímac",
  "Arequipa",
  "Ayacucho",
  "Cajamarca",
  "Callao",
  "Cusco",
  "Huancavelica",
  "Huánuco",
  "Ica",
  "Junín",
  "La Libertad",
  "Lambayeque",
  "Lima",
  "Loreto",
  "Madre de Dios",
  "Moquegua",
  "Pasco",
  "Piura",
  "Puno",
  "San Martín",
  "Tacna",
  "Tumbes",
  "Ucayali",
] as const;

export type Departamento = (typeof DEPARTAMENTOS)[number];

export const PROVINCIAS: Record<string, string[]> = {
  Amazonas: ["Chachapoyas", "Bagua", "Bongará", "Condorcanqui", "Luya", "Rodríguez de Mendoza", "Utcubamba"],
  Áncash: ["Huaraz", "Aija", "Antonio Raymondi", "Asunción", "Bolognesi", "Carhuaz", "Casma", "Corongo", "Huari", "Huarmey", "Huaylas", "Mariscal Luzuriaga", "Ocros", "Pallasca", "Pomabamba", "Recuay", "Santa", "Sihuas", "Yungay"],
  Apurímac: ["Abancay", "Andahuaylas", "Antabamba", "Aymaraes", "Cotabambas", "Chincheros", "Grau"],
  Arequipa: ["Arequipa", "Camaná", "Caravelí", "Castilla", "Caylloma", "Condesuyos", "Islay", "La Unión"],
  Ayacucho: ["Huamanga", "Cangallo", "Huanca Sancos", "Huanta", "La Mar", "Lucanas", "Parinacochas", "Páucar del Sara Sara", "Sucre", "Víctor Fajardo", "Vilcas Huamán"],
  Cajamarca: ["Cajamarca", "Cajabamba", "Celendín", "Chota", "Contumazá", "Cutervo", "Hualgayoc", "Jaén", "San Ignacio", "San Marcos", "San Miguel", "San Pablo", "Santa Cruz"],
  Callao: ["Callao"],
  Cusco: ["Cusco", "Acomayo", "Anta", "Calca", "Canas", "Canchis", "Chumbivilcas", "Espinar", "La Convención", "Paruro", "Paucartambo", "Quispicanchi", "Urubamba"],
  Huancavelica: ["Huancavelica", "Acobamba", "Angaraes", "Castrovirreyna", "Churcampa", "Huaytará", "Tayacaja"],
  Huánuco: ["Huánuco", "Ambo", "Dos de Mayo", "Huacaybamba", "Huamalíes", "Leoncio Prado", "Marañón", "Pachitea", "Puerto Inca", "Lauricocha", "Yarowilca"],
  Ica: ["Ica", "Chincha", "Nazca", "Palpa", "Pisco"],
  Junín: ["Huancayo", "Concepción", "Chanchamayo", "Jauja", "Junín", "Satipo", "Tarma", "Yauli", "Chupaca"],
  "La Libertad": ["Trujillo", "Ascope", "Bolívar", "Chepén", "Julcán", "Otuzco", "Pacasmayo", "Pataz", "Sánchez Carrión", "Santiago de Chuco", "Gran Chimú", "Virú"],
  Lambayeque: ["Chiclayo", "Ferreñafe", "Lambayeque"],
  Lima: ["Lima", "Barranca", "Cajatambo", "Canta", "Cañete", "Huaral", "Huarochirí", "Huaura", "Oyón", "Yauyos"],
  Loreto: ["Maynas", "Alto Amazonas", "Loreto", "Mariscal Ramón Castilla", "Requena", "Ucayali", "Datem del Marañón", "Putumayo"],
  "Madre de Dios": ["Tambopata", "Manu", "Tahuamanu"],
  Moquegua: ["Mariscal Nieto", "General Sánchez Cerro", "Ilo"],
  Pasco: ["Pasco", "Daniel Alcides Carrión", "Oxapampa"],
  Piura: ["Piura", "Ayabaca", "Huancabamba", "Morropón", "Paita", "Sullana", "Talara", "Sechura"],
  Puno: ["Puno", "Azángaro", "Carabaya", "Chucuito", "El Collao", "Huancané", "Lampa", "Melgar", "Moho", "San Antonio de Putina", "San Román", "Sandia", "Yunguyo"],
  "San Martín": ["Moyobamba", "Bellavista", "El Dorado", "Huallaga", "Lamas", "Mariscal Cáceres", "Picota", "Rioja", "San Martín", "Tocache"],
  Tacna: ["Tacna", "Candarave", "Jorge Basadre", "Tarata"],
  Tumbes: ["Tumbes", "Contralmirante Villar", "Zarumilla"],
  Ucayali: ["Coronel Portillo", "Atalaya", "Padre Abad", "Purús"],
};

export const DISTRITOS: Record<string, string[]> = {
  // Amazonas
  Chachapoyas: ["Chachapoyas", "Asunción", "Balsas", "Cheto", "Chiliquín", "Chuquibamba", "Granada", "Huancas", "La Jalca", "Leimebamba"],
  Bagua: ["Bagua", "Aramango", "Copallín", "El Parco", "Imaza", "La Peca"],
  Bongará: ["Jumbilla", "Chisquilla", "Churuja", "Corosha", "Cuispes", "Florida"],
  Condorcanqui: ["Nieva", "El Cenepa", "Río Santiago"],
  Luya: ["Lamud", "Camporredondo", "Cocabamba", "Colcamar", "Conila", "Inguilpata"],
  "Rodríguez de Mendoza": ["San Nicolás", "Chirimoto", "Cochamal", "Huambo", "Limabamba", "Longar"],
  Utcubamba: ["Bagua Grande", "Cajaruro", "Cumba", "El Milagro", "Jamalca", "Lonya Grande"],
  // Áncash
  Huaraz: ["Huaraz", "Cochabamba", "Colcabamba", "Huanchay", "Independencia", "Jangas", "La Libertad", "Olleros", "Pampas Grande", "Pariacoto"],
  Santa: ["Chimbote", "Cáceres del Perú", "Coishco", "Macate", "Moro", "Nepeña", "Nuevo Chimbote", "Samanco", "Santa"],
  Huari: ["Huari", "Anra", "Cajay", "Chavín de Huántar", "Huacachi", "Huacchis"],
  // Apurímac
  Abancay: ["Abancay", "Chacoche", "Circa", "Curahuasi", "Huanipaca", "Lambrama"],
  Andahuaylas: ["Andahuaylas", "Andarapa", "Chiara", "Huancarama", "Huancaray", "Kishuara"],
  // Arequipa
  Arequipa: ["Arequipa", "Cayma", "Cerro Colorado", "José Luis Bustamante y Rivero", "Mariano Melgar", "Miraflores", "Paucarpata", "Sachaca", "Yanahuara"],
  Camaná: ["Camaná", "José María Quimper", "Mariano Nicolás Valcárcel", "Mariscal Cáceres", "Nicolás de Piérola"],
  Caylloma: ["Chivay", "Achoma", "Cabanaconde", "Callalli", "Coporaque", "Maca"],
  // Ayacucho
  Huamanga: ["Ayacucho", "Acocro", "Acos Vinchos", "Carmen Alto", "Chiara", "Jesús Nazareno", "San Juan Bautista"],
  Huanta: ["Huanta", "Ayahuanco", "Huamanguilla", "Iguain", "Luricocha", "Santillana"],
  // Cajamarca
  Cajamarca: ["Cajamarca", "Asunción", "Chetilla", "Cospán", "Encañada", "Jesús", "Llacanora", "Los Baños del Inca"],
  Jaén: ["Jaén", "Bellavista", "Chontalí", "Colasay", "Huabal", "Las Pirias", "Pomahuaca"],
  // Callao
  Callao: ["Callao", "Bellavista", "Carmen de la Legua Reynoso", "La Perla", "La Punta", "Ventanilla", "Mi Perú"],
  // Cusco
  Cusco: ["Cusco", "Ccorca", "Poroy", "San Jerónimo", "San Sebastián", "Santiago", "Saylla", "Wanchaq"],
  Anta: ["Anta", "Ancahuasi", "Cachimayo", "Chinchaypujio", "Huarocondo", "Limatambo", "Mollepata"],
  Calca: ["Calca", "Coya", "Lamay", "Lares", "Pisac", "San Salvador", "Taray", "Yanatile"],
  // Huancavelica
  Huancavelica: ["Huancavelica", "Acobambilla", "Acoria", "Conayca", "Cuenca", "Huachocolpa"],
  Tayacaja: ["Pampas", "Acostambo", "Acraquia", "Ahuaycha", "Colcabamba", "Daniel Hernández"],
  // Huánuco
  Huánuco: ["Huánuco", "Amarilis", "Chinchao", "Churubamba", "Margos", "Pillco Marca", "Quisqui"],
  "Leoncio Prado": ["Rupa-Rupa", "Daniel Alomía Robles", "Hermilio Valdizán", "José Crespo y Castillo", "Luyando"],
  // Ica
  Ica: ["Ica", "La Tinguiña", "Los Aquijes", "Ocucaje", "Pachacútec", "Parcona", "Pueblo Nuevo", "Salas", "San José de los Molinos"],
  Chincha: ["Chincha Alta", "Alto Larán", "Chavín", "Chincha Baja", "El Carmen", "Grocio Prado", "Pueblo Nuevo", "Sunampe"],
  Nazca: ["Nazca", "Changuillo", "El Ingenio", "Marcona", "Vista Alegre"],
  Pisco: ["Pisco", "Huancano", "Humay", "Independencia", "Paracas", "San Andrés", "San Clemente", "Túpac Amaru Inca"],
  // Junín
  Huancayo: ["Huancayo", "Carhuacallanga", "Chacapampa", "Chicche", "Chilca", "Chongos Alto", "El Tambo", "Pilcomayo"],
  Chanchamayo: ["Chanchamayo", "Perené", "Pichanaqui", "San Luis de Shuaro", "San Ramón", "Vitoc"],
  Tarma: ["Tarma", "Acobamba", "Huaricolca", "Huasahuasi", "La Unión", "Palca"],
  // La Libertad
  Trujillo: ["Trujillo", "El Porvenir", "Florencia de Mora", "Huanchaco", "La Esperanza", "Laredo", "Moche", "Poroto", "Salaverry", "Simbal", "Víctor Larco Herrera"],
  Otuzco: ["Otuzco", "Agallpampa", "Charat", "Huaranchal", "La Cuesta", "Mache", "Paranday"],
  // Lambayeque
  Chiclayo: ["Chiclayo", "Chongoyape", "Eten", "Eten Puerto", "José Leonardo Ortiz", "La Victoria", "Lagunas", "Monsefú", "Picsi", "Pimentel", "Reque", "Santa Rosa"],
  Ferreñafe: ["Ferreñafe", "Cañaris", "Incahuasi", "Manuel Antonio Mesones Muro", "Pitipo", "Pueblo Nuevo"],
  Lambayeque: ["Lambayeque", "Chóchope", "Íllimo", "Jayanca", "Mochumí", "Morrope", "Motupe", "Olmos", "Pacora", "Salas", "San José", "Túcume"],
  // Lima
  Lima: ["Lima", "Ancón", "Ate", "Barranco", "Breña", "Carabayllo", "Chaclacayo", "Chorrillos", "Cieneguilla", "Comas", "El Agustino", "Independencia", "Jesús María", "La Molina", "La Victoria", "Lince", "Los Olivos", "Lurigancho", "Lurín", "Magdalena del Mar", "Miraflores", "Pachacámac", "Pucusana", "Pueblo Libre", "Puente Piedra", "Punta Hermosa", "Punta Negra", "Rímac", "San Bartolo", "San Borja", "San Isidro", "San Juan de Lurigancho", "San Juan de Miraflores", "San Luis", "San Martín de Porres", "San Miguel", "Santa Anita", "Santa María del Mar", "Santa Rosa", "Santiago de Surco", "Surquillo", "Villa El Salvador", "Villa María del Triunfo"],
  Barranca: ["Barranca", "Paramonga", "Pativilca", "Supe", "Supe Puerto"],
  Cañete: ["San Vicente de Cañete", "Asia", "Calango", "Cerro Azul", "Chilca", "Coayllo", "Imperial", "Lunahuaná", "Mala", "Nuevo Imperial", "Quilmaná"],
  Huaral: ["Huaral", "Atavillos Alto", "Atavillos Bajo", "Aucallama", "Chancay", "Ihuari", "Lampian", "Pacaraos", "San Miguel de Acos", "Santa Cruz de Andamarca", "Sumbilca"],
  Huarochirí: ["Matucana", "Antioquía", "Callahuanca", "Carampoma", "Chicla", "Cuenca", "Huachupampa", "Huanza", "Huarochirí", "Lahuaytambo"],
  Huaura: ["Huacho", "Ámbar", "Caleta de Carquín", "Checras", "Hualmay", "Huaura", "Paccho", "Santa Leonor", "Santa María", "Sayán", "Végueta"],
  // Loreto
  Maynas: ["Iquitos", "Alto Nanay", "Fernando Lores", "Indiana", "Las Amazonas", "Mazán", "Napo", "Punchana", "Belén", "San Juan Bautista"],
  "Alto Amazonas": ["Yurimaguas", "Balsapuerto", "Jeberos", "Lagunas", "Santa Cruz", "Teniente César López Rojas"],
  // Madre de Dios
  Tambopata: ["Tambopata", "Inambari", "Las Piedras", "Laberinto"],
  Manu: ["Manu", "Fitzcarrald", "Madre de Dios", "Huepetuhe"],
  Tahuamanu: ["Iñapari", "Iberia", "Tahuamanu"],
  // Moquegua
  "Mariscal Nieto": ["Moquegua", "Carumas", "Cuchumbaya", "Samegua", "San Cristóbal", "Torata"],
  Ilo: ["Ilo", "El Algarrobal", "Pacocha"],
  // Pasco
  Pasco: ["Chaupimarca", "Huachón", "Huariaca", "Huayllay", "Ninacaca", "Pallanchacra", "Paucartambo", "San Francisco de Asís de Yarusyacán", "Simón Bolívar", "Ticlacayán", "Tinyahuarco", "Vicco", "Yanacancha"],
  Oxapampa: ["Oxapampa", "Chontabamba", "Huancabamba", "Palcazú", "Pozuzo", "Puerto Bermúdez", "Villa Rica"],
  // Piura
  Piura: ["Piura", "Castilla", "Catacaos", "Cura Mori", "El Tallán", "La Arena", "La Unión", "Las Lomas", "Tambo Grande"],
  Sullana: ["Sullana", "Bellavista", "Ignacio Escudero", "Lancones", "Marcavelica", "Miguel Checa", "Querecotillo", "Salitral"],
  Talara: ["Pariñas", "El Alto", "La Brea", "Lobitos", "Los Órganos", "Máncora"],
  // Puno
  Puno: ["Puno", "Acora", "Amantaní", "Atuncolla", "Capachica", "Chucuito", "Coata", "Huata", "Mañazo", "Paucarcolla", "Pichacani", "Platería", "San Antonio", "Tiquillaca", "Vilque"],
  "San Román": ["Juliaca", "Cabana", "Cabanillas", "Caracoto"],
  // San Martín
  Moyobamba: ["Moyobamba", "Calzada", "Habana", "Jepelacio", "Soritor", "Yantaló"],
  "San Martín": ["Tarapoto", "Alberto Leveau", "Cacatachi", "Chazuta", "Chipurana", "El Porvenir", "Huimbayoc", "Juan Guerra", "La Banda de Shilcayo", "Morales", "Papaplaya", "San Antonio", "Sauce", "Shapaja"],
  Rioja: ["Rioja", "Awajún", "Elías Soplín Vargas", "Nueva Cajamarca", "Pardo Miguel", "Posic", "San Fernando", "Yorongos", "Yuracyacu"],
  // Tacna
  Tacna: ["Tacna", "Alto de la Alianza", "Calana", "Ciudad Nueva", "Coronel Gregorio Albarracín Lanchipa", "Inclán", "La Yarada-Los Palos", "Pachía", "Palca", "Pocollay", "Sama"],
  Tarata: ["Tarata", "Estique", "Estique Pampa", "Sitajara", "Susapaya", "Tarucachi", "Ticaco"],
  // Tumbes
  Tumbes: ["Tumbes", "Corrales", "La Cruz", "Pampas de Hospital", "San Jacinto", "San Juan de la Virgen"],
  Zarumilla: ["Zarumilla", "Aguas Verdes", "Matapalo", "Papayal"],
  // Ucayali
  "Coronel Portillo": ["Callería", "Campoverde", "Iparía", "Masisea", "Yarinacocha", "Nueva Requena", "Manantay"],
  Atalaya: ["Raymondi", "Sepahua", "Tahuania", "Yurúa"],
  "Padre Abad": ["Padre Abad", "Irazola", "Curimaná", "Neshuya", "Alexander von Humboldt"],
};

// Centro poblado mock per distrito
export const CENTROS_POBLADOS: Record<string, string[]> = {
  Lima: ["Centro Poblado Lima Cercado", "C.P. Manchay", "C.P. Huachipa"],
  Miraflores: ["C.P. Miraflores Centro", "C.P. Santa Cruz"],
  "La Molina": ["C.P. La Molina Vieja", "C.P. Musa", "C.P. Las Viñas"],
  Arequipa: ["C.P. Cercado Arequipa", "C.P. Cayma Alta"],
  Cusco: ["C.P. Wanchaq", "C.P. San Blas"],
  Trujillo: ["C.P. El Milagro", "C.P. Alto Trujillo"],
  Piura: ["C.P. Los Ejidos", "C.P. Narihuala"],
  Iquitos: ["C.P. Santo Tomás", "C.P. Rumococha"],
};

// Helper to get provinces for a department
export function getProvincias(dep: string): string[] {
  return PROVINCIAS[dep] ?? [];
}
export function getDistritos(prov: string): string[] {
  return DISTRITOS[prov] ?? [];
}
