import React from 'react';
import { useDevotional } from '@/hooks/useDevotional';
import { RefreshCw, Calendar, Book, User } from 'lucide-react';

const NewHeroSection = () => {
  const { currentDevotional, isLoading, refreshDevotional } = useDevotional();

  if (isLoading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-700">Carregando devocional...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Lado Esquerdo - Informações da Igreja */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h1 className="text-5xl lg:text-6xl font-bold text-green-800 mb-4">
                  IGREJA
                </h1>
                <h2 className="text-4xl lg:text-5xl font-bold text-green-700 mb-2">
                  PRESBITERIANA
                </h2>
                <h3 className="text-3xl lg:text-4xl font-bold text-green-600 mb-6">
                  PARQUE INDUSTRIAL
                </h3>
                <p className="text-xl text-gray-700 mb-8">
                  Uma Igreja para você e sua família
                </p>
                <p className="text-lg text-green-700 font-medium">
                  Oração e Louvor a Deus
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
                <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Nossos Horários
                </h4>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Escola Dominical:</span>
                    <span>Domingos 10:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Culto Dominical:</span>
                    <span>Domingos 19:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Estudo Bíblico:</span>
                    <span>Quintas 20:00</span>
                  </div>
                </div>
              </div>

              <div className="text-center lg:text-left">
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Participe da nossa comunidade
                </button>
              </div>
            </div>

            {/* Lado Direito - Devocional Diário */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-green-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-green-800 flex items-center">
                  <Book className="w-6 h-6 mr-2" />
                  Devocional Diário
                </h3>
                <button
                  onClick={refreshDevotional}
                  className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-full transition-all duration-200"
                  title="Atualizar devocional"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>

              {currentDevotional && (
                <div className="space-y-6">
                  <div className="flex items-center text-sm text-green-600 font-medium">
                    <Calendar className="w-4 h-4 mr-2" />
                    {currentDevotional.date}
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3">
                      {currentDevotional.title}
                    </h4>
                    
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 rounded-r-lg">
                      <p className="text-green-800 font-medium text-center italic">
                        "{currentDevotional.text.split('\n')[0]}"
                      </p>
                      <p className="text-green-600 text-sm text-center mt-2">
                        - {currentDevotional.bibleVerse}
                      </p>
                    </div>

                    {currentDevotional.text.split('\n').length > 1 && (
                      <div className="space-y-3 text-gray-700 text-sm leading-relaxed max-h-64 overflow-y-auto">
                        {currentDevotional.text.split('\n').slice(1).map((paragraph, index) => (
                          paragraph.trim() && (
                            <p key={index} className="text-justify">
                              {paragraph.trim()}
                            </p>
                          )
                        ))}
                      </div>
                    )}

                    {currentDevotional.author && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          {currentDevotional.author}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-green-600 italic">
                      "A sabedoria consiste em conhecer o Senhor e aplicar seus princípios em nossa vida."
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;

