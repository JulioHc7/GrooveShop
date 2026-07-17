package com.GrooveShop.grooveshop.controllers;

import com.GrooveShop.grooveshop.entities.DetallePedido;
import com.GrooveShop.grooveshop.entities.Pedido;
import com.GrooveShop.grooveshop.services.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@org.springframework.web.bind.annotation.CrossOrigin(origins = "http://localhost:5173")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    public static class PedidoRequest {
        public String nombreCliente;
        public String correoCliente;
        public List<DetallePedido> detalles;
    }

    @PostMapping
    public Pedido procesarCompra(@RequestBody PedidoRequest request) {
        return pedidoService.crearPedido(
                request.nombreCliente,
                request.correoCliente,
                request.detalles
        );
    }
}