package ru.marthastudios.licenserseller.handler;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ru.marthastudios.licenserseller.dto.ErrorDto;

@RestControllerAdvice
public class GlobalValidationExceptionAdvancedHandler {
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorDto handleException(MethodArgumentNotValidException e) {
        return processErrors(e);
    }

    private ErrorDto processErrors(MethodArgumentNotValidException e) {
        ErrorDto errorDto = new ErrorDto(e.getBindingResult().getFieldError().getDefaultMessage());

        return errorDto;
    }
}
