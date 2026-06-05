
import SecondNavbar from "../Components/SecondNavbar";
import Hero from "../Components/Hero";
import Deals from "../Components/Deals";
import ProductSection from "./ProductsSection.jsx";
import Services from "../Components/Services";
import Customers from "../Components/Customers";
import SendQuoteSection from "../Components/SendQuoteSection";
import RecommendedItems from "../Components/RecommendedItems";

export default function Home() {
  return (
    <>
      <SecondNavbar/>
          <Hero/>
<Deals/>
          <ProductSection title="Home and outdoor"/>
          <Customers title="Consumer, electronic and gadgets"/>
          <SendQuoteSection/>
          <RecommendedItems/>
        <Services/>
          </>
  );
}
