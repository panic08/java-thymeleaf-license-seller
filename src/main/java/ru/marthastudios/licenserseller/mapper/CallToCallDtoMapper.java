package ru.marthastudios.licenserseller.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import ru.marthastudios.licenserseller.dto.CallDto;
import ru.marthastudios.licenserseller.model.Call;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CallToCallDtoMapper {
    @Mappings({
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "firstName", source = "firstName"),
            @Mapping(target = "phoneNumber", source = "phoneNumber"),
            @Mapping(target = "createdAt", source = "createdAt")
    })
    CallDto callToCallDto(Call call);

    @Mappings({
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "firstName", source = "firstName"),
            @Mapping(target = "phoneNumber", source = "phoneNumber"),
            @Mapping(target = "createdAt", source = "createdAt")
    })
    List<CallDto> callListToCallDtoList(List<Call> callDtoList);
}
