package com.GrooveShop.grooveshop.services;

import com.GrooveShop.grooveshop.entities.DetallePedido;
import com.GrooveShop.grooveshop.entities.Instrumento;
import com.GrooveShop.grooveshop.entities.Pedido;
import com.GrooveShop.grooveshop.repositories.DetallePedidoRepository;
import com.GrooveShop.grooveshop.repositories.InstrumentoRepository;
import com.GrooveShop.grooveshop.repositories.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    @Autowired
    private InstrumentoRepository instrumentoRepository;

    @Transactional
    public Pedido crearPedido(String nombreCliente, String correoCliente, List<DetallePedido> detallesSolicitados) {

        Pedido pedido = new Pedido();
        pedido.setNombreCliente(nombreCliente);
        pedido.setCorreoCliente(correoCliente);
        pedido.setFechaCreacion(LocalDateTime.now());
        pedido.setEstado("COMPLETADO");
        pedido.setTotal(BigDecimal.ZERO);

        pedido = pedidoRepository.save(pedido);

        BigDecimal totalAcumulado = BigDecimal.ZERO;

        for (DetallePedido detalle : detallesSolicitados) {

            Instrumento instrumentoBD = instrumentoRepository.findById(detalle.getInstrumento().getId())
                    .orElseThrow(() -> new RuntimeException("Instrumento no encontrado con ID: " + detalle.getInstrumento().getId()));

            if (instrumentoBD.getStock() < detalle.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para: " + instrumentoBD.getNombre() +
                        " (Disponibles: " + instrumentoBD.getStock() + ")");
            }
            instrumentoBD.setStock(instrumentoBD.getStock() - detalle.getCantidad());
            instrumentoRepository.save(instrumentoBD);

            BigDecimal subtotal = instrumentoBD.getPrecio().multiply(BigDecimal.valueOf(detalle.getCantidad()));
            totalAcumulado = totalAcumulado.add(subtotal);

            detalle.setPedido(pedido);
            detalle.setInstrumento(instrumentoBD);
            detalle.setPrecioUnitario(instrumentoBD.getPrecio());

            detallePedidoRepository.save(detalle);
        }

        pedido.setTotal(totalAcumulado);
        return pedidoRepository.save(pedido);
    }
}
