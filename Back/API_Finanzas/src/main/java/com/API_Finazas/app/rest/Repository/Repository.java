package com.API_Finazas.app.rest.Repository;

import com.API_Finazas.app.rest.Model.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface Repository extends JpaRepository<Model, Integer> {

    @Query("SELECT COALESCE(SUM(m.valor), 0) FROM Model m WHERE m.categoria = ?1 AND m.user_id = ?2")
    Double sumarValoresPorCategoriaAndUserId(String categoria, @Param("userId") int user_id);

    @Query(value = "SELECT * FROM ingresotabla m WHERE m.user_id = :userId", nativeQuery = true)
    List<Model> findModelsByUserId(@Param("userId") int userId);

   // List<Model> findModelsByUserIdAndCategoria(long user_id, String categoria);

   // List<Model> findModelsByUserId(int user_id);

}




