package ru.marthastudios.licenserseller.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import ru.marthastudios.licenserseller.dto.OrderDto;
import ru.marthastudios.licenserseller.model.Order;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderToOrderDtoMapper {
    @Mappings({
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "firstName", source = "firstName"),
            @Mapping(target = "phoneNumber", source = "phoneNumber"),
            @Mapping(target = "data", source = "data"),
            @Mapping(target = "createdAt", source = "createdAt")
    })
    OrderDto orderToOrderDto(Order order);

    @Mappings({
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "firstName", source = "firstName"),
            @Mapping(target = "phoneNumber", source = "phoneNumber"),
            @Mapping(target = "data", source = "data"),
            @Mapping(target = "createdAt", source = "createdAt")
    })
    List<OrderDto> orderListToOrderDtoList(List<Order> orderList);
}
