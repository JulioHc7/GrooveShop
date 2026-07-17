package com.GrooveShop.grooveshop.config;

import com.GrooveShop.grooveshop.entities.Instrumento;
import com.GrooveShop.grooveshop.repositories.InstrumentoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(InstrumentoRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(new Instrumento(
                        null,
                        "Guitarra Eléctrica Fender Stratocaster",
                        "Fender",
                        "La guitarra eléctrica más icónica de la historia.",
                        new BigDecimal("1200.00"),
                        10,
                        "https://images.unsplash.com/photo-1550985616-10810253b84d",
                        "Cuerdas"
                ));

                repository.save(new Instrumento(
                        null,
                        "Batería Acústica Stage Custom",
                        "Yamaha",
                        "Batería de madera de abedul de alta calidad.",
                        new BigDecimal("950.00"),
                        5,
                        "https://images.unsplash.com/photo-1543443374-b6fe10a6ab7b",
                        "Percusión"
                ));
            }
        };
    }
}
