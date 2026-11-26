import { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "../store/useStore";

const CATEGORIES = [
    { value: "all", label: "Todas" },
    { value: "smartphones", label: "Celulares" },
    { value: "laptops", label: "Portátiles" },
    { value: "groceries", label: "Mercado" },
];

function AxiosPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [category, setCategory] = useState("all");

    const addToCart = useStore((state) => state.addToCart);

    useEffect(() => {
        const fetchWithAxios = async () => {
            try {
                setLoading(true);
                setError("");

                const url =
                    category === "all"
                        ? "https://dummyjson.com/products?limit=12"
                        : `https://dummyjson.com/products/category/${category}`;

                // Axios convierte la respuesta a JSON automáticamente en response.data
                const response = await axios.get(url);

                // Normalizamos los campos para que coincidan con los del carrito
                const normalized = response.data.products.map((item) => ({
                    id: `dj-${item.id}`,
                    title: item.title,
                    price: item.price,
                    image: item.thumbnail,
                }));

                setProducts(normalized);
            } catch (err) {
                setError(err.message || "Error al consultar DummyJSON");
            } finally {
                setLoading(false);
            }
        };

        fetchWithAxios();
    }, [category]); // Se ejecuta al montar Y cada vez que cambie "category"

    if (loading) {
        return <p className="p-6 text-slate-600">Cargando productos con Axios...</p>;
    }

    if (error) {
        return <p className="p-6 font-semibold text-red-600">Error: {error}</p>;
    }

    return (
        <section className="mx-auto max-w-6xl p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-slate-900">
                    Productos con Axios
                </h1>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800"
                >
                    {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <article
                        key={product.id}
                        className="flex flex-col justify-between rounded-xl bg-white p-4 shadow"
                    >
                        <div>
                            <img
                                src={product.image}
                                alt={product.title}
                                className="mx-auto mb-4 h-40 object-contain"
                            />
                            <h2 className="line-clamp-2 text-sm font-bold text-slate-800">
                                {product.title}
                            </h2>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <span className="font-bold text-orange-600">
                                ${product.price}
                            </span>
                            <button
                                onClick={() => addToCart(product)}
                                className="rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-orange-600"
                            >
                                Agregar
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default AxiosPage;