import React, { createContext, useContext, useState, useCallback } from 'react';

interface ExerciseInfo {
  id: string; // Stable semantic ID
  difficulty: string;
  pathname: string;
}

interface ExerciseContextType {
  registerExercise: (difficulty: string, semanticId: string) => void;
  unregisterExercise: (id: string) => void;
  exercises: ExerciseInfo[];
  getStorageKey: (id: string) => string;
}

const ExerciseContext = createContext<ExerciseContextType | null>(null);

// Bulgarian to English transliteration map
const TRANSLITERATION_MAP: Record<string, string> = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ж': 'zh', 'з': 'z',
  'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p',
  'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch',
  'ш': 'sh', 'щ': 'sht', 'ъ': 'a', 'ь': 'y', 'ю': 'yu', 'я': 'ya',
  'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ж': 'Zh', 'З': 'Z',
  'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P',
  'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch',
  'Ш': 'Sh', 'Щ': 'Sht', 'Ъ': 'A', 'Ь': 'Y', 'Ю': 'Yu', 'Я': 'Ya'
};

function transliterateBulgarian(text: string): string {
  return text.split('').map(char => TRANSLITERATION_MAP[char] || char).join('');
}

export function slugify(text: string): string {
  return transliterateBulgarian(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function ExerciseProvider({ children }: { children: React.ReactNode }) {
  const [exercises, setExercises] = useState<ExerciseInfo[]>([]);

  // Get pathname directly when needed (don't store in state to avoid re-renders)
  const getPathname = useCallback(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '';
  }, []);

  const registerExercise = useCallback((difficulty: string, semanticId: string) => {
    const currentPathname = getPathname();

    setExercises(prev => {
      // Avoid duplicates
      if (prev.find(ex => ex.id === semanticId)) {
        return prev;
      }
      return [...prev, { id: semanticId, difficulty, pathname: currentPathname }];
    });
  }, [getPathname]);

  const unregisterExercise = useCallback((id: string) => {
    setExercises(prev => prev.filter(ex => ex.id !== id));
  }, []);

  const getStorageKey = useCallback((id: string) => {
    const currentPathname = getPathname();
    return `${currentPathname}_exercise_${id}`;
  }, [getPathname]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(
    () => ({ registerExercise, unregisterExercise, exercises, getStorageKey }),
    [registerExercise, unregisterExercise, exercises, getStorageKey]
  );

  return (
    <ExerciseContext.Provider value={contextValue}>
      {children}
    </ExerciseContext.Provider>
  );
}

export function useExerciseContext() {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error('useExerciseContext must be used within ExerciseProvider');
  }
  return context;
}
