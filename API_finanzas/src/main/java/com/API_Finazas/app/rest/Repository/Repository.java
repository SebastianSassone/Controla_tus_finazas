package com.API_Finazas.app.rest.Repository;

import com.API_Finazas.app.rest.Model.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface Repository extends JpaRepository<Model, Integer> {

    @Query("SELECT COALESCE(SUM(m.valor), 0) FROM Model m WHERE m.categoria = ?1 AND m.user_id = ?2")
    Double sumarValoresPorCategoriaAndUserId(@Param("categoria") String categoria, @Param("userId") int user_id);

    @Query("SELECT m FROM Model m WHERE m.user_id = :user_id")
    List<Model> findModelsByUserId(@Param("user_id") int user_id);

    @Query("SELECT COALESCE(SUM(subquery.suma_categoria), 0) as suma_total " +
            "FROM (SELECT COALESCE(SUM(m.valor), 0) as suma_categoria " +
            "      FROM Model m " +
            "      WHERE m.user_id = :userId " +
            "      GROUP BY m.categoria) as subquery")
    Double sumarTotalValoresPorCategoriaAndUserId(@Param("userId") Integer userId);
}