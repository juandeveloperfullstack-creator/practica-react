import { useNavigate, useLocation } from "react-router-dom";
import { useStore } from "../store/useStore";

const LINKS = [
    { label: "Inicio", path: "/" },
    { label: "Fetch API", path: "/fetch" },
    { label: "Axios API", path: "/axios" },
];

function Navbar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // Suma total de unidades en el carrito desde Zustand
    const totalItems = useStore((state) =>
        state.cart.reduce((acc, item) => acc + item.cantidad, 0)
    );

    return (
        <nav className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 px-6 py-4 text-white">
            <div className="flex flex-wrap gap-2">
                {LINKS.map((item) => {
                    const isActive = pathname === item.path;

                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${isActive
                                    ? "bg-emerald-500 text-slate-950 font-bold"
                                    : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                                }`}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </div>

            <span className="rounded-full bg-amber-400 px-3 py-1 text-sm font-bold text-slate-950">
                Carrito: {totalItems}
            </span>
        </nav>
    );
}

export default Navbar;