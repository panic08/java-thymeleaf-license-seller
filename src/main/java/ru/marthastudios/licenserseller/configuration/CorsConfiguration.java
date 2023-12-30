package ru.marthastudios.licenserseller.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfiguration implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedHeaders("Authorization")
                .allowedMethods("*")
                .exposedHeaders("Authorization");
//        registry.addMapping("/**")
//                .allowedOrigins("http://192.168.100.6:5500")
//                .allowedHeaders("Authorization")
//                .allowedMethods("*")
//                .exposedHeaders("Authorization");
    }
}
