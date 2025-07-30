# Site Igreja do Parque - Versão Corrigida

## Correções Aplicadas

### 1. Logos Corrigidas
- ✅ Logo principal da IPPI atualizada (`/logoIPPI.png`)
- ✅ Logo da IPB atualizada (`/Ipb_logo.png`)
- ✅ Ambas as logos estão funcionando corretamente no cabeçalho

### 2. Devocional Diário Integrado
- ✅ Integração em tempo real com https://presentediario.rtmbrasil.org.br/
- ✅ Carregamento automático do conteúdo diário
- ✅ Navegação entre datas (anterior/próximo)
- ✅ Atualização automática a cada hora
- ✅ Fallback para conteúdo padrão em caso de erro

## Como usar

### Instalação
```bash
npm install
# ou
pnpm install
```

### Desenvolvimento
```bash
npm run dev
# ou
pnpm run dev
```

### Build para produção
```bash
npm run build
# ou
pnpm run build
```

## Arquivos Modificados

1. `src/components/Header.tsx` - Correção das referências das logos
2. `public/logoIPPI.png` - Nova logo principal
3. `public/Ipb_logo.png` - Nova logo da IPB
4. `src/components/DevotionalReader.tsx` - Componente do devocional (já existia)

## Funcionalidades do Devocional

- Carregamento automático do devocional do dia atual
- Navegação para dias anteriores e próximos
- Botão para voltar ao dia atual
- Botão de atualização manual
- Link direto para o site original
- Exibição de data, versículo, conteúdo e autor
- Última atualização com timestamp

## Tecnologias Utilizadas

- React + TypeScript
- Vite
- Tailwind CSS
- Lucide React (ícones)
- API de proxy CORS para buscar conteúdo externo

## Observações

- O devocional usa um proxy CORS (allorigins.win) para contornar limitações de cross-origin
- Em caso de falha na conexão, o sistema exibe conteúdo padrão
- As logos estão otimizadas e responsivas para diferentes tamanhos de tela

