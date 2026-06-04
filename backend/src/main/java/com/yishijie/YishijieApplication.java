package com.yishijie;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.yishijie")
public class YishijieApplication {

    public static void main(String[] args) {
        SpringApplication.run(YishijieApplication.class, args);
    }

}
