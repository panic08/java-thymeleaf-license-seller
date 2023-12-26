package ru.marthastudios.licenserseller.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class CallDto {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long id;
    @NotNull(message = "The first name must not be blank")
    @NotBlank(message = "The first name must not be blank")
    private String firstName;
    @NotBlank(message = "The phone number must not be blank")
    @Size(min = 10, max = 15, message = "The phone number must be correct")
    @Pattern(regexp = "\\+\\d+", message = "The phone number must be correct")
    private String phoneNumber;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long createdAt;
}
