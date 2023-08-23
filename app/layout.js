/* 
the essence of the RootLayout component is to provide a common layout and structure for the entire application. It ensures that the StateProvider is applied to all components, enabling them to access the shared state. Additionally, it can set metadata that might be used for SEO or displaying information about the app. This component acts as a foundational layer that establishes the overall structure, state management, and potentially common styles for the application.
*/
import "./globals.css";
import StateProvider from "./StateProvider";

export const metadata = {
  title: "REST Countries API with color theme switcher",
  description: "Created by Trae Zeeofor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StateProvider>{children}</StateProvider>
      </body>
    </html>
  );
}
