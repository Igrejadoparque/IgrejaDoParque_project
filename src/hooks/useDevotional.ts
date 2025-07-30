import { useState, useEffect } from 'react';
import { devotionals } from '@/data/devotionals';

interface Devotional {
  date: string;
  title: string;
  bibleVerse: string;
  text: string;
  author: string;
}

export const useDevotional = () => {
  const [currentDevotional, setCurrentDevotional] = useState<Devotional | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função para obter o índice baseado na data atual
  const getDailyIndex = () => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
    
    // Usa o dia do ano para determinar qual devocional mostrar
    // Quando chegar ao fim da lista, volta ao início
    return dayOfYear % devotionals.length;
  };

  // Função para obter um índice aleatório baseado na data
  const getRandomDailyIndex = () => {
    const today = new Date();
    const dateString = today.toDateString();
    
    // Cria uma seed baseada na data para garantir que o mesmo devocional
    // seja mostrado durante todo o dia
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      const char = dateString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Converte para 32bit integer
    }
    
    // Usa o hash para gerar um índice pseudo-aleatório
    return Math.abs(hash) % devotionals.length;
  };

  // Função para carregar o devocional do dia
  const loadDailyDevotional = () => {
    setIsLoading(true);
    
    try {
      // Verifica se já existe um devocional salvo para hoje
      const today = new Date().toDateString();
      const savedData = localStorage.getItem('dailyDevotional');
      
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.date === today && parsed.devotional) {
          setCurrentDevotional(parsed.devotional);
          setIsLoading(false);
          return;
        }
      }
      
      // Se não existe ou é de outro dia, seleciona um novo
      const index = getRandomDailyIndex();
      const selectedDevotional = devotionals[index];
      
      // Salva no localStorage para manter durante o dia
      localStorage.setItem('dailyDevotional', JSON.stringify({
        date: today,
        devotional: selectedDevotional,
        index: index
      }));
      
      setCurrentDevotional(selectedDevotional);
    } catch (error) {
      console.error('Erro ao carregar devocional:', error);
      // Fallback: usa o primeiro devocional
      setCurrentDevotional(devotionals[0]);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para forçar a atualização do devocional
  const refreshDevotional = () => {
    localStorage.removeItem('dailyDevotional');
    loadDailyDevotional();
  };

  // Função para obter o próximo devocional (para preview)
  const getNextDevotional = () => {
    const savedData = localStorage.getItem('dailyDevotional');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      const nextIndex = (parsed.index + 1) % devotionals.length;
      return devotionals[nextIndex];
    }
    return devotionals[1] || devotionals[0];
  };

  // Carrega o devocional quando o componente é montado
  useEffect(() => {
    loadDailyDevotional();
    
    // Verifica a cada hora se mudou o dia
    const interval = setInterval(() => {
      const today = new Date().toDateString();
      const savedData = localStorage.getItem('dailyDevotional');
      
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.date !== today) {
          loadDailyDevotional();
        }
      }
    }, 60 * 60 * 1000); // Verifica a cada hora
    
    return () => clearInterval(interval);
  }, []);

  return {
    currentDevotional,
    isLoading,
    refreshDevotional,
    getNextDevotional,
    totalDevotionals: devotionals.length
  };
};

