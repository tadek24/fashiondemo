import { NextSeo } from "next-seo";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, MapPin, Package, XCircle, RotateCcw, CheckCircle } from "lucide-react";

export default function Account() {
  const [orders, setOrders] = useState([
    { id: "ORD-9281-PL", date: "12 kwi 2026", total: 1200.00, status: "W realizacji", items: ["Suknia Wieczorowa z Drapowaniem"] },
    { id: "ORD-5412-PL", date: "02 mar 2026", total: 420.00, status: "Wysłano", items: ["Plisowana Sukienka Midi"] }
  ]);
  
  const [toast, setToast] = useState(null);
  
  const [address, setAddress] = useState({
    street: "Mokotowska 15/2",
    city: "Warszawa",
    zip: "00-561",
    country: "Polska"
  });
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCancel = (id) => {
    if(confirm("Czy na pewno chcesz anulować to zamówienie?")) {
      setOrders(orders.map(o => o.id === id ? { ...o, status: "Anulowane" } : o));
      showToast(`Zamówienie ${id} zostało anulowane.`);
    }
  };

  const handleReturn = (id) => {
    showToast(`Rozpoczęto procedurę zwrotu dla ${id}. Instrukcje wysłano na e-mail.`);
  };

  return (
    <>
      <NextSeo 
        title="Moje Konto | VELOUR"
        description="Zarządzaj swoimi zamówieniami i profilem."
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-foreground text-background px-6 py-3 rounded-sm shadow-2xl z-50 text-[10px] font-sans uppercase tracking-[0.2em] flex items-center gap-3"
          >
            <CheckCircle size={16} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 lg:px-12 py-32 mt-12 max-w-6xl">
        
        <h1 className="text-4xl md:text-6xl font-serif mb-16 border-b border-border/50 pb-8">Witaj, Ewa.</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
          
          {/* Main Area: Orders */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <Package size={20} className="text-foreground/50" />
              <h2 className="text-sm font-sans uppercase tracking-[0.2em] font-medium">Twoje Zamówienia</h2>
            </div>

            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border border-border/50 p-6 relative overflow-hidden group">
                  <div className="flex flex-col md:flex-row justify-between mb-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-1">{order.date}</p>
                      <p className="font-serif text-lg">{order.id}</p>
                      <p className="text-sm text-foreground/70 mt-2">{order.items.join(", ")}</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-left md:text-right">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-1">Kwota</p>
                      <p className="font-serif text-lg">${order.total.toFixed(2)}</p>
                      <p className={`text-xs mt-2 font-medium ${order.status === 'Anulowane' ? 'text-red-500/70' : 'text-foreground'}`}>
                        {order.status}
                      </p>
                    </div>
                  </div>

                  {/* Actions mapping Allegro Premium Style */}
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-border/30">
                    {order.status === "W realizacji" && (
                      <button onClick={() => handleCancel(order.id)} className="flex items-center gap-2 text-[10px] uppercase font-sans tracking-[0.1em] text-foreground/60 hover:text-red-500 transition-colors">
                        <XCircle size={14} /> Anuluj zamówienie
                      </button>
                    )}
                    {order.status === "Wysłano" && (
                      <button onClick={() => handleReturn(order.id)} className="flex items-center gap-2 text-[10px] uppercase font-sans tracking-[0.1em] text-foreground/60 hover:text-foreground transition-colors">
                        <RotateCcw size={14} /> Szybki zwrot
                      </button>
                    )}
                    <button className="flex items-center gap-2 text-[10px] uppercase font-sans tracking-[0.1em] text-foreground/60 hover:text-foreground transition-colors ml-auto">
                      Szczegóły
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar: Discounts & Info */}
          <div className="space-y-16">
            
            {/* Discount Codes */}
            <div>
              <h2 className="text-[10px] font-sans uppercase tracking-[0.2em] font-medium mb-6 text-foreground/50">Kody Rabatowe</h2>
              <div className="bg-foreground/5 p-6 border border-border/50">
                <p className="text-xs uppercase tracking-[0.2em] mb-4">Witaj w klubie</p>
                <div className="flex items-center justify-between border-b border-foreground pb-2">
                  <p className="font-serif text-2xl">WITAJ10</p>
                  <button onClick={() => showToast("Skopiowano kod!")} className="text-foreground/50 hover:text-foreground transition-colors">
                    <Copy size={18} />
                  </button>
                </div>
                <p className="text-[10px] mt-4 text-foreground/60">-10% na nową kolekcję. Ważny bezterminowo.</p>
              </div>
            </div>

            {/* Address Info */}
            <div>
              <div className="flex justify-between items-end mb-6 text-foreground/50">
                <h2 className="text-[10px] font-sans uppercase tracking-[0.2em] font-medium">Dane Dostawy</h2>
                <button 
                  onClick={() => setIsEditingAddress(!isEditingAddress)} 
                  className="text-[10px] uppercase tracking-widest hover:text-foreground"
                >
                  {isEditingAddress ? "Zapisz" : "Edytuj"}
                </button>
              </div>
              
              <div className="flex gap-4">
                <MapPin size={20} className="text-foreground/40 shrink-0" />
                <div className="w-full">
                  {isEditingAddress ? (
                    <div className="space-y-4">
                      <input type="text" value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} className="w-full bg-transparent border-b border-border focus:outline-none focus:border-foreground text-sm py-1" />
                      <input type="text" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} className="w-full bg-transparent border-b border-border focus:outline-none focus:border-foreground text-sm py-1" />
                      <input type="text" value={address.zip} onChange={(e) => setAddress({...address, zip: e.target.value})} className="w-full bg-transparent border-b border-border focus:outline-none focus:border-foreground text-sm py-1" />
                    </div>
                  ) : (
                    <div className="text-sm leading-relaxed text-foreground/80 font-sans">
                      <p>{address.street}</p>
                      <p>{address.zip} {address.city}</p>
                      <p className="mt-2 text-foreground/50">{address.country}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
