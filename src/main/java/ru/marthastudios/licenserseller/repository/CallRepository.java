package ru.marthastudios.licenserseller.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.marthastudios.licenserseller.model.Call;

@Repository
public interface CallRepository extends CrudRepository<Call, Long> {
}
