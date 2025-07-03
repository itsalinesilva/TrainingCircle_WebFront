import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    
    // Adiciona o listener
    media.addEventListener('change', listener);
    
    // Atualiza o estado inicial
    setMatches(media.matches);
    
    // Remove o listener quando o componente for desmontado
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}
