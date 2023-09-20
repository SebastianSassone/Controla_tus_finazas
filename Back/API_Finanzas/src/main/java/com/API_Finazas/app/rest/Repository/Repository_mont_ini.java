package com.API_Finazas.app.rest.Repository;

import com.API_Finazas.app.rest.Model.Model;
import com.API_Finazas.app.rest.Model.Model_mont_ini;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface Repository_mont_ini extends JpaRepository<Model_mont_ini, Integer> {
    @Query(value = "SELECT * FROM montoinicialtable m WHERE m.user_id = :userId", nativeQuery = true)
    List<Model> findModelsMetaByUserId(@Param("userId") int userId);
}
