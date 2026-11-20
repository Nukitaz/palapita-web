import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MapPin, UtensilsCrossed, Clock, MessageCircle, ExternalLink, X } from "lucide-react";

// Datos editables del restaurante
const RESTAURANT_DATA = {
  name: "Palapita",
  menuUrl: "https://tu-link-del-menu-qr.com",
  mapsUrl: "https://maps.app.goo.gl/LECaFaDWTPnTSHnb6",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59736.25003044061!2d-103.44750878133489!3d20.648591137458496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428ad0029d08389%3A0x8bc3f83b93353e97!2sPalapita%20Mariscos!5e0!3m2!1ses-419!2smx!4v1795151741846!5m2!1ses-419!2smx",
  whatsappNumber: "523345124726",
  whatsappMessage: "Hola, me gustaría pedir informes sobre horarios o disponibilidad de mesa.",
  hours: "Martes a Domingo · 12:00 AM – 7:00 PM",
  address: "C. Volcán Cotopaxi 1187, Colli Urbano, 45070 Zapopan, Jal.",
};

// Foto de fondo principal
const HERO_BACKGROUND_IMAGE = "/photos/local.jpg";

// Los 3 platillos estrella
type Dish = {
  tag: string;
  title: string;
  description: string;
  image: string;
};

const TOP_DISHES: Dish[] = [
  {
    tag: "EL FAVORITO",
    title: "OSTIONES ZARANDEADOS",
    description: "Deliciosos ostiones zarandeados, ¡directito de Sinaloa!",
    image: "/photos/ostiones.png",
  },
  {
    tag: "MÁS PEDIDO",
    title: "TOSTADA DE AGUACHILE",
    description: "Tostada de aguachile negro con camarones cocido",
    image: "/photos/tostada.jpg",
  },
  {
    tag: "ESPECIALIDAD",
    title: "PAN DE ELOTE",
    description: "Pan de elote con nieve",
    image: "/photos/pan_elote.jpg",
  },
];

export default function App() {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  // Tracking de scroll global y exacto (evita bugs en celulares)
  const { scrollY } = useScroll();
  
  // Desvanece la sección en los primeros 500px de scroll
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const logoY = useTransform(scrollY, [0, 500], [0, -60]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.08]);

  const whatsappLink = `https://wa.me/${RESTAURANT_DATA.whatsappNumber}?text=${encodeURIComponent(
    RESTAURANT_DATA.whatsappMessage
  )}`;

  return (
    <div className="bg-[#090b14] text-white font-sans selection:bg-[#eb5e28] selection:text-white overflow-x-hidden relative">
      
      {/* NAVBAR SUPERIOR FIJA */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 py-2 sm:py-3 bg-gradient-to-b from-[#090b14]/90 to-transparent backdrop-blur-sm">
        <a href="#" className="flex items-center gap-3">
          <img 
            src="/logo-restaurante.png" 
            alt="Palapita Logo"
            className="h-14 sm:h-16 md:h-24 w-auto object-contain mix-blend-screen"
          />
        </a>

        <a
          href={RESTAURANT_DATA.menuUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm tracking-wide backdrop-blur-md transition-all shadow-lg"
        >
          Ver Menú
        </a>
      </nav>

      {/* SECCIÓN 1: HERO FIJO (Fondo de inicio) */}
      <section className="sticky top-0 h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#090b14]">
        {/* Fondo animado por scroll */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <img
            src={HERO_BACKGROUND_IMAGE}
            alt="Ambiente del restaurante"
            className="w-full h-full object-cover object-center brightness-[0.45]"
          />
          {/* Difuminado suavizado, sin bandas negras agresivas */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090b14]/20 to-[#090b14]/80" />
        </motion.div>

        {/* Logo y Botones de inicio */}
        <motion.div
          style={{ opacity: heroOpacity, y: logoY }}
          className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl px-4"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="-mt-8 -mb-6 sm:-mt-14 sm:-mb-12 md:-mt-20 md:-mb-16 pl-2 sm:pl-4 flex flex-col items-center w-full pointer-events-none"
          >
            <img 
              src="/logo-restaurante.png" 
              alt={RESTAURANT_DATA.name} 
              className="w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:w-[40rem] object-contain mix-blend-screen drop-shadow-2xl" 
            />
            <h1 className="sr-only">{RESTAURANT_DATA.name}</h1>
          </motion.div>

          {/* Botones */}
          <div className="translate-y-4 sm:translate-y-8 md:translate-y-12 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 w-full max-w-xs sm:max-w-none mx-auto">
            <a
              href={RESTAURANT_DATA.menuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full sm:w-auto min-w-[200px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#eb5e28]/90 hover:bg-[#eb5e28] text-white font-semibold text-sm sm:text-base tracking-wide backdrop-blur-md shadow-[0_8px_32px_rgba(235,94,40,0.3)] hover:shadow-[0_8px_32px_rgba(235,94,40,0.5)] hover:-translate-y-1 transition-all pointer-events-auto"
            >
              <UtensilsCrossed className="w-5 h-5" />
              Ver Menú
            </a>
            <a
              href="#ubicacion"
              className="flex items-center justify-center gap-2 w-full sm:w-auto min-w-[200px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#1b527a]/80 hover:bg-[#1b527a] border border-[#1b527a]/50 text-white font-semibold text-sm sm:text-base tracking-wide backdrop-blur-md shadow-[0_8px_32px_rgba(27,82,122,0.3)] hover:shadow-[0_8px_32px_rgba(27,82,122,0.5)] hover:-translate-y-1 transition-all pointer-events-auto"
            >
              <MapPin className="w-5 h-5 text-amber-300" />
              Ubicación
            </a>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="translate-y-4 sm:translate-y-8 md:translate-y-12 mt-6 md:mt-8 text-xs sm:text-sm md:text-base text-slate-300 italic tracking-wide font-medium drop-shadow-md px-2 pointer-events-none"
          >
            "El rincón familiar donde la costa se siente en casa."
          </motion.p>
        </motion.div>
      </section>

      {/* CONTENEDOR SÓLIDO (Se desliza por ENCIMA de la sección 1 sin dejar huecos) */}
      <div className="relative z-20 bg-[#090b14] shadow-[0_-25px_50px_#090b14]">
        
        {/* SECCIÓN 2: PORTADA ATMOSFÉRICA */}
        {/* Padding limpio sin huecos gigantes */}
        <section className="relative min-h-[60vh] md:min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-20 md:py-32 overflow-hidden">
          <img
            src="/photos/local_2.jpg"
            alt="Platillos frescos de mariscos"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090b14] via-[#090b14]/50 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-24 md:h-32 bg-gradient-to-b from-[#090b14] to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 max-w-4xl text-center pt-8"
          >
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#eb5e28]">
              MARISCO DEL PACIFICO
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight leading-none">
              RESTAURANTE PARA LA FAMILIA
            </h2>
            <p className="mt-4 sm:mt-5 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              En PALAPITA seleccionamos los mariscos más frescos para ofrecerte una experiencia inolvidable. Ven a probar nuestros platillos y descubre el verdadero sabor del mar.
            </p>
          </motion.div>
        </section>

        {/* SECCIÓN 3: TARJETAS DE PLATILLOS ESTRELLA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TOP_DISHES.map((dish, index) => (
              <motion.div
                key={dish.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                onClick={() => setSelectedDish(dish)}
                className="group relative h-[380px] sm:h-[460px] rounded-2xl overflow-hidden bg-[#131722] border border-white/5 shadow-2xl cursor-pointer"
              >
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b14] via-[#090b14]/40 to-transparent transition-opacity group-hover:opacity-80" />

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.25em] text-[#eb5e28]">
                    {dish.tag}
                  </span>
                  <h3 className="mt-1 text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                    {dish.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                    {dish.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* MODAL DEL PLATILLO SELECCIONADO */}
        <AnimatePresence>
          {selectedDish && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDish(null)}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#090b14]/85 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl bg-[#131722] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
              >
                <button
                  onClick={() => setSelectedDish(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-md"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="h-56 sm:h-64 md:h-80 w-full relative">
                  <img
                    src={selectedDish.image}
                    alt={selectedDish.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#131722] to-transparent" />
                </div>
                <div className="p-5 sm:p-8">
                  <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.25em] text-[#eb5e28]">
                    {selectedDish.tag}
                  </span>
                  <h3 className="mt-1 sm:mt-2 text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                    {selectedDish.title}
                  </h3>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
                    {selectedDish.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SECCIÓN 4: BANNER PANORÁMICO AL MENÚ DIGITAL */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1b527a] via-[#10375c] to-[#090b14] border border-white/10 p-6 sm:p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-2xl"
          >
            <div className="max-w-xl text-center md:text-left w-full">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#eb5e28]">
                CARTA COMPLETA Y BEBIDAS
              </span>
              <h2 className="mt-1 sm:mt-2 text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight">
                EXPLORA TODO NUESTRO MENÚ
              </h2>
              <p className="mt-2 sm:mt-3 text-slate-200 text-sm sm:text-base md:text-lg">
                Consulta tostadas, cocteles, filetes, caldos, botanas y bebidas preparadas desde tu celular.
              </p>
              <a
                href={RESTAURANT_DATA.menuUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 sm:mt-6 inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#eb5e28] text-white font-semibold text-sm md:text-base hover:bg-[#d45222] transition-colors shadow-lg w-full sm:w-auto"
              >
                Abrir Menú Digital
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="w-full md:w-80 h-48 sm:h-56 rounded-2xl overflow-hidden shadow-2xl border border-white/20 shrink-0">
              <img
                src="/photos/mejillones.jpg"
                alt="Menú de mariscos"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </section>

        {/* SECCIÓN 5: UBICACIÓN Y HORARIOS */}
        <section id="ubicacion" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center rounded-3xl bg-[#131722] border border-white/5 p-5 sm:p-6 md:p-10 shadow-xl">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#1b527a]">
                TE ESPERAMOS EN EL LOCAL
              </span>
              <h2 className="mt-1 sm:mt-2 text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
                UBICACIÓN Y HORARIOS
              </h2>

              <div className="mt-5 sm:mt-6 space-y-4 text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#eb5e28] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white text-sm sm:text-base">Dirección</p>
                    <p className="text-sm sm:text-base">{RESTAURANT_DATA.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#1b527a] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white text-sm sm:text-base">Horario de atención</p>
                    <p className="text-sm sm:text-base">{RESTAURANT_DATA.hours}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 flex flex-wrap gap-4">
                <a
                  href={RESTAURANT_DATA.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#1b527a] text-white font-semibold text-sm md:text-base hover:bg-[#154263] transition-colors shadow-lg w-full sm:w-auto"
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
                  Abrir en Google Maps
                </a>
              </div>
            </div>

            <div className="w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-inner">
              <iframe
                title="Ubicación del restaurante"
                src={RESTAURANT_DATA.mapsEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/5 py-6 px-4 sm:px-6 text-center flex flex-col items-center">
          <img 
            src="/logo-restaurante.png" 
            alt="Palapita Logo" 
            className="w-24 sm:w-28 md:w-32 object-contain mix-blend-screen opacity-80 hover:opacity-100 transition-opacity" 
          />
          <p className="mt-2 text-[10px] sm:text-xs text-slate-500">
            © {new Date().getFullYear()} {RESTAURANT_DATA.name}. Todos los derechos reservados.
          </p>
        </footer>
      </div>

      {/* BOTÓN FLOTANTE DE WHATSAPP */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-xs sm:text-sm shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:scale-105 transition-transform"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}