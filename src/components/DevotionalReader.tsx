import React from "react";
import { useDevotional } from "@/hooks/useDevotional";
import { RefreshCw, Calendar, Book, User } from "lucide-react";
import { format } from "date-fns";

const DevocionalReader: React.FC = () => {
  const { currentDevotional, isLoading, refreshDevotional } = useDevotional();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando devocional...</p>
        </div>
      </div>
    );
  }

  if (!currentDevotional) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">
          Nenhuma devocional disponível no momento.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-green-100">
      <div className="flex items-center justify-between mb-4 bg-white p-2 rounded-md">
        <h3 className="text-xl md:text-2xl font-bold text-black flex items-center">
          <Book className="w-5 h-5 md:w-6 md:h-6 mr-2 text-green-600" />
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

      <div className="space-y-4">
        <div className="flex items-center text-sm font-medium bg-green-100 p-2 rounded-md">
          <Calendar className="w-4 h-4 mr-2 text-black" />
          <span className="text-black">{format(new Date(), "dd/MM/yyyy")}</span>
        </div>

        <div>
          <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
            {currentDevotional.title}
          </h4>

          <div className="bg-white border-l-4 border-green-500 p-3 mb-3 rounded-r-lg">
            <p className="text-black font-medium text-justify">
              {currentDevotional.text}
            </p>
          </div>

          {currentDevotional.author && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs md:text-sm text-gray-600 flex items-center">
                <User className="w-4 h-4 mr-2" />
                {currentDevotional.author}
              </p>
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-green-600 italic">
            "A sabedoria consiste em conhecer o Senhor e aplicar seus princípios
            em nossa vida."
          </p>
        </div>
      </div>
    </div>
  );
};

export default DevocionalReader;
