package ru.marthastudios.licenserseller.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.marthastudios.licenserseller.dto.OrderDto;
import ru.marthastudios.licenserseller.mapper.OrderToOrderDtoMapperImpl;
import ru.marthastudios.licenserseller.model.Order;
import ru.marthastudios.licenserseller.repository.OrderRepository;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderToOrderDtoMapperImpl orderToOrderDtoMapper;

    public OrderDto create(OrderDto orderDto){
        Order order = Order.builder()
                .phoneNumber(orderDto.getPhoneNumber())
                .firstName(orderDto.getFirstName())
                .data(orderDto.getData())
                .createdAt(System.currentTimeMillis())
                .build();

        return orderToOrderDtoMapper.orderToOrderDto(orderRepository.save(order));
    }

    public List<OrderDto> getAll(){
        Iterable<Order> orderIterable = orderRepository.findAll();

        return orderToOrderDtoMapper.orderListToOrderDtoList(StreamSupport.stream(orderIterable.spliterator(), false).toList());
    }

    public void deleteById(long id){
        orderRepository.deleteById(id);
    }
}
