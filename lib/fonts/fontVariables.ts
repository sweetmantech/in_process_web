import {
  archivo,
  archivoBold,
  archivoMedium,
  spectral,
  spectralBold,
  spectralItalic,
  spectralMedium,
  spectralMediumItalic,
} from "@/lib/fonts/fonts";

export const fontVariables = [
  archivo,
  archivoMedium,
  archivoBold,
  spectral,
  spectralItalic,
  spectralMedium,
  spectralBold,
  spectralMediumItalic,
]
  .map((font) => font.variable)
  .join(" ");
