package ru.marthastudios.licenserseller.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Value("${admin.key}")
    private String adminKey;
    @PostMapping("/login")
    public ResponseEntity<Object> handleLogin(@RequestParam("key") String key, HttpServletResponse httpServletResponse){
        if (key.equals(adminKey)){

            httpServletResponse.setHeader("Authorization", adminKey);

            return new ResponseEntity<>(HttpStatusCode.valueOf(200));
        }

        return new ResponseEntity<>(HttpStatusCode.valueOf(400));
    }
}
