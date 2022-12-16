package com.example.tipphub;


import com.example.tipphub.hubSystem.HubSystem;
import com.example.tipphub.hubSystem.HubSystemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class TipphubApplication {
	public static void main(String[] args) {
		SpringApplication.run(TipphubApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(HubSystemRepository repository){
		return args -> {
			if(repository.findAll().size() < 1){
				HubSystem system = new HubSystem(LocalDate.now());
				repository.save(system);
			}
		};
	}

}

