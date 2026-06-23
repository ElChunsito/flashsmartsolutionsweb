# Flash Smart Solutions - Web

Este proyecto contiene el sitio web de Flash Smart Solutions, diseÃ±ado con una estÃ©tica "Dark Tech" para una experiencia de usuario moderna y profesional.

## Estructura de Archivos

- `index.html`: Archivo principal con la estructura semÃ¡ntica y optimizaciÃ³n SEO Local (Meta tags, JSON-LD, encabezados optimizados).
- `styles.css`: Hoja de estilos principal que implementa el diseÃ±o Dark Tech, variables de color neÃ³n (`#0a0b10`, `#00d4ff`), y efectos de interacciÃ³n (hover, zoom, pulse).
- `script.js`: LÃ³gica de interactividad (menÃº hamburguesa, scroll spy, animaciones fade-in con Intersection Observer).
- `vercel.json`: Archivo de configuraciÃ³n para despliegue en Vercel, gestionando cabeceras de seguridad y cachÃ©.

## CÃ³mo desplegar en Vercel

1. Instala el CLI de Vercel (opcional): `npm i -g vercel`
2. En la terminal, dentro de esta carpeta, ejecuta: `vercel`
3. Sigue las instrucciones interactivas para enlazar el proyecto a tu cuenta.
4. El archivo `vercel.json` se encargarÃ¡ automÃ¡ticamente de aplicar las polÃ­ticas de cachÃ© para los assets estÃ¡ticos y las cabeceras de seguridad.

Alternativamente, puedes subir este repositorio a GitHub y conectarlo directamente en el panel de [Vercel](https://vercel.com/) para despliegues automÃ¡ticos en cada commit.

## OptimizaciÃ³n SEO Local

El proyecto estÃ¡ configurado para destacar en bÃºsquedas dentro de **Mar del Plata**, priorizando los tÃ©rminos: "soporte tÃ©cnico", "programador", "hacer web", "computaciÃ³n" y "soluciones tecnolÃ³gicas".

Para monitorear el trÃ¡fico, puedes integrar la propiedad en **Google Search Console** siguiendo los pasos de verificaciÃ³n mediante Google Analytics.

## Funcionalidades de Marca y Asistencia

### Logo con Rayo
El ícono del rayo (a-bolt) está implementado mediante FontAwesome. Si deseas cambiar el SVG o ícono, dirígete a index.html y reemplaza la clase a-bolt en el elemento <i class="fas fa-bolt logo-icon"></i>. Su color y animación de pulso se controlan en styles.css bajo la clase .logo-icon.

### Asistente Robótico Interactivo
El robot que viaja con el usuario está implementado con el contenedor #robot-assistant. Su estado reacciona a la posición del scroll de la página modificando el ícono dentro del globo de diálogo:
- **Inicio**: Saludo (a-hand-sparkles)
- **Servicios**: Lupa de análisis (a-search)
- **Nosotros**: Modo lectura/pensativo (a-book-reader)
- **Contacto**: Ícono de enviar (a-paper-plane)

Para modificar estos estados, ajusta las variables 
ewIconClass dentro del window.addEventListener('scroll') en el archivo script.js.

### Comportamiento del Asistente Robótico

#### Lógica del IntersectionObserver
El asistente utiliza la API \IntersectionObserver\ de JavaScript para detectar qué sección de la página está actualmente en el centro de la pantalla. Se configuró con un \ootMargin\ de \'-40% 0px -40% 0px'\, lo que significa que el área de detección es una banda horizontal muy estrecha en el centro de la ventana gráfica. Cuando una etiqueta \<section>\, \<header>\ o \<footer>\ entra en esta área, el observer dispara un evento y lee su \id\ para actualizar el ícono del robot.

#### Cómo agregar nuevos gestos en el futuro
Para agregar o modificar las reacciones del robot a otras secciones, debes:
1. Asegurarte de que la nueva sección en el HTML tenga un \id\ definido (por ejemplo, \<section id="mi-nueva-seccion">\).
2. Abrir el archivo \script.js\ y buscar la declaración del \obotObserver\.
3. Dentro del \if (currentSection === ...)\, agregar un bloque \else if\ con el ID de tu sección y asignarle una clase de FontAwesome a \
ewIconClass\.

Ejemplo:
\\\javascript
else if (currentSection === 'mi-nueva-seccion') {
    newIconClass = 'fas fa-cogs';
}
\\\`nEl script se encargará automáticamente de ejecutar la transición suave en el cambio de íconos.

### Navegación Visual del Asistente
El robot cuenta ahora con un panel de navegación flotante lateral (.robot-nav-menu) que se despliega al hacer clic sobre él.
Este panel integra 4 botones interactivos implementados mediante SVGs puros tipo 'Line Icons' (trazo fino, sin rellenos complejos), lo que garantiza un peso ultra ligero y escalabilidad infinita:
1. **Inicio:** SVG de casa minimalista (d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5...")
2. **Servicios:** SVG de cuadrícula/herramientas (<rect> x4)
3. **Nosotros:** SVG de usuarios y conexiones (<circle>, <path> múltiples)
4. **Contacto:** SVG de avión de papel/envío (<polygon>, <line>)

Todos comparten un marco estético controlado por CSS (ackdrop-filter: blur(10px)) para un look cristalizado y transparente. Al interactuar con ellos, JavaScript invoca el método nativo \scrollIntoView({behavior: 'smooth'})\ para desplazarse fluidamente hacia la sección deseada, ocultando la burbuja de saludo temporalmente durante la navegación.

### Sistema de Navegación Sincronizada

El asistente robótico emplea un sistema unificado de iconos (SVGs en formato 'Line Icons', trazado fino en color cian #00d4ff) configurados en un arreglo centralizado dentro de \script.js\ (\obotSectionsData\).

Este diseño garantiza que:
1. **Menú de navegación:** Los botones inyectados en \.robot-nav-menu\ derivan automáticamente de este arreglo.
2. **Indicador de estado:** La burbuja que flota sobre la cabeza del robot se sincroniza mostrando el mismo ícono de la sección actual (detectada por \IntersectionObserver\). La burbuja ahora tiene formato de píldora translúcida (\gba(0,0,0,0.5)\) con animación de aparición suave.

#### Añadir Nuevas Secciones
Para agregar una nueva sección al radar del asistente y a su menú interactivo:
1. Asegúrate de que exista una etiqueta \<section id="mi-nueva-seccion">\ en el HTML.
2. Abre \script.js\ y añade un nuevo objeto al array \obotSectionsData\: 
\\\javascript
{
    id: 'mi-nueva-seccion',
    label: 'Nueva',
    iconSvg: '<svg>...</svg>' // Tu SVG personalizado
}
\\\`nEl robot inyectará el nuevo botón y reaccionará a esta nueva sección automáticamente.

### Incidencias
- **[Resuelto]** Se detectó error de carga/renderizado tras cambios en el robot (las secciones con efecto fade-in dejaron de aparecer). Causa: Bloque de código huérfano y error de sintaxis en el archivo \script.js\ al intentar declarar el IntersectionObserver. Se procedió a la estabilización y limpieza del código. Los servicios y el robot asistente ahora cargan correctamente.
