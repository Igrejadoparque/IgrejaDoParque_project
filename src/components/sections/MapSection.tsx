const MapSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-green-600 mb-8 relative inline-block">
          Nossa Localização
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-green-600"></div>
        </h2>
        <div className="aspect-w-16 aspect-h-9 w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.430460670693!2d-47.05869202498499!3d-22.76847867936369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8b7470c1d1a1b%3A0x7b1d1a1b1d1a1b1d!2sRua%20Jos%C3%A9%20Pinto%20Camargo%2C%2090%20-%20Parque%20Industrial%2C%20Campinas%20-%20SP%2C%2013031-620%2C%20Brasil!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <p className="text-lg text-gray-700 mt-4">
          Rua José Pinto Camargo, 90 - Parque Industrial, Campinas - SP
        </p>
      </div>
    </section>
  );
};

export default MapSection;

