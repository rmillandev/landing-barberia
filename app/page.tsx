"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Camera, Check, ChevronLeft, ChevronRight, Clock3, MapPin, Menu, MessageCircle, Scissors, Sparkles, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type ServiceId = "corte" | "barba" | "combo";
type GalleryCategory = "Todos" | "Cortes" | "Barba";

const services: { id: ServiceId; number: string; title: string; description: string; duration: string; price: string }[] = [
  { id: "corte", number: "01", title: "Corte de autor", description: "Un corte pensado para tu rostro, tu textura y la forma en que te gusta llevarlo.", duration: "45 min", price: "$35.000" },
  { id: "barba", number: "02", title: "Barba al detalle", description: "Perfilado preciso y acabado limpio para darle carácter a cada ángulo.", duration: "30 min", price: "$25.000" },
  { id: "combo", number: "03", title: "Ritual completo", description: "Corte y barba en una sola experiencia, con tiempo para hacerlo bien.", duration: "75 min", price: "$55.000" },
];
const styleOptions: Record<ServiceId, string[]> = {
  corte: ["Taper fade", "Clásico", "Buzz cut", "Aún no lo sé"],
  barba: ["Perfilado", "Barba corta", "Afeitado", "Aún no lo sé"],
  combo: ["Taper + barba", "Clásico + barba", "Buzz + perfilado", "Aún no lo sé"],
};
const gallery = [
  { title: "Taper con textura", detail: "Volumen natural arriba, degradado sutil a los lados.", category: "Cortes" as const, position: "0% 0%" },
  { title: "Clásico renovado", detail: "Raya definida y barba trabajada con precisión.", category: "Barba" as const, position: "100% 0%" },
  { title: "Buzz con actitud", detail: "Líneas limpias y una silueta que habla por sí sola.", category: "Cortes" as const, position: "0% 100%" },
  { title: "Fade contemporáneo", detail: "Transición suave y acabado pulido en cada perfil.", category: "Cortes" as const, position: "100% 100%" },
];

function whatsappUrl(message: string) {
  const text = encodeURIComponent(message);
  return siteConfig.whatsappNumber
    ? "https://wa.me/" + siteConfig.whatsappNumber + "?text=" + text
    : "https://api.whatsapp.com/send?text=" + text;
}
function IconMark() {
  return <span className="brand-mark" aria-hidden="true"><Scissors size={22} strokeWidth={1.45} /></span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [service, setService] = useState<ServiceId>("corte");
  const [style, setStyle] = useState("Taper fade");
  const [preferredDay, setPreferredDay] = useState("Esta semana");
  const [preferredTime, setPreferredTime] = useState("Tarde");
  const [filter, setFilter] = useState<GalleryCategory>("Todos");
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const isLightboxOpen = activeImage !== null;

  useEffect(() => {
    if (!isLightboxOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lightboxCloseRef.current?.focus();
    function handleLightboxKeys(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key !== "Tab") return;
      const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>(".lightbox button"));
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
    window.addEventListener("keydown", handleLightboxKeys);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", handleLightboxKeys); previousFocus?.focus(); };
  }, [isLightboxOpen]);

  const selectedService = services.find((item) => item.id === service)!;
  const reservationMessage = "Hola, quiero consultar disponibilidad para " + selectedService.title.toLowerCase() + ".\nEstilo: " + style + ".\nMe queda bien: " + preferredDay.toLowerCase() + ", en la " + preferredTime.toLowerCase() + ".\n¿Tienen un horario disponible?";
  const visibleGallery = gallery.map((item, index) => ({ ...item, index })).filter((item) => filter === "Todos" || item.category === filter);
  function chooseService(id: ServiceId) { setService(id); setStyle(styleOptions[id][0]); }

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <div className="announcement"><span>ESTUDIO NAVA</span><span className="announcement-divider" /> Un buen corte cambia el día.</div>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Nava Barber Studio, ir al inicio"><IconMark /><span>NAVA<span className="brand-sub">BARBER STUDIO</span></span></a>
        <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Navegación principal">
          <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
          <a href="#estilo" onClick={() => setMenuOpen(false)}>Encuentra tu estilo</a>
          <a href="#galeria" onClick={() => setMenuOpen(false)}>Galería</a>
          <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
        </nav>
        <a className="header-cta" href="#estilo">Reservar cita <ArrowUpRight size={16} /></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main id="contenido">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-photo" role="img" aria-label="Barbero dando los últimos retoques a un corte de cabello" />
          <div className="hero-shade" />
          <div className="hero-content container">
            <div className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> EL ARTE DE VERTE BIEN</div>
            <h1 id="hero-title">Tu estilo.<br /><em>Tu sello.</em></h1>
            <p>Más que un corte: una pausa para salir con otra actitud. Encuentra el look que va contigo y reserva en minutos.</p>
            <div className="hero-actions">
              <a className="button button-gold" href="#estilo">Encuentra tu corte <ArrowUpRight size={18} /></a>
              <a className="button button-outline" href="#galeria">Ver resultados <ArrowRight size={18} /></a>
            </div>
            <div className="hero-bottom"><span>DETALLES QUE HACEN LA DIFERENCIA</span><a href="#servicios" aria-label="Bajar a servicios"><ArrowDown size={19} /></a></div>
          </div>
          <div className="hero-vertical">PRECISIÓN · CARÁCTER · ESTILO</div>
        </section>

        <section className="intro-band" aria-label="Nuestra forma de trabajar"><div className="container intro-band-inner"><span>UN ESPACIO PARA SER TÚ</span><span className="intro-star">✳</span><span>EL DETALLE LO CAMBIA TODO</span><span className="intro-star">✳</span><span>SIÉNTATE. RENUEVA. SAL.</span></div></section>

        <section className="section services-section" id="servicios" aria-labelledby="services-title"><div className="container">
          <div className="section-top"><div><span className="eyebrow dark-eyebrow">01 / LO QUE HACEMOS</span><h2 id="services-title">Un servicio para<br /><em>cada versión de ti.</em></h2></div><p>Lo esencial, hecho con intención. Elige cómo quieres verte y déjanos cuidar cada detalle.</p></div>
          <div className="service-grid">{services.map((item) => <article className="service-card" key={item.id}>
            <div className="service-card-top"><span>{item.number} / SERVICIO</span><Scissors size={26} strokeWidth={1.25} /></div>
            <div className="service-card-content"><h3>{item.title}</h3><p>{item.description}</p></div>
            <div className="service-card-bottom"><span><Clock3 size={15} /> {item.duration}</span><strong>Desde {item.price}</strong></div>
            <button type="button" className="service-link" onClick={() => { chooseService(item.id); document.getElementById("estilo")?.scrollIntoView({ behavior: "smooth" }); }}>Elegir servicio <ArrowUpRight size={17} /></button>
          </article>)}</div>
          <p className="demo-note">Precios y tiempos de demostración. Se ajustan a los servicios de cada barbería.</p>
        </div></section>

        <section className="style-section section" id="estilo" aria-labelledby="style-title"><div className="container style-layout">
          <div className="style-copy"><span className="eyebrow">02 / TU PRÓXIMA VISITA</span><h2 id="style-title">Elige tu próximo <em>look.</em></h2><p>Cuéntanos lo que tienes en mente. Preparamos tu mensaje de reserva para que solo tengas que enviarlo por WhatsApp.</p><div className="style-benefits"><span><Check size={15} /> Sin registros</span><span><Check size={15} /> Sin complicaciones</span></div><div className="style-aside"><Sparkles size={21} /><span>¿No sabes qué estilo elegir? Selecciona “Aún no lo sé” y lo conversamos en la cita.</span></div></div>
          <div className="booking-card">
            <div className="booking-header"><span>ARMA TU VISITA</span><span>01 — 03</span></div>
            <fieldset><legend><span>01</span> ¿Qué te gustaría hacer?</legend><div className="choice-row service-choices">{services.map((item) => <button key={item.id} type="button" className={service === item.id ? "choice active" : "choice"} aria-pressed={service === item.id} onClick={() => chooseService(item.id)}>{item.id === "corte" ? "Corte" : item.id === "barba" ? "Barba" : "Corte + barba"}</button>)}</div></fieldset>
            <fieldset><legend><span>02</span> ¿Qué estilo te gusta?</legend><div className="choice-row style-choices">{styleOptions[service].map((item) => <button key={item} type="button" className={style === item ? "choice active" : "choice"} aria-pressed={style === item} onClick={() => setStyle(item)}>{item}</button>)}</div></fieldset>
            <fieldset><legend><span>03</span> ¿Cuándo te queda bien?</legend><div className="booking-selects"><label>Preferencia de día<select value={preferredDay} onChange={(event) => setPreferredDay(event.target.value)}><option>Esta semana</option><option>La próxima semana</option><option>Fin de semana</option><option>Lo antes posible</option></select></label><label>Momento del día<select value={preferredTime} onChange={(event) => setPreferredTime(event.target.value)}><option>Mañana</option><option>Tarde</option><option>Cualquier hora</option></select></label></div></fieldset>
            <div className="booking-summary"><div><span>Tu elección</span><strong>{selectedService.title} · {style}</strong></div><span>{selectedService.duration}</span></div>
            <a className="button button-gold booking-submit" href={whatsappUrl(reservationMessage)} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} /> Preparar reserva por WhatsApp <ArrowUpRight size={18} /></a>
            {!siteConfig.whatsappNumber && <p className="booking-demo">Demo: WhatsApp te pedirá elegir un contacto. Al personalizar la web, el mensaje irá directo a la barbería.</p>}
          </div>
        </div></section>

        <section className="section gallery-section" id="galeria" aria-labelledby="gallery-title"><div className="container">
          <div className="section-top gallery-heading"><div><span className="eyebrow dark-eyebrow">03 / INSPIRACIÓN</span><h2 id="gallery-title">El resultado <em>habla.</em></h2></div><p>Una selección de estilos para imaginar tu próximo cambio. Cada detalle cuenta.</p></div>
          <div className="gallery-filters" role="group" aria-label="Filtrar galería">{(["Todos", "Cortes", "Barba"] as GalleryCategory[]).map((item) => <button type="button" key={item} className={filter === item ? "filter active" : "filter"} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
          <div className="gallery-grid">{visibleGallery.map((item) => <button type="button" className="gallery-card" key={item.title} onClick={() => setActiveImage(item.index)} aria-label={"Ampliar " + item.title}><span className="gallery-photo" style={{ backgroundPosition: item.position }} role="img" aria-label={item.detail} /><span className="gallery-overlay"><span><small>{item.category.toUpperCase()}</small><strong>{item.title}</strong></span><span className="gallery-open"><ArrowUpRight size={19} /></span></span></button>)}</div>
          <div className="gallery-footer"><p>Imágenes ilustrativas para la demo. Aquí se mostrarían los trabajos reales de la barbería.</p><a href="#estilo">Quiero un look así <ArrowUpRight size={17} /></a></div>
        </div></section>

        <section className="closing-section" id="contacto" aria-labelledby="closing-title"><div className="container closing-inner"><div><span className="eyebrow">04 / ES TU TURNO</span><h2 id="closing-title">El próximo gran look<br /><em>empieza aquí.</em></h2><p>Elige tu servicio, cuéntanos tu idea y coordinemos tu próxima visita.</p><a className="button button-gold" href="#estilo">Empezar mi reserva <ArrowUpRight size={18} /></a></div><div className="closing-symbol" aria-hidden="true"><Scissors size={150} strokeWidth={0.7} /></div></div></section>
      </main>

      <footer className="footer"><div className="container footer-main"><div><a className="brand footer-brand" href="#inicio"><IconMark /><span>NAVA<span className="brand-sub">BARBER STUDIO</span></span></a><p>Un buen corte se nota.<br />Una buena experiencia se recuerda.</p></div><div><h3>EXPLORA</h3><a href="#servicios">Servicios</a><a href="#estilo">Reserva</a><a href="#galeria">Galería</a></div><div><h3>CONTACTO</h3><span><MapPin size={16} /> Ubicación por definir</span><span><CalendarDays size={16} /> Horarios por definir</span><a href={whatsappUrl("Hola, quisiera información sobre sus servicios.")} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> WhatsApp</a></div><div><h3>SÍGUENOS</h3><span><Camera size={16} /> Instagram por definir</span></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} NAVA BARBER STUDIO · SITIO DEMOSTRATIVO</span><span>Diseñado para adaptarse a tu barbería.</span></div></footer>

      {activeImage !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={"Detalle de " + gallery[activeImage].title} onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveImage(null); }}><div className="lightbox-panel"><button ref={lightboxCloseRef} className="lightbox-close" type="button" onClick={() => setActiveImage(null)} aria-label="Cerrar imagen"><X size={22} /></button><div className="lightbox-image" style={{ backgroundPosition: gallery[activeImage].position }} role="img" aria-label={gallery[activeImage].detail} /><div className="lightbox-details"><div><span>{gallery[activeImage].category.toUpperCase()} / 0{activeImage + 1}</span><h3>{gallery[activeImage].title}</h3><p>{gallery[activeImage].detail}</p></div><div className="lightbox-controls"><button type="button" onClick={() => setActiveImage((activeImage + gallery.length - 1) % gallery.length)} aria-label="Imagen anterior"><ChevronLeft /></button><button type="button" onClick={() => setActiveImage((activeImage + 1) % gallery.length)} aria-label="Imagen siguiente"><ChevronRight /></button></div></div></div></div>}
    </>
  );
}
