package com.API_Finazas.app.rest.Repository;

import com.API_Finazas.app.rest.Model.Model_ingre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface Repository_ingre extends JpaRepository<Model_ingre, Integer> {

    @Query("SELECT m FROM Model_ingre m WHERE m.categoria = ?1 AND m.user_id = ?2")
    List<Model_ingre> obtenerElementosPorCategoriaAndUserId(@Param("categoria") String categoria, @Param("userId") int user_id);

    @Query("SELECT m FROM Model_ingre m WHERE m.user_id = :user_id")
    List<Model_ingre> findModelsByUserId(@Param("user_id") int user_id);




}
