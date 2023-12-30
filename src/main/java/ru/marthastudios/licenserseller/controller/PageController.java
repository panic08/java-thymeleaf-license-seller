package ru.marthastudios.licenserseller.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
    @GetMapping
    public String mainPage(){
        return "main";
    }
    @GetMapping("/special")
    public String specialPage(){
        return "special";
    }
    @GetMapping("/gims")
    public String gimsPage(){
        return "gims";
    }

    @GetMapping("/feedback")
    public String feedbackPage(){
        return "feedback";
    }

    @GetMapping("/delivery")
    public String deliveryPage(){
        return "delivery";
    }

    @GetMapping("/panel")
    public String panelPage(){
        return "admin";
    }
}
