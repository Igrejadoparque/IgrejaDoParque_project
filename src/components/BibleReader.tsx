import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Settings, Book } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface BibleBook {
  name: string;
  chapters: number;
  urlName: string;
}

interface BibleVerse {
  number: number;
  text: string;
}

interface BibleChapter {
  book: string;
  chapter: number;
  verses: BibleVerse[];
}

const BibleReader = () => {
  const [currentBook, setCurrentBook] = useState("genesis");
  const [currentChapter, setCurrentChapter] = useState(1);
  const [fontSize, setFontSize] = useState(16);
  const [bibleVersion, setBibleVersion] = useState("ARA");
  const [chapterContent, setChapterContent] = useState<BibleChapter | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lista de livros da Bíblia com nomes para URLs
  const bibleBooks: BibleBook[] = [
    { name: "Gênesis", chapters: 50, urlName: "genesis" },
    { name: "Êxodo", chapters: 40, urlName: "exodus" },
    { name: "Levítico", chapters: 27, urlName: "leviticus" },
    { name: "Números", chapters: 36, urlName: "numbers" },
    { name: "Deuteronômio", chapters: 34, urlName: "deuteronomy" },
    { name: "Josué", chapters: 24, urlName: "joshua" },
    { name: "Juízes", chapters: 21, urlName: "judges" },
    { name: "Rute", chapters: 4, urlName: "ruth" },
    { name: "1 Samuel", chapters: 31, urlName: "1_samuel" },
    { name: "2 Samuel", chapters: 24, urlName: "2_samuel" },
    { name: "1 Reis", chapters: 22, urlName: "1_kings" },
    { name: "2 Reis", chapters: 25, urlName: "2_kings" },
    { name: "1 Crônicas", chapters: 29, urlName: "1_chronicles" },
    { name: "2 Crônicas", chapters: 36, urlName: "2_chronicles" },
    { name: "Esdras", chapters: 10, urlName: "ezra" },
    { name: "Neemias", chapters: 13, urlName: "nehemiah" },
    { name: "Ester", chapters: 10, urlName: "esther" },
    { name: "Jó", chapters: 42, urlName: "job" },
    { name: "Salmos", chapters: 150, urlName: "psalms" },
    { name: "Provérbios", chapters: 31, urlName: "proverbs" },
    { name: "Eclesiastes", chapters: 12, urlName: "ecclesiastes" },
    { name: "Cânticos", chapters: 8, urlName: "songs" },
    { name: "Isaías", chapters: 66, urlName: "isaiah" },
    { name: "Jeremias", chapters: 52, urlName: "jeremiah" },
    { name: "Lamentações", chapters: 5, urlName: "lamentations" },
    { name: "Ezequiel", chapters: 48, urlName: "ezekiel" },
    { name: "Daniel", chapters: 12, urlName: "daniel" },
    { name: "Oséias", chapters: 14, urlName: "hosea" },
    { name: "Joel", chapters: 3, urlName: "joel" },
    { name: "Amós", chapters: 9, urlName: "amos" },
    { name: "Obadias", chapters: 1, urlName: "obadiah" },
    { name: "Jonas", chapters: 4, urlName: "jonah" },
    { name: "Miquéias", chapters: 7, urlName: "micah" },
    { name: "Naum", chapters: 3, urlName: "nahum" },
    { name: "Habacuque", chapters: 3, urlName: "habakkuk" },
    { name: "Sofonias", chapters: 3, urlName: "zephaniah" },
    { name: "Ageu", chapters: 2, urlName: "haggai" },
    { name: "Zacarias", chapters: 14, urlName: "zechariah" },
    { name: "Malaquias", chapters: 4, urlName: "malachi" },
    { name: "Mateus", chapters: 28, urlName: "matthew" },
    { name: "Marcos", chapters: 16, urlName: "mark" },
    { name: "Lucas", chapters: 24, urlName: "luke" },
    { name: "João", chapters: 21, urlName: "john" },
    { name: "Atos", chapters: 28, urlName: "acts" },
    { name: "Romanos", chapters: 16, urlName: "romans" },
    { name: "1 Coríntios", chapters: 16, urlName: "1_corinthians" },
    { name: "2 Coríntios", chapters: 13, urlName: "2_corinthians" },
    { name: "Gálatas", chapters: 6, urlName: "galatians" },
    { name: "Efésios", chapters: 6, urlName: "ephesians" },
    { name: "Filipenses", chapters: 4, urlName: "philippians" },
    { name: "Colossenses", chapters: 4, urlName: "colossians" },
    { name: "1 Tessalonicenses", chapters: 5, urlName: "1_thessalonians" },
    { name: "2 Tessalonicenses", chapters: 3, urlName: "2_thessalonians" },
    { name: "1 Timóteo", chapters: 6, urlName: "1_timothy" },
    { name: "2 Timóteo", chapters: 4, urlName: "2_timothy" },
    { name: "Tito", chapters: 3, urlName: "titus" },
    { name: "Filemom", chapters: 1, urlName: "philemon" },
    { name: "Hebreus", chapters: 13, urlName: "hebrews" },
    { name: "Tiago", chapters: 5, urlName: "james" },
    { name: "1 Pedro", chapters: 5, urlName: "1_peter" },
    { name: "2 Pedro", chapters: 3, urlName: "2_peter" },
    { name: "1 João", chapters: 5, urlName: "1_john" },
    { name: "2 João", chapters: 1, urlName: "2_john" },
    { name: "3 João", chapters: 1, urlName: "3_john" },
    { name: "Judas", chapters: 1, urlName: "jude" },
    { name: "Apocalipse", chapters: 22, urlName: "revelation" }
  ];

  const getCurrentBook = () => {
    return bibleBooks.find(book => book.urlName === currentBook) || bibleBooks[0];
  };

  const loadChapter = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // URL para buscar o capítulo completo
      const url = `https://bibliaportugues.com/${currentBook}/${currentChapter}.htm`;
      
      // Usar um proxy CORS para contornar limitações de cross-origin
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`Erro ao carregar capítulo: ${response.status}`);
      }
      
      const data = await response.json();
      const htmlContent = data.contents;
      
      // Parse do HTML para extrair os versículos
      const verses = parseChapterHTML(htmlContent);
      
      const chapterData: BibleChapter = {
        book: getCurrentBook().name,
        chapter: currentChapter,
        verses: verses
      };
      
      setChapterContent(chapterData);
    } catch (error) {
      console.error("Erro ao carregar capítulo:", error);
      setError("Erro ao carregar o capítulo. Tente novamente.");
      
      // Fallback para conteúdo mockado em caso de erro
      const fallbackContent: BibleChapter = {
        book: getCurrentBook().name,
        chapter: currentChapter,
        verses: generateFallbackVerses()
      };
      setChapterContent(fallbackContent);
    } finally {
      setLoading(false);
    }
  };

  const parseChapterHTML = (html: string): BibleVerse[] => {
    const verses: BibleVerse[] = [];
    
    try {
      // Criar um parser DOM temporário
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Buscar por elementos que contêm versículos
      // O site usa uma estrutura de tabela com links numerados
      const verseElements = doc.querySelectorAll('td');
      
      verseElements.forEach((element) => {
        const text = element.textContent || '';
        
        // Procurar por padrão de versículo: [**número**]texto
        const verseMatch = text.match(/\[?\*?\*?(\d+)\*?\*?\]?(.+)/);
        
        if (verseMatch && verseMatch[1] && verseMatch[2]) {
          const verseNumber = parseInt(verseMatch[1]);
          let verseText = verseMatch[2].trim();
          
          // Limpar o texto removendo links e formatação extra
          verseText = verseText.replace(/\[.*?\]/g, '').trim();
          
          if (verseText && verseNumber > 0) {
            verses.push({
              number: verseNumber,
              text: verseText
            });
          }
        }
      });
      
      // Se não encontrou versículos com o método acima, tentar método alternativo
      if (verses.length === 0) {
        const allText = doc.body.textContent || '';
        const lines = allText.split('\n');
        
        lines.forEach((line) => {
          const verseMatch = line.match(/^(\d+)(.+)/);
          if (verseMatch && verseMatch[1] && verseMatch[2]) {
            const verseNumber = parseInt(verseMatch[1]);
            const verseText = verseMatch[2].trim();
            
            if (verseText && verseNumber > 0 && verseNumber <= 200) {
              verses.push({
                number: verseNumber,
                text: verseText
              });
            }
          }
        });
      }
      
    } catch (error) {
      console.error("Erro ao fazer parse do HTML:", error);
    }
    
    // Se ainda não encontrou versículos, retornar fallback
    if (verses.length === 0) {
      return generateFallbackVerses();
    }
    
    // Ordenar versículos por número
    return verses.sort((a, b) => a.number - b.number);
  };

  const generateFallbackVerses = (): BibleVerse[] => {
    // Conteúdo de fallback para quando não conseguir carregar do site
    const fallbackTexts = [
      "Conteúdo bíblico carregado localmente.",
      "Para ver o conteúdo completo, verifique sua conexão com a internet.",
      "Este é um texto de exemplo enquanto carregamos o conteúdo real.",
      "O leitor da Bíblia está tentando conectar com a fonte online.",
      "Em caso de problemas, o conteúdo será carregado do cache local."
    ];
    
    return Array.from({ length: Math.min(fallbackTexts.length, 10) }, (_, i) => ({
      number: i + 1,
      text: fallbackTexts[i % fallbackTexts.length]
    }));
  };

  useEffect(() => {
    loadChapter();
  }, [currentBook, currentChapter]);

  const goToPreviousChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
    } else {
      // Vai para o livro anterior
      const currentBookIndex = bibleBooks.findIndex(book => book.urlName === currentBook);
      if (currentBookIndex > 0) {
        const previousBook = bibleBooks[currentBookIndex - 1];
        setCurrentBook(previousBook.urlName);
        setCurrentChapter(previousBook.chapters);
      }
    }
  };

  const goToNextChapter = () => {
    const book = getCurrentBook();
    if (currentChapter < book.chapters) {
      setCurrentChapter(currentChapter + 1);
    } else {
      // Vai para o próximo livro
      const currentBookIndex = bibleBooks.findIndex(book => book.urlName === currentBook);
      if (currentBookIndex < bibleBooks.length - 1) {
        const nextBook = bibleBooks[currentBookIndex + 1];
        setCurrentBook(nextBook.urlName);
        setCurrentChapter(1);
      }
    }
  };

  return (
    <div className="h-[70vh] flex flex-col">
      {/* Cabeçalho com controles */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b bg-gray-50">
        <div className="flex items-center gap-2">
          <Book className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">
            {getCurrentBook().name} {currentChapter}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Configurações de Leitura</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Tamanho da Fonte</label>
                  <Select value={fontSize.toString()} onValueChange={(value) => setFontSize(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">Pequena (12px)</SelectItem>
                      <SelectItem value="14">Normal (14px)</SelectItem>
                      <SelectItem value="16">Média (16px)</SelectItem>
                      <SelectItem value="18">Grande (18px)</SelectItem>
                      <SelectItem value="20">Muito Grande (20px)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Versão da Bíblia</label>
                  <Select value={bibleVersion} onValueChange={setBibleVersion}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ARA">Almeida Revista e Atualizada</SelectItem>
                      <SelectItem value="NVI">Nova Versão Internacional</SelectItem>
                      <SelectItem value="ACF">Almeida Corrigida Fiel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`https://bibliaportugues.com/${currentBook}/${currentChapter}.htm`, "_blank")}
          >
            Ver no Site Original
          </Button>
        </div>
      </div>

      {/* Navegação de livros e capítulos */}
      <div className="flex flex-wrap items-center gap-4 p-4 border-b bg-gray-50">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Livro:</label>
          <Select value={currentBook} onValueChange={setCurrentBook}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {bibleBooks.map((book) => (
                <SelectItem key={book.urlName} value={book.urlName}>
                  {book.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Capítulo:</label>
          <Select value={currentChapter.toString()} onValueChange={(value) => setCurrentChapter(parseInt(value))}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {Array.from({ length: getCurrentBook().chapters }, (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded">
            {error}
          </div>
        )}
      </div>

      {/* Conteúdo do capítulo */}
      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Carregando capítulo...</p>
            </div>
          </div>
        ) : chapterContent ? (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-primary">
              {chapterContent.book} {chapterContent.chapter}
            </h2>
            <div className="space-y-4">
              {chapterContent.verses.map((verse) => (
                <p key={verse.number} className="leading-relaxed" style={{ fontSize: `${fontSize}px` }}>
                  <span className="font-bold text-primary mr-2">{verse.number}</span>
                  {verse.text}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Erro ao carregar o capítulo</p>
          </div>
        )}
      </div>

      {/* Navegação entre capítulos */}
      <div className="flex items-center justify-between p-4 border-t bg-gray-50">
        <Button
          variant="outline"
          onClick={goToPreviousChapter}
          disabled={currentBook === "genesis" && currentChapter === 1}
          className="flex items-center gap-2"
        >
        
(Content truncated due to size limit. Use line ranges to read in chunks)