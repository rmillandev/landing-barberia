# NAVA Barber Studio

Landing de demostración para ofrecer a barberías. Construida con React, Next.js y TypeScript.

## Qué incluye

- Servicios con precio y duración de ejemplo.
- Selector de servicio, estilo y momento preferido que prepara un mensaje de reserva por WhatsApp.
- Galería ilustrativa con filtros y vista ampliada.
- Diseño adaptable a móvil y escritorio.

## Ejecutar

Se requiere Node.js 20.9 o superior.

1. Instala dependencias: npm ci
2. Inicia el entorno local: npm run dev
3. Abre http://localhost:3000 en tu navegador.

Para comprobar el proyecto: npm run typecheck y npm run build.

## Adaptar para una barbería real

1. Añade el número en lib/site-config.ts, con código de país y solo dígitos. Mientras esté vacío, WhatsApp pedirá elegir un contacto.
2. Cambia nombre, textos, servicios y precios en app/page.tsx.
3. Sustituye las imágenes en public/images. La galería de la demo usa una imagen compuesta en cuatro cuadrantes; al colocar fotos reales conviene cambiar cada tarjeta para que use su propia imagen.
4. Reemplaza ubicación, horario y enlace de Instagram del pie de página.

Las imágenes, los precios y los tiempos actuales son ilustrativos; no representan trabajos ni tarifas de una barbería real.
