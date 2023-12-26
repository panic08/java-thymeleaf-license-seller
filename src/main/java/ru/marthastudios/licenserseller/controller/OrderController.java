package ru.marthastudios.licenserseller.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import ru.marthastudios.licenserseller.dto.OrderDto;
import ru.marthastudios.licenserseller.exception.IncorrectKeyException;
import ru.marthastudios.licenserseller.service.OrderService;

import java.util.List;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    @Value("${admin.key}")
    private String adminKey;

    @GetMapping("/getAll")
    public List<OrderDto> getAll(HttpServletRequest httpServletRequest){
        if (httpServletRequest.getHeader("Authorization") != null && httpServletRequest.getHeader("Authorization").equals(adminKey)){
            return orderService.getAll();
        }

        throw new IncorrectKeyException("You're not logged in correctly");
    }

    @PostMapping
    public OrderDto create(@RequestBody @Valid OrderDto orderDto){
        return orderService.create(orderDto);
    }

    @DeleteMapping("/{id}")
    public void delete(HttpServletRequest httpServletRequest, @PathVariable("id") long id){
        if (httpServletRequest.getHeader("Authorization") != null && httpServletRequest.getHeader("Authorization").equals(adminKey)){
            orderService.deleteById(id);
            return;
        }

        throw new IncorrectKeyException("You're not logged in correctly");
    }
}
