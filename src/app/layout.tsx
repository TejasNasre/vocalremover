// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import Navbar from "@/components/Navbar/Navbar";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

export const metadata = {
  title: "Vocalremover Clone",
  description: "videoDubber.ai Submission",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark">
          <div style={{ display: "flex", height: "100vh" }}>
            <Navbar />

            {children}
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
