package com.GrooveShop.grooveshop.controllers;

import com.GrooveShop.grooveshop.entities.Instrumento;
import com.GrooveShop.grooveshop.repositories.InstrumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/instrumentos")
public class InstrumentoController {

    @Autowired
    private InstrumentoRepository instrumentoRepository;

    @GetMapping
    public List<Instrumento> obtenerTodos() {
        return instrumentoRepository.findAll();
    }
    @org.springframework.web.bind.annotation.PostMapping
    public Instrumento crear(@org.springframework.web.bind.annotation.RequestBody Instrumento nuevoInstrumento) {
        return instrumentoRepository.save(nuevoInstrumento);
    }
}
