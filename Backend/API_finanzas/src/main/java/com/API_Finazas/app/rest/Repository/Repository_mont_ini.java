package com.API_Finazas.app.rest.Repository;

import com.API_Finazas.app.rest.Model.Model_mont_in;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface Repository_mont_ini extends JpaRepository<Model_mont_in, Integer> {
    @Query(value = "SELECT m FROM Model_mont_in m WHERE m.user_id = :user_id")
    List<Model_mont_in> findModelsMetaByUserId(@Param("user_id") int user_id);
}
