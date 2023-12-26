package ru.marthastudios.licenserseller.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import ru.marthastudios.licenserseller.dto.CallDto;
import ru.marthastudios.licenserseller.exception.IncorrectKeyException;
import ru.marthastudios.licenserseller.service.CallService;

import java.util.List;

@RestController
@RequestMapping("/call")
@RequiredArgsConstructor
public class CallController {
    private final CallService callService;
    @Value("${admin.key}")
    private String adminKey;

    @GetMapping("/getAll")
    public List<CallDto> getAll(HttpServletRequest httpServletRequest) {
        if (httpServletRequest.getHeader("Authorization") != null && httpServletRequest.getHeader("Authorization").equals(adminKey)){
            return callService.getAll();
        }

        throw new IncorrectKeyException("You're not logged in correctly");
    }
    @PostMapping
    public CallDto create(@RequestBody @Valid CallDto callDto){
        return callService.create(callDto);
    }

    @DeleteMapping("/{id}")
    public void delete(HttpServletRequest httpServletRequest, @PathVariable("id") long id){
        if (httpServletRequest.getHeader("Authorization") != null && httpServletRequest.getHeader("Authorization").equals(adminKey)){
            callService.deleteById(id);
            return;
        }

        throw new IncorrectKeyException("You're not logged in correctly");
    }
}
