import MarketNavbar from "./MarketNavbar";

//Market footer
import MarketFooter from "./MarketFooter";

function MarketplaceLayout({ background, children }) {
  return (
    <div className="flex flex-col h-screen">
      <MarketNavbar />
      {children}
      <MarketFooter />
    </div>
  );
}

export default MarketplaceLayout;
