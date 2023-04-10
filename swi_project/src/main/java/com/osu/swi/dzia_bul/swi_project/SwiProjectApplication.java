package com.osu.swi.dzia_bul.swi_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.osu.swi.dzia_bul.swi_project.repositories")
@EntityScan(basePackages = "com.osu.swi.dzia_bul.swi_project.*")
public class SwiProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(SwiProjectApplication.class, args);
	}

}