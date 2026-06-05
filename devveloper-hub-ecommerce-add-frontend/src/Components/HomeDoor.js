export default function HomeOutdoorComponent() {

  const [products, setProducts] = useState([]);

  // YAHAN ADD KARO
  const addToCart = (product) => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const found = existingCart.find(
      (item) => item._id === product._id
    );

    if (found) {
      found.quantity += 1;
    } else {
      existingCart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    alert("Added to cart");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
}