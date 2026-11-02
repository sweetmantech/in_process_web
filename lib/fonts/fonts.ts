import localFont from "next/font/local";

export const archivo = localFont({
  src: "../../app/fonts/Archivo-Regular.woff2",
  variable: "--font-archivo",
  display: "swap",
});

export const archivoMedium = localFont({
  src: "../../app/fonts/Archivo-Medium.woff2",
  variable: "--font-archivo-medium",
  display: "swap",
});

export const archivoBold = localFont({
  src: "../../app/fonts/Archivo-Bold.woff2",
  variable: "--font-archivo-bold",
  display: "swap",
  preload: false,
});

export const spectralItalic = localFont({
  src: "../../app/fonts/Spectral-Italic.woff2",
  variable: "--font-spectral-italic",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const spectral = localFont({
  src: "../../app/fonts/Spectral-Regular.woff2",
  variable: "--font-spectral",
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
});

export const spectralMedium = localFont({
  src: "../../app/fonts/Spectral-Medium.woff2",
  variable: "--font-spectral-medium",
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
});

export const spectralBold = localFont({
  src: "../../app/fonts/Spectral-Bold.woff2",
  variable: "--font-spectral-bold",
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
});

export const spectralMediumItalic = localFont({
  src: "../../app/fonts/Spectral-MediumItalic.woff2",
  variable: "--font-spectral-medium-italic",
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
});
