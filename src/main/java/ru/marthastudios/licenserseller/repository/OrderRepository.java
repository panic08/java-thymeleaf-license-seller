package ru.marthastudios.licenserseller.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.marthastudios.licenserseller.model.Order;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {
}
