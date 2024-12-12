document.addEventListener('DOMContentLoaded', () => {
    // Espera un tiempo antes de iniciar la animación
    setTimeout(() => {
        // Selecciona el logo y el contenedor del chatbot
        const logo = document.getElementById('logo');
        const chatContainer = document.getElementById('chat-container');

        // Añade clase para desvanecer el logo
        logo.classList.add('fade-out');

        // Después de que la animación de desvanecimiento termine
        setTimeout(() => {
            // Oculta el logo y muestra el chatbot
            logo.style.display = 'none';
            chatContainer.classList.remove('hidden');
        }, 1000); // Debe coincidir con el tiempo de la transición en CSS (1s)
    }, 1000); // Tiempo que el logo se muestra antes de desvanecerse (2s en este caso)


    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message');
    const sendButton = document.getElementById('send-button');
    const loadingBar = document.getElementById('loadingBar'); // Suponiendo que tienes un elemento para mostrar carga

    // Documentos precargados (tu corpus)
    const documents = [
        // SALUDO DEL BOT
        "Hola , soy SILSA BOT asistente y estoy entrenado para ayudarte",
        "HOLA , soy un SILSA BOT asistente y estoy entrenado para ayudarte ¿que necesitas?",

        // Información general
        "SILSA es una empresa de servicios generales especializados en limpieza, con más de 30 años de experiencia en el sector. Ofrecemos una amplia gama de servicios de limpieza, mantenimiento y desinfección a nivel nacional.",

        // Servicios ofrecidos
        "Los servicios que ofrecemos incluyen: desinfección de ambientes externos, lavado, desinfección y limpieza, limpieza de edificaciones externas, limpieza de ambientes hospitalarios, limpieza de ambientes educativos, y limpieza y pintado de altos.",

        // Personal capacitado
        "Contamos con más de 8 mil trabajadores altamente calificados, quienes reciben formación continua para garantizar un servicio de alta calidad.",

        // Limpieza de hospitales y clínicas
        "La limpieza de hospitales es crucial para evitar contagios. Implementamos procesos de limpieza, desinfección, sanitización y esterilización, adaptados a las categorías de riesgo: alto, medio y bajo.",

        // Limpieza de ambientes educativos
        "La limpieza en colegios y universidades se planifica de acuerdo a las necesidades de los usuarios. Realizamos tareas diarias, quincenales y mensuales para asegurar un ambiente limpio y seguro.",

        // Limpieza y pintado de fachadas
        "Nuestro servicio de limpieza y pintado de fachadas incluye limpiezas industriales en profundidad y mantenimiento de infraestructuras, garantizando una buena imagen para los edificios.",

        // Desinfección de ambientes
        "La desinfección de ambientes internos y externos previene la proliferación de gérmenes y bacterias, mejorando la salud y convivencia de los habitantes.",

        // Servicios complementarios
        "Ofrecemos servicios complementarios como jardinería, fumigación y operación de ascensores, asegurando un servicio integral a nuestros clientes.",

        // Clientes
        "Entre nuestros clientes se encuentran importantes empresas como Clínica San Felipe, EsSalud, UNICEF, y PepsiCo, lo que refleja la calidad de nuestro servicio.",

        // Identidad empresarial
        "Nuestra misión es cuidar lo que es tuyo, ofreciendo un servicio eficiente, innovador y sostenible, con un enfoque en la comodidad del cliente.",

        // Contacto y atención al cliente
        "Los horarios de atención son de lunes a viernes, de 8:15 am a 1:00 pm y de 2:00 pm a 5:00 pm. Puedes contactarnos a través del correo cap@silsa.com.pe o al teléfono 6144600.",

        // Historia de SILSA
        "SILSA inició sus operaciones en 1987 con aproximadamente 200 trabajadores y ha crecido significativamente, expandiendo sus servicios a nivel nacional desde 1992.",

        // Directorio y funcionarios
        "Nuestro directorio está conformado por profesionales expertos en el área, y contamos con un equipo multidisciplinario enfocado en la atención al cliente y la solución de problemas.",

        // Certificaciones
        "SILSA cuenta con certificaciones ISO 9001:2015, ISO 14001:2015 e ISO 45001:2015, lo que garantiza la calidad y seguridad de nuestros servicios.",

        // Mensaje de asistencia
        "Si necesitas más información sobre nuestros servicios, no dudes en preguntar. Estoy aquí para ayudarte con cualquier duda que tengas sobre SILSA.",

        // Proceso de atención al cliente
        "Nuestro proceso de atención al cliente es ágil y eficiente. Recibimos tus consultas y requerimientos a través de múltiples canales para ofrecerte una respuesta rápida.",

        // Valores de la empresa
        "En SILSA, valoramos la integridad, la calidad, la innovación y el compromiso con nuestros clientes y el medio ambiente.",

        // Tecnología utilizada
        "Utilizamos tecnología avanzada en nuestros procesos de limpieza para asegurar la máxima eficacia y eficiencia en cada servicio que ofrecemos.",

        // Seguridad laboral
        "La seguridad de nuestros trabajadores es una prioridad. Implementamos protocolos estrictos para garantizar un ambiente de trabajo seguro y saludable.",

        // Proyectos especiales
        "Realizamos proyectos especiales de limpieza y mantenimiento, adaptándonos a las necesidades específicas de cada cliente y situación.",

        // Evaluación de satisfacción
        "Realizamos encuestas de satisfacción periódicas para evaluar la calidad de nuestros servicios y mejorar continuamente.",

        // Responsabilidad social
        "SILSA se involucra en iniciativas de responsabilidad social, contribuyendo al bienestar de las comunidades donde operamos.",

        // Innovaciones recientes
        "Hemos implementado nuevas técnicas de limpieza ecológicas que minimizan el uso de productos químicos y reducen nuestro impacto ambiental.",

        // Capacitación continua
        "Ofrecemos capacitación continua a nuestro personal para mantener altos estándares de calidad y adaptarnos a las nuevas tendencias del sector.",

        // Sostenibilidad
        "Estamos comprometidos con la sostenibilidad, utilizando productos ecológicos y prácticas que minimizan el impacto ambiental.",

        // Atención personalizada
        "Brindamos atención personalizada a cada cliente, asegurando que sus necesidades específicas sean atendidas de manera efectiva.",

        // Innovación en servicios
        "Constantemente innovamos nuestros servicios para incluir las últimas tecnologías y métodos en limpieza y mantenimiento.",

        // Evaluación de riesgos
        "Realizamos evaluaciones de riesgos en cada proyecto para garantizar la seguridad de nuestros trabajadores y la eficacia de nuestros servicios.",

        // Protocolo COVID-19
        "Hemos implementado protocolos específicos de limpieza y desinfección para combatir la propagación del COVID-19 en todos nuestros servicios.",

        // Feedback del cliente
        "Valoramos el feedback de nuestros clientes y utilizamos sus comentarios para mejorar continuamente nuestros procesos y servicios.",

        // Alianzas estratégicas
        "Formamos alianzas estratégicas con proveedores de confianza para asegurar la calidad de los productos y servicios que ofrecemos.",

        // Responsabilidad ambiental
        "Promovemos prácticas de responsabilidad ambiental en todas nuestras operaciones, garantizando un futuro más sostenible para todos.",

        // Eventos y ferias
        "Participamos en eventos y ferias del sector para mantenernos actualizados sobre las mejores prácticas y tendencias del mercado.",

        // Documentos precargados adicionales

        // Innovaciones en gestión
        "Implementamos un sistema de gestión digitalizado que permite a nuestros clientes monitorear en tiempo real el progreso de los servicios contratados.",

        // Limpieza en espacios industriales
        "Ofrecemos servicios especializados de limpieza para fábricas, almacenes y plantas industriales, garantizando un entorno seguro y productivo.",

        // Atención a comunidades rurales
        "Extendemos nuestros servicios a comunidades rurales, adaptando nuestras soluciones a las necesidades específicas de estos entornos.",

        // Programa de reciclaje
        "Contamos con un programa de reciclaje integrado en nuestros servicios, promoviendo la separación y manejo adecuado de residuos.",

        // Limpieza de áreas deportivas
        "Realizamos limpieza y mantenimiento de áreas deportivas como gimnasios, piscinas y estadios, asegurando espacios higiénicos para los usuarios.",

        // Capacidades tecnológicas
        "Utilizamos drones para inspeccionar y planificar la limpieza de grandes infraestructuras, mejorando la eficiencia de nuestras operaciones.",

        // Enfoque en bienestar animal
        "Ofrecemos servicios de limpieza especializados para clínicas veterinarias, granjas y refugios, cuidando del bienestar animal.",

        // Protocolos personalizados
        "Adaptamos nuestros protocolos de limpieza a los requerimientos específicos de cada cliente, garantizando resultados óptimos en cada proyecto.",

        // Innovación en maquinaria
        "Disponemos de maquinaria avanzada, como aspiradoras industriales y robots de limpieza, para cubrir grandes áreas de manera eficiente.",

        // Mantenimiento preventivo
        "Ofrecemos servicios de mantenimiento preventivo para prolongar la vida útil de instalaciones y equipos, reduciendo costos futuros.",

        // Reconocimientos y premios
        "Hemos sido reconocidos con premios a la excelencia en servicios de limpieza, destacándonos por nuestra calidad y responsabilidad ambiental.",

        // Atención a emergencias
        "Disponemos de equipos de respuesta rápida para atender emergencias de limpieza, como derrames químicos o inundaciones.",

        // Servicios para ferias y eventos
        "Brindamos servicios de limpieza antes, durante y después de eventos masivos, asegurando espacios impecables para los asistentes.",

        // Consultoría en limpieza
        "Ofrecemos consultoría para empresas que desean optimizar sus procesos de limpieza y mantenimiento, implementando mejores prácticas.",

        // Satisfacción garantizada
        "Contamos con políticas de satisfacción garantizada, asegurándonos de que nuestros clientes reciban exactamente lo que necesitan.",

        // Estadísticas de rendimiento
        "Monitoreamos constantemente nuestras operaciones para generar estadísticas que respaldan nuestra eficiencia y efectividad.",

        // Servicios para la tercera edad
        "Ofrecemos servicios personalizados para residencias de la tercera edad, con un enfoque especial en la comodidad y seguridad de los usuarios.",

        // Colaboraciones internacionales
        "Colaboramos con empresas internacionales para importar tecnología y productos de limpieza de última generación",

        // Adaptación al clima
        "Adaptamos nuestras técnicas y productos según las condiciones climáticas, asegurando resultados efectivos en cualquier estación",

        // Monitoreo de calidad
        "Realizamos auditorías internas frecuentes para garantizar la calidad de nuestros servicios en todos los niveles",

        // Detalle de contacto

        // Sede central
        "Sede Central: Calle Los Negocios 336, Surquillo",

        // Almacén central
        "Almacén Central: Calle Los Negocios 403, Surquillo",

        // Atención al cliente
        "Atención al Cliente: Teléfono 6144600, Anexo 601",

        // Correo de captación
        "Correo de Captación: captacion@silsa.com.pe",

        // Correo de licitaciones
        "Correo de Licitaciones: licitaciones@silsa.com.pe",

        // Correo para denuncias
        "Correo para Denuncias: denuncias@silsa.com.pe",

        // Información adicional

        // Horas laborables
        "Horas Laborables: Lunes a viernes de 8:15 A.M a 5:15 P.M",

        // Buzón de sugerencias
        "Buzón de Sugerencias: Disponible para recibir tus comentarios y propuestas",

        // Responsabilidad social
        "Responsabilidad Social: Nos comprometemos con el bienestar de las comunidades donde operamos",

        // Horario de atención - Mesa de partes
        "Horario de Atención - Mesa de Partes: Lunes a viernes de 8:15 A.M a 5:15 P.M",
        // Clientes

        // Página de clientes
        "Silsa cuenta con los más prestigiosos clientes a nivel nacional, debido a la calidad de sus servicios en cada uno de sus centros laborales",

        // Información sobre el personal
        "Silsa cuenta con un personal altamente competitivo, capacitado en los rubros de limpieza, mantenimiento, y más",

        // Clientes destacados
        "Entre nuestros clientes se encuentran: Clínica San Felipe, EsSalud, Hiraoka, Epson, Comunidad Andina, UNICEF, Ministerio de Salud, entre otros",

        // Horario de atención

        // Horario de atención - Mesa de Partes y Oficina
        "Horario de Atención de Mesa de Partes y Oficina: Lunes a Viernes.",

        // hora de atencion
        "El horario de atencion es desde 8:15 A.M hasta 1:00 P.M o en las tardes a partir de las 2:00 P.M hasta 5:00 P.M",
        // Servicios de SILSA

        // Descripción de SILSA
        "SILSA significa Servicios Integrados de Limpieza Sociedad Anónima, se especializa en ofrecer soluciones integrales de limpieza, mantenimiento y desinfección, adaptadas a las necesidades de empresas e instituciones de todo el país,",

        // Compromiso con la calidad
        "Nos enfocamos en brindar un servicio de alta calidad, eficiente y responsable, garantizando la satisfacción total de nuestros clientes mediante un equipo de trabajo altamente capacitado y procesos de limpieza innovadores,",

        // Compromiso con el cliente
        "Nos dedicamos a la completa satisfacción de nuestros clientes, buscando establecer relaciones a largo plazo. Contamos con un equipo de profesionales altamente calificados y materiales de primera calidad para garantizar resultados óptimos,",

        // Enfoque en la limpieza
        "Somos expertos en limpieza, ofreciendo soluciones personalizadas para la conservación, protección y mantenimiento de instalaciones. Nuestro personal evalúa las necesidades de cada cliente y diseña servicios a medida para asegurar un nivel óptimo de limpieza e higiene,",

        // Servicios ofrecidos
        "Entre nuestros servicios se incluyen: limpieza para oficinas y corporativos, limpieza de vidrios de altura, jardinería, fumigación, y más, todos respaldados por personal capacitado y equipos especializados,",

        // Por qué trabajamos todos los días
        "Trabajamos todos los días con el propósito de cuidar lo que es tuyo, apoyando a nuestros clientes a mantener una imagen impecable y un ambiente limpio en sus áreas de trabajo,",

        // Razón de preferencia de los clientes
        "Nuestros clientes nos eligen por la calidad de servicio, nuestra experiencia de más de 30 años y nuestro enfoque en planes de trabajo detallados, supervisión constante y resultados extraordinarios entregados siempre a tiempo,",

        // Nuestra esencia y valores
        "En SILSA, nos motivamos por brindar un servicio eficiente, innovador y sostenible. Nos aseguramos de que nuestros clientes siempre cuenten con instalaciones limpias y seguras para su personal y visitantes. Nos enfocamos en la sostenibilidad, la eficiencia y la innovación en cada uno de nuestros servicios,",

        // Nuestros Servicios

        // Desinfección de ambientes externos
        "Desinfección de ambientes externos: Servicios especializados para desinfectar áreas exteriores, asegurando un entorno seguro y libre de contaminantes.",

        // Lavado, desinfección y limpieza
        "Limpieza y desinfección integral: Ofrecemos servicios de lavado y desinfección para mantener espacios impecables y saludables, aplicando las mejores técnicas y materiales.",

        // Limpieza de edificaciones externas
        "Limpieza de edificaciones externas: Brindamos soluciones para mantener las fachadas de los edificios limpias y en excelente estado, eliminando suciedad y contaminantes externos.",

        // Limpieza de ambientes hospitalarios
        "Limpieza de ambientes hospitalarios: Realizamos limpieza especializada en hospitales y clínicas, garantizando estándares de higiene rigurosos para proteger la salud de pacientes y personal médico.",

        // Limpieza de ambientes educativos
        "Limpieza de ambientes educativos: Ofrecemos servicios de limpieza para colegios y universidades, creando un ambiente limpio y seguro para estudiantes y docentes.",

        // Limpieza y pintado de altos
        "Limpieza y pintado de altos: Servicios de limpieza y pintura para áreas de difícil acceso, asegurando tanto la estética como la higiene de estas zonas.",

        // Misión
        "Misión: Brindar a nuestros clientes servicios de manera oportuna, responsable y eficiente, asegurando su satisfacción y contribuyendo a un entorno limpio y seguro.",

        // Visión
        "Visión: Ser la empresa líder en servicios de limpieza, higiene hospitalaria y mantenimiento a nivel nacional, reconocida por la calidad, eficiencia e innovación en cada uno de nuestros servicios.",

        // Certificaciones
        "Certificaciones de silsa son: ISO 9001: 2015, ISO 14001: 2015, ISO 45001: 2015.",
        // Certificaciones
        "Certificaciones: SILSA ha alcanzado estándares internacionales en la gestión de calidad, medio ambiente y seguridad ocupacional. A continuación, las certificaciones obtenidas:",
        "ISO 9001:2015: Sistema de Gestión de Calidad ,Esta certificación garantiza que los servicios de SILSA cumplen con los más altos estándares de calidad, satisfaciendo las necesidades del cliente de manera eficiente y consistente.",
        "ISO 14001:2015: Sistema de Gestión Ambiental, Refleja el compromiso de SILSA con la gestión ambiental responsable, minimizando el impacto ecológico de sus operaciones y promoviendo prácticas sostenibles.",
        "ISO 45001:2015: Sistema de Gestión de Seguridad y Salud en el Trabajo , Asegura que SILSA implementa medidas efectivas para proteger la salud y seguridad de sus empleados, garantizando un entorno laboral seguro y saludable.",
    ];


    const handleFarewellAndFeedback = (message) => {
        const farewellKeywords = ['gracias', 'adiós', 'hasta luego', 'bueno', 'perfecto'];
        const feedbackKeywords = ['mejorar', 'sugerencia', 'opinión', 'ayuda'];

        for (const keyword of farewellKeywords) {
            if (message.toLowerCase().includes(keyword)) {
                return "¡Gracias a ti! Si necesitas más información, no dudes en preguntar.";
            }
        }

        for (const keyword of feedbackKeywords) {
            if (message.toLowerCase().includes(keyword)) {
                return "Aprecio tu comentario y trabajaré para mejorar.";
            }
        }

        return null;
    };

    const detectKeywords = (message) => {
        const keywords = [
            { keyword: 'servicios de limpieza', response: "Ofrecemos una amplia gama de servicios de limpieza, mantenimiento y desinfección. ¿Te gustaría saber más sobre alguno en particular?" },
            { keyword: 'precio', response: "Nuestros precios varían según el servicio solicitado. ¿Te gustaría recibir un presupuesto específico?" },
            { keyword: 'horarios de atención', response: "Nuestros horarios de atención son de lunes a viernes, de 8:15 am hasta 1:00 pm y de 2:00 pm a 5:00 pm." },
            { keyword: 'horario de atencion en la mañana', response: "Atendemos en la mañana de 8:15 am a 1:00 pm, de lunes a viernes." },
            { keyword: 'horario de atencion en la tarde', response: "En la tarde, nuestros horarios son de 2:00 pm a 5:00 pm, de lunes a viernes." },
            { keyword: 'horario de atencion de la mañana', response: "Atendemos en la mañana de 8:15 am a 1:00 pm, de lunes a viernes." },
            { keyword: 'horario de atencion de la tarde', response: "En la tarde, nuestros horarios son de 2:00 pm a 5:00 pm, de lunes a viernes." },
            { keyword: 'horario de mañana', response: "Atendemos en la mañana de 8:15 am a 1:00 pm, de lunes a viernes." },
            { keyword: 'horario de tarde', response: "En la tarde, nuestros horarios son de 2:00 pm a 5:00 pm, de lunes a viernes." },
            { keyword: 'limpieza', response: "Ofrecemos una amplia gama de servicios de limpieza, mantenimiento y desinfección a nivel nacional." },
            { keyword: 'desinfección', response: "La desinfección de ambientes internos y externos previene la proliferación de gérmenes y bacterias." },
            { keyword: 'hospitales', response: "La limpieza de hospitales es crucial para evitar contagios y garantizar la salud de los pacientes." },
            { keyword: 'educativos', response: "Realizamos limpieza en colegios y universidades para asegurar un ambiente limpio y seguro." },
            { keyword: 'servicios', response: "Nuestros servicios incluyen limpieza, mantenimiento, desinfección y más." },
            { keyword: 'precio', response: "Nuestros precios varían según el servicio solicitado. ¿Te gustaría recibir un presupuesto específico?" },
            { keyword: 'satisfacción', response: "Valoramos el feedback de nuestros clientes y utilizamos sus comentarios para mejorar continuamente." },
            { keyword: 'certificaciones', response: "SILSA cuenta con certificaciones ISO 9001:2015, ISO 14001:2015 e ISO 45001:2015." },
            { keyword: 'contacto', response: "Puedes contactarnos a través del correo cap@silsa.com.pe o al teléfono 6144600." },
            { keyword: 'mision', response: "Brindar a nuestros clientes servicios de manera oportuna, responsable y eficiente." },
            { keyword: 'misión', response: "Brindar a nuestros clientes servicios de manera oportuna, responsable y eficiente." },
            { keyword: 'vision', response: "Ser la empresa líder en servicios de limpieza,higiene hospitalaria y mantenimiento a Nivel Nacional." },
            { keyword: 'visión', response: "Ser la empresa líder en servicios de limpieza,higiene hospitalaria y mantenimiento a Nivel Nacional." },

        ];

        for (const { keyword, response } of keywords) {
            if (message.toLowerCase().includes(keyword)) {
                return response;
            }
        }
        return null;
    };


    //horario de atencion dicccionario
    const connectors = {
        "horario": ["horario", "horarios", "tiempo de atención", "tiempo"],
        "mañana": ["mañana", "matutino", "en la mañana"],
        "tarde": ["tarde", "vespertino", "en la tarde"],
        "atención": ["atención", "servicio", "disponibilidad"]
    };

    const detectContext = (message) => {
        const lowerMessage = message.toLowerCase();
        let isMorning = false;
        let isAfternoon = false;

        // Verificar si se menciona "mañana" o "tarde"
        for (const [key, synonyms] of Object.entries(connectors)) {
            for (const synonym of synonyms) {
                if (lowerMessage.includes(synonym)) {
                    if (key === "mañana") isMorning = true;
                    if (key === "tarde") isAfternoon = true;
                }
            }
        }

        // Responder en función de las combinaciones detectadas
        if (isMorning && isAfternoon) {
            return "Nuestros horarios de atención son de lunes a viernes, de 8:15 am a 1:00 pm y de 2:00 pm a 5:00 pm.";
        } else if (isMorning) {
            return "Atendemos en la mañana de 8:15 am a 1:00 pm, de lunes a viernes.";
        } else if (isAfternoon) {
            return "En la tarde, nuestros horarios son de 2:00 pm a 5:00 pm, de lunes a viernes.";
        }

        return null; // Sin coincidencias
    };

    //ofrecer servicios
    const offerServices = (message) => {
        const servicesKeywords = ['servicios', 'comprar', 'precio', 'cotización', 'información', 'detalles', 'paquetes', 'opciones', 'tipos de servicio', 'disponibilidad', 'planes', 'ofertas', 'plan', 'promoción', 'asistencia'];

        for (const keyword of servicesKeywords) {
            if (message.toLowerCase().includes(keyword)) {
                return "Perfecto puedes comunicarte a este numero para procesar y obtener informacion de la compra Teléfono de Ventas: 6144620";
            }
        }
        return null;
    };


    const inquireNeeds = (message) => {
        const needsKeywords = ['necesito', 'requiere', 'busco', 'quiero', 'estoy buscando', 'me gustaría', 'deseo', 'necesito saber', 'quiero saber', 'me interesa', 'estoy interesado en', 'cómo puedo', 'cómo obtener', 'quisiera', 'me gustaría obtener'];

        for (const keyword of needsKeywords) {
            if (message.toLowerCase().includes(keyword)) {
                return "Entiendo que tienes necesidades específicas. ¿Podrías darme más detalles sobre lo que buscas?";
            }
        }
        return null;
    };


    const provideQuote = (message) => {
        const quoteKeywords = ['cotización', 'precio', 'costos', 'valor', 'tarifa', 'cuánto cuesta', 'cuál es el precio', 'precio total', 'costo total', 'precio estimado', 'presupuesto', 'presupuesto estimado', 'precio unitario', 'precio final', 'tarifa estimada', 'oferta', 'precio de venta', 'descuento', 'precio por unidad', 'precio de compra', 'costo por unidad', 'cuánto es', 'presupuesto por producto', 'costo de servicio', 'detalles de precio', 'costo adicional', 'precio actualizado'];

        for (const keyword of quoteKeywords) {
            if (message.toLowerCase().includes(keyword)) {
                return "Para proporcionarte una cotización, necesito saber más sobre los servicios que requieres. ¿Qué tipo de limpieza necesitas?";
            }
        }
        return null;
    };

    const confirmPurchase = (message) => {
        const confirmationKeywords = ['SI', 'si deseo su servicio', 'quiero comprar uno de sus servicios', ' si quiero comprar ', 'sí', ' si por favor ', 'si quiero', 'si deseo comprar', 'quiero', 'comprar', 'claro', 'por supuesto', 'acepto', 'confirmo', 'me interesa', 'de acuerdo', 'estoy listo', 'adelante', 'sí, por favor', 'es correcto', 'estoy de acuerdo', 'perfecto', 'lo compro', 'me gustaría comprar', 'espero comprar', 'compra confirmada'];

        for (const keyword of confirmationKeywords) {
            if (message.toLowerCase().includes(keyword)) {
                return "¡Genial! te redigiré con nuestro personal de atención al cliente. Puede llamar a este numero de Teléfono Ventas: 6144620";
            }
        }
        return null;
    };

    // Función para Mostrar Servicios Destacados
    const showFeaturedServices = () => {
        return "Actualmente, nuestros servicios más destacados incluyen: \n1. Desinfección de ambientes.\n2. Limpieza de hospitales.\n3. Mantenimiento preventivo.\n¿Te gustaría saber más sobre alguno de ellos?";
    };

    // Función para Recopilar Comentarios
    const collectFeedback = (message) => {
        const feedbackKeywords = ['comentario', 'retroalimentación', 'opinión', 'sugerencia'];

        for (const keyword of feedbackKeywords) {
            if (message.toLowerCase().includes(keyword)) {
                return "Agradecemos tus comentarios. ¿Qué sugerencias o comentarios tienes para nosotros?";
            }
        }
        return null;
    };

    //Fx contacto
    const provideContactInfo = () => {
        return "Puedes contactarnos a través del correo cap@silsa.com.pe o al teléfono 6144600 para más información.";
    };

    // FX promociones
    const offerPromotions = () => {
        return "¡No te pierdas nuestras promociones! Actualmente, ofrecemos un 10% de descuento en servicios de limpieza de oficinas. ¿Te gustaría aprovechar esta oferta?";
    };

    //FX preguntas frecuentes
    const handleFAQs = (message) => {
        const faqKeywords = ['pregunta frecuente', 'faq', 'duda', 'pregunta'];

        for (const keyword of faqKeywords) {
            if (message.toLowerCase().includes(keyword)) {
                return "Aquí tienes algunas preguntas frecuentes: \n1. ¿Cuáles son tus horarios de atención?\n2. ¿Qué servicios ofrecen?\n3. ¿Cómo puedo solicitar un presupuesto?";
            }
        }
        return null;
    };

    // Función para enviar el mensaje y obtener respuesta de la API
    const sendMessage = () => {
        const userMessage = messageInput.value.trim();
        if (userMessage) {
            // Crear y agregar el mensaje del usuario al chat
            const userMessageElement = document.createElement('div');
            userMessageElement.className = 'message user-message';
            userMessageElement.textContent = userMessage;
            chatBox.appendChild(userMessageElement);

            // Limpiar el input
            messageInput.value = '';

            // Mostrar barra de carga (si tienes alguna visualización)
            loadingBar.style.display = 'block';

            // Detectar palabras clave para servicios
            const keywordResponse = detectKeywords(userMessage);
            if (keywordResponse) {
                const botMessageElement = document.createElement('div');
                botMessageElement.className = 'message bot-message';
                botMessageElement.textContent = keywordResponse;
                chatBox.appendChild(botMessageElement);
                chatBox.scrollTop = chatBox.scrollHeight;
                loadingBar.remove();
                return;
            }

            // Manejar despedidas y retroalimentación
            const farewellResponse = handleFarewellAndFeedback(userMessage);
            if (farewellResponse) {
                const botMessageElement = document.createElement('div');
                botMessageElement.className = 'message bot-message';
                botMessageElement.textContent = farewellResponse;
                chatBox.appendChild(botMessageElement);
                chatBox.scrollTop = chatBox.scrollHeight;
                loadingBar.remove();
                return;
            }

            // Ofrecer servicios
            const serviceResponse = offerServices(userMessage);
            if (serviceResponse) {
                const botMessageElement = document.createElement('div');
                botMessageElement.className = 'message bot-message';
                botMessageElement.textContent = serviceResponse;
                chatBox.appendChild(botMessageElement);
                chatBox.scrollTop = chatBox.scrollHeight;
                loadingBar.remove();
                return;
            }

            // Consultar necesidades
            const needsResponse = inquireNeeds(userMessage);
            if (needsResponse) {
                const botMessageElement = document.createElement('div');
                botMessageElement.className = 'message bot-message';
                botMessageElement.textContent = needsResponse;
                chatBox.appendChild(botMessageElement);
                chatBox.scrollTop = chatBox.scrollHeight;
                loadingBar.remove();
                return;
            }

            // Proporcionar cotización
            const quoteResponse = provideQuote(userMessage);
            if (quoteResponse) {
                const botMessageElement = document.createElement('div');
                botMessageElement.className = 'message bot-message';
                botMessageElement.textContent = quoteResponse;
                chatBox.appendChild(botMessageElement);
                chatBox.scrollTop = chatBox.scrollHeight;
                loadingBar.remove();
                return;
            }

            // Confirmar compra
            const confirmResponse = confirmPurchase(userMessage);
            if (confirmResponse) {
                const botMessageElement = document.createElement('div');
                botMessageElement.className = 'message bot-message';
                botMessageElement.textContent = confirmResponse;
                chatBox.appendChild(botMessageElement);
                chatBox.scrollTop = chatBox.scrollHeight;
                loadingBar.remove();
                return;
            }

            // Mostrar servicios destacados
            const featuredResponse = showFeaturedServices();
            if (userMessage.toLowerCase().includes('servicios destacados')) {
                const botMessageElement = document.createElement('div');
                botMessageElement.className = 'message bot-message';
                botMessageElement.textContent = featuredResponse;
                chatBox.appendChild(botMessageElement);
                chatBox.scrollTop = chatBox.scrollHeight;   
                loadingBar.remove();
                return;
            }

            // Recopilar comentarios
            const feedbackResponse = collectFeedback(userMessage);
            if (feedbackResponse) {
                const botMessageElement = document.createElement('div');
                botMessageElement.className = 'message bot-message';
                botMessageElement.textContent = feedbackResponse;
                chatBox.appendChild(botMessageElement);
                chatBox.scrollTop = chatBox.scrollHeight;
                loadingBar.remove();
                return;
            }

            // Proporcionar información de contacto
            if (userMessage.toLowerCase().includes('contacto')) {
                const botMessageElement = document.createElement('div');
                botMessageElement.className = 'message bot-message';
                botMessageElement.textContent = provideContactInfo();
                chatBox.appendChild(botMessageElement);
                chatBox.scrollTop = chatBox.scrollHeight;
                loadingBar.remove();
                return;
            }

            // Ofrecer promociones
            if (userMessage.toLowerCase().includes('promoción')) {
                const botMessageElement = document.createElement('div');
                botMessageElement.className = 'message bot-message';
                botMessageElement.textContent = offerPromotions();
                chatBox.appendChild(botMessageElement);
                chatBox.scrollTop = chatBox.scrollHeight;
                loadingBar.remove();
                return;
            }

            // Manejar preguntas frecuentes
            const faqResponse = handleFAQs(userMessage);
            if (faqResponse) {
                const botMessageElement = document.createElement('div');
                botMessageElement.className = 'message bot-message';
                botMessageElement.textContent = faqResponse;
                chatBox.appendChild(botMessageElement);
                chatBox.scrollTop = chatBox.scrollHeight;
                loadingBar.remove();
                return;
            }

            // Detectar contexto para horarios
            const contextResponse = detectContext(userMessage);
            if (contextResponse) {
                const botMessageElement = document.createElement('div');
                botMessageElement.className = 'message bot-message';
                botMessageElement.textContent = contextResponse;
                chatBox.appendChild(botMessageElement);
                chatBox.scrollTop = chatBox.scrollHeight;
                loadingBar.remove();
                return;
            }
            // Concatenar los documentos del corpus
            const context = documents.join(' ');

            // Configuración de la API de Hugging Face (o tu propia API)
            const API_URL = 'https://api-inference.huggingface.co/models/mrm8488/bert-base-spanish-wwm-cased-finetuned-spa-squad2-es';
            const API_KEY = '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';

            // Llamada a la API
            fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: {
                        question: userMessage,
                        context: context
                    }
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {

                    console.log('Respuesta del bot (respuesta):', data.answer); // Ver la respuesta del bot
                    console.log('Puntaje de satisfacción (score):', data.score); // Ver el puntaje de satisfacción

                    // Eliminar barra de carga
                    loadingBar.remove();

                    // Crear y agregar el mensaje del bot
                    const botMessageElement = document.createElement('div');
                    botMessageElement.className = 'message bot-message';
                    botMessageElement.textContent = data.answer || 'No se pudo generar una respuesta.';
                    chatBox.appendChild(botMessageElement);

                    // Añadir el nivel de satisfacción basado en 'score'
                    if (data.score !== undefined) {
                        const satisfactionSpan = document.createElement('span');
                        satisfactionSpan.style.fontSize = '0.8em';  // Tamaño más pequeño
                        satisfactionSpan.style.display = 'block';   // Bloque separado
                        satisfactionSpan.style.fontStyle = 'italic';  // Cursiva

                        if (data.score >= 0.04) {
                            satisfactionSpan.textContent = 'Nivel de la respuesta alto';
                            satisfactionSpan.style.color = 'cyan';  // Color para alto nivel
                        } else if (data.score >= 0.009 && data.score < 0.039) {
                            satisfactionSpan.textContent = 'Nivel de la respuesta medio';
                            satisfactionSpan.style.color = 'black';  // Color para nivel medio
                        } else {
                            botMessageElement.textContent = 'No logré comprender bien tu pregunta. Por favor, intenta formularla nuevamente.';
                            //satisfactionSpan.textContent = 'Nivel de la respuesta bajo';
                            botMessageElement.style.color = 'red';  // Color para bajo nivel
                            // Aplicar clase para luz neón baja
                            //botMessageElement.classList.add('low-satisfaction');
                            // Añadir el nivel de satisfacción al mensaje del bot
                            botMessageElement.appendChild(satisfactionSpan);
                        }

                        // Añadir el nivel de satisfacción al mensaje del bot
                        botMessageElement.appendChild(satisfactionSpan);
                    }
                    else {
                        botMessageElement.textContent = 'No se pudo generar una respuesta.';
                    }
                    chatBox.appendChild(botMessageElement);
                    chatBox.scrollTop = chatBox.scrollHeight;
                    loadingBar.remove();  // Eliminar la barra de carga cuando termine la respuesta

                })
                .catch(error => {
                    console.error('Error:', error);

                    // Crear y agregar el mensaje de error
                    const botMessageElement = document.createElement('div');
                    botMessageElement.className = 'message bot-message';
                    botMessageElement.textContent = 'Hubo un problema al procesar tu solicitud.';
                    chatBox.appendChild(botMessageElement);

                    // Ocultar barra de carga
                    loadingBar.style.display = 'none';

                    // Scroll al final del chat
                    chatBox.scrollTop = chatBox.scrollHeight;
                });

            // Scroll al final del chat
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    };

    // Evento de clic en el botón de enviar
    sendButton.addEventListener('click', sendMessage);

    // Enviar mensaje al presionar Enter
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
});
