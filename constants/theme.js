export const COLORS = {
  primary: "#001F2D",
  secondary: "#4D626C",
  success: '#4BB543',
  error: '#ff3333',
  white: "#FFF",
  gray: "#74858C",
  orange: "#ab5e00",
}

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
}

export const FONTS = {
  bold: "Inter-Bold",
  semiBold: "Inter-SemiBold",
  medium: "Inter-Medium",
  regular: "Inter-Regular",
  light: "Inter-Light",
}

export const SHADOWS = {
  light: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  dark: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  extraDark: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.41,
    shadowRadius: 6.11,

    elevation: 20,
  },
}
