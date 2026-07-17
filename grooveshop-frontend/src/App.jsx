import React, { useState, useEffect } from 'react';
import InstrumentCard from './components/InstrumentCard';
import { obtenerInstrumentos, crearPedido } from './services/api';

export default function App() {

  const [instrumentos, setInstrumentos] = useState([]); // Guarda la lista de la BD
  const [carrito, setCarrito] = useState([]); // Guarda los productos agregados
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      const datos = await obtenerInstrumentos();
      setInstrumentos(datos);
      setCargando(false);
    };
    cargarDatos();
  }, []);

  const agregarAlCarrito = (instrumento) => {
    const existe = carrito.find(item => item.instrumento.id === instrumento.id);
    if (existe) {
      if (existe.cantidad < instrumento.stock) {
        setCarrito(carrito.map(item =>
            item.instrumento.id === instrumento.id
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
        ));
      } else {
        alert("¡No hay más stock disponible de este instrumento!");
      }
    } else {
      setCarrito([...carrito, { instrumento, cantidad: 1 }]);
    }
  };

  const procesarCheckout = async () => {

    const nombre = prompt("Ingresa tu nombre para la factura:");
    const correo = prompt("Ingresa tu correo electrónico:");

    if (!nombre || !correo) {
      alert("Debes completar tus datos para proceder con la compra.");
      return;
    }

    const datosPedido = {
      nombreCliente: nombre,
      correoCliente: correo,
      detalles: carrito.map(item => ({
        instrumento: { id: item.instrumento.id },
        cantidad: item.cantidad
      }))
    };

    try {

      const pedidoCreado = await crearPedido(datosPedido);

      alert(`¡Compra completada exitosamente!\nPedido N°: ${pedidoCreado.id}\nTotal: $${pedidoCreado.total.toFixed(2)}`);


      setCarrito([]);


      const datosActualizados = await obtenerInstrumentos();
      setInstrumentos(datosActualizados);

    } catch (error) {
      alert(`Hubo un error al procesar tu compra: ${error.message}`);
    }
  };

  return (
      <div style={styles.contenedor}>
        <header style={styles.header}>
          <h1>GrooveShop</h1>
          <p>Tu tienda de instrumentos favorita en 2026</p>
        </header>

        {cargando ? (
            <h2 style={{ textAlign: 'center' }}>Cargando catálogo...</h2>
        ) : (
            <main style={styles.layout}>
              <section style={styles.seccionCatalogo}>
                <h2>Catálogo de Instrumentos</h2>
                <div style={styles.grid}>
                  {instrumentos.map(inst => (
                      <InstrumentCard
                          key={inst.id}
                          instrumento={inst}
                          alAgregarAlCarrito={agregarAlCarrito}
                      />
                  ))}
                </div>
              </section>

              <aside style={styles.sidebar}>
                <h2>Tu Carrito </h2>
                {carrito.length === 0 ? (
                    <p>El carrito está vacío.</p>
                ) : (
                    <div>
                      <ul style={styles.listaCarrito}>
                        {carrito.map(item => (
                            <li key={item.instrumento.id} style={styles.itemCarrito}>
                              <span>{item.instrumento.nombre} (x{item.cantidad})</span>
                              <strong>${(item.instrumento.precio * item.cantidad).toFixed(2)}</strong>
                            </li>
                        ))}
                      </ul>
                      <hr />
                      <div style={styles.totalContainer}>
                        <h3>Total:</h3>
                        <h3>
                          ${carrito.reduce((sum, item) => sum + (item.instrumento.price || item.instrumento.precio) * item.cantidad, 0).toFixed(2)}
                        </h3>
                      </div>
                      <button onClick={procesarCheckout} style={styles.botonCheckout}>Proceder al Pago </button>
                    </div>
                )}
              </aside>
            </main>
        )}
      </div>
  );
}

const styles = {
  contenedor: {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    backgroundColor: '#2c3e50',
    color: '#fff',
    padding: '20px',
    borderRadius: '8px'
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
    gap: '30px'
  },
  seccionCatalogo: {
    padding: '10px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px'
  },
  sidebar: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    height: 'fit-content'
  },
  listaCarrito: {
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },
  itemCarrito: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
    fontSize: '14px'
  },
  totalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '15px 0'
  },
  botonCheckout: {
    width: '100%',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    padding: '12px',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

