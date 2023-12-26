package ru.marthastudios.licenserseller.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Builder
@Table(name = "calls_table")
public class Call {
    @Id
    private Long id;
    @Column("first_name")
    private String firstName;
    @Column("phone_number")
    private String phoneNumber;
    @Column("created_at")
    private Long createdAt;
}
