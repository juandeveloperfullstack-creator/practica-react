import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";

function Home() {
    const navigate = useNavigate();
    const cart = useStore((state) => state.cart);
    const removeFromCart = useStore((state) => state.removeFromCart);
    const clearCart = useStore((state) => state.clearCart);

    // Calcula el valor total del carrito
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.cantidad,
        0
    );

    return (
        <section className="mx-auto max-w-4xl p-6">
            <div className="mb-8 rounded-xl bg-white p-6 shadow">
                <h1 className="text-2xl font-bold text-slate-900">
                    Práctica de React — Rutas, APIs y Zustand
                </h1>
                <p className="mt-2 text-slate-600">
                    Explora productos con fetch o Axios, agrégalos al estado global y revisa el carrito aquí.
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                    <button
                        onClick={() => navigate("/fetch")}
                        className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700"
                    >
                        Ir a Fetch
                    </button>
                    <button
                        onClick={() => navigate("/axios")}
                        className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600"
                    >
                        Ir a Axios
                    </button>
                </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
                <h2 className="text-xl font-bold text-slate-900">Carrito de compras</h2>

                {cart.length === 0 ? (
                    <p className="mt-3 text-slate-500">El carrito está vacío.</p>
                ) : (
                    <div className="mt-4 space-y-3">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between rounded-lg border border-slate-200 p-3"
                            >
                                <div>
                                    <p className="font-semibold text-slate-800">{item.title}</p>
                                    <p className="text-sm text-slate-500">
                                        ${item.price} x {item.cantidad} = $
                                        {(item.price * item.cantidad).toFixed(2)}
                                    </p>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="rounded bg-red-100 px-3 py-1 text-sm font-semibold text-red-600 hover:bg-red-200"
                                >
                                    Quitar
                                </button>
                            </div>
                        ))}

                        <div className="flex items-center justify-between border-t pt-4">
                            <span className="text-lg font-bold text-slate-900">
                                Total: ${total.toFixed(2)}
                            </span>
                            <button
                                onClick={clearCart}
                                className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900"
                            >
                                Vaciar carrito
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Home;