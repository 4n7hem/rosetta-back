package com.rosetta;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class RosettaApplication {

	public static void main(String[] args) {
		SpringApplication.run(RosettaApplication.class, args);
	}

}
