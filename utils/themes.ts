export interface Theme {
  id: string;
  label: string;
  background: string;
}

export const themes: Theme[] = [
  { id: "claro", label: "Claro", background: "bg-gray-100" },
  { id: "escuro", label: "Escuro", background: "bg-gray-900 dark" },
  { id: "ceu-sereno", label: "Céu Sereno", background: "gradiente-ceu-sereno" },
  { id: "oceano-profundo", label: "Oceano Profundo", background: "gradiente-oceano-profundo" },
  { id: "frescor-menta", label: "Frescor da Menta", background: "gradiente-frescor-menta" },
  { id: "aurora-verde", label: "Aurora Verde", background: "gradiente-aurora-verde" },
  { id: "por-do-sol", label: "Pôr do Sol", background: "gradiente-por-do-sol" },
  { id: "noite-nublada", label: "Noite Nublada", background: "gradiente-noite-nublada" },
];

export const getThemeById = (id: string): Theme | undefined => {
  return themes.find((theme) => theme.id === id);
};