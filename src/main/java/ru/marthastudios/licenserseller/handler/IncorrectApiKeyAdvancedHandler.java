package ru.marthastudios.licenserseller.handler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ru.marthastudios.licenserseller.dto.ErrorDto;
import ru.marthastudios.licenserseller.exception.IncorrectKeyException;

@RestControllerAdvice
public class IncorrectApiKeyAdvancedHandler {
    @ResponseBody
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(IncorrectKeyException.class)
    public ErrorDto handleIncorrectApiKeyException(IncorrectKeyException incorrectKeyException){
        return new ErrorDto(incorrectKeyException.getMessage());
    }
}
