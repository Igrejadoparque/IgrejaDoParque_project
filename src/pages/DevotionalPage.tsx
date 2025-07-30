import React from "react";
import DevotionalReader from "@/components/DevotionalReader";

const DevotionalPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 min-h-screen bg-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl text-center mb-8 text-white">
          Devocional Diário
        </h1>
        <p className="text-lg text-center text-white mb-8">
          Alimente sua alma com a Palavra de Deus através do Presente Diário da
          RTM Brasil
        </p>
        <DevotionalReader />
      </div>
    </div>
  );
};

export default DevotionalPage;
