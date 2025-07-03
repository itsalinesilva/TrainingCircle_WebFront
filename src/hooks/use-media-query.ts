import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    console.log('=== useMediaQuery inicializado ===');
    console.log('Query:', query);
    
    const media = window.matchMedia(query);
    
    const updateMatches = () => {
      console.log('Atualizando matches para:', media.matches, 'Query:', query);
      setMatches(media.matches);
    };
    
    // Atualiza o estado inicial
    if (media.matches !== matches) {
      updateMatches();
    }
    
    const listener = (e: MediaQueryListEvent) => {
      console.log('Mudança detectada no media query:', e.media, 'matches:', e.matches);
      updateMatches();
    };
    
    // Adiciona o listener
    media.addEventListener('change', listener);
    
    // Verificação inicial
    console.log('Verificação inicial - Largura:', window.innerWidth, 'matches:', media.matches);
    
    // Remove o listener quando o componente for desmontado
    return () => {
      console.log('Removendo listener do useMediaQuery');
      media.removeEventListener('change', listener);
    };
  }, [query]);

  console.log('useMediaQuery retornando:', matches, 'para query:', query);
  return matches;
}
