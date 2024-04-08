'use client'

import { MantineProvider, createTheme } from "@mantine/core"
import { generateColors } from "@mantine/colors-generator"

/**
* Theme provider
* @param children type React.ReactNode
* @returns Theme provider that generates mantine theme
*/
const ThemeProviderMantine = ({ children }: { children: React.ReactNode }) => {
    const theme = createTheme({
        colors: {
            brand: generateColors('#0071c1'),
        },
        primaryColor: 'brand'
    });

    return (
        // <MantineProvider theme= { theme } >
        // { children }
        // < /MantineProvider>
        <MantineProvider theme={theme}>
            {children}
        </MantineProvider>
    );
}

export default ThemeProviderMantine;