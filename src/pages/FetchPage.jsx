import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";

function FetchPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const addToCart = useStore((state) => state.addToCart);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch("https://fakestoreapi.com/products");

                // fetch no rechaza en 404/500, por eso verificamos response.ok
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message || "No se pudieron cargar los productos");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <p className="p-6 text-slate-600">Cargando productos con fetch...</p>;
    }

    if (error) {
        return <p className="p-6 font-semibold text-red-600">Error: {error}</p>;
    }

    return (
        <section className="mx-auto max-w-6xl p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-slate-900">
                    Productos con Fetch
                </h1>

                <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800"
                />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
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
                            <span className="font-bold text-emerald-700">
                                ${product.price}
                            </span>
                            <button
                                onClick={() => addToCart(product)}
                                className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
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

export default FetchPage;