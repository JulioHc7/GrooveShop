import React, { useState, useEffect } from 'react';
import InstrumentCard from './components/InstrumentCard';
import { obtenerInstrumentos, crearPedido } from './services/api';

export default function App() {

  const [instrumentos, setInstrumentos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState("");
  const [busqueda, setBusqueda] = useState("");




// Cada vez que cambie la categoría o la búsqueda, se recargan los datos desde el Backend
  useEffect(() => {
    const filtrarDatos = async () => {
      try {
        // Traemos los datos pasando los filtros actuales
        const datos = await obtenerInstrumentos(categoriaActiva, busqueda);
        setInstrumentos(datos);
      } catch (error) {
        console.error("Error al cargar instrumentos:", error);
      } finally {
        // 🎯 ¡LÍNEA CRÍTICAL! Si no pones esto, la pantalla se queda en "Cargando..." para siempre
        setCargando(false);
      }
    };

    filtrarDatos();
  }, [categoriaActiva, busqueda]);

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

                <div style={styles.barraFiltros}>
                  <input
                      type="text"
                      placeholder="Buscar instrumento por nombre..."
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      style={styles.inputBuscar}
                  />
                  <div style={styles.botonesCategoria}>
                    <button onClick={() => setCategoriaActiva("")} style={categoriaActiva === "" ? styles.btnActivo : styles.btnInactivo}>Todos</button>
                    <button onClick={() => setCategoriaActiva("Cuerdas")} style={categoriaActiva === "Cuerdas" ? styles.btnActivo : styles.btnInactivo}>Cuerdas</button>
                    <button onClick={() => setCategoriaActiva("Percusión")} style={categoriaActiva === "Percusión" ? styles.btnActivo : styles.btnInactivo}>Percusión</button>
                    <button onClick={() => setCategoriaActiva("Teclados")} style={categoriaActiva === "Teclados" ? styles.btnActivo : styles.btnInactivo}>Teclados</button>
                    <button onClick={() => setCategoriaActiva("Vientos")} style={categoriaActiva === "Vientos" ? styles.btnActivo : styles.btnInactivo}>Vientos</button>
                  </div>
                </div>

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
    // 3fr para el catálogo y 1fr para el carrito (proporción limpia)
    gridTemplateColumns: '3fr 1fr',
    gap: '30px',
    width: '100%',
    maxWidth: '1700px',
    margin: '0 auto',
    padding: '0 20px',
    boxSizing: 'border-box'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '24px',
    marginTop: '15px'
  },
  sidebar: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    height: 'fit-content',
    position: 'sticky',
    top: '20px'
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
  },
  barraFiltros: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  inputBuscar: {
    padding: '10px 15px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
  },
  botonesCategoria: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  btnActivo: {
    padding: '8px 16px',
    backgroundColor: '#2c3e50',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s'
  },
  btnInactivo: {
    padding: '8px 16px',
    backgroundColor: '#eaeded',
    color: '#333',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },

};

