package ru.marthastudios.licenserseller.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
    @GetMapping("/panel")
    public String panelPage(){
        return "admin";
    }
}
