import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

import "@/app/_styles/globals.css";

export const metadata = {
  // title: "The Wild Oasis | Home",
  title: {
    template: "The Wild Oasis | %s",
    default: "The Wild Oasis | Welcome",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surronded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary-950 text-primary-100 min-h-screen">
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
