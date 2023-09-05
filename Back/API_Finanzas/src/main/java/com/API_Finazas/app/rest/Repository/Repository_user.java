package com.API_Finazas.app.rest.Repository;

import com.API_Finazas.app.rest.Model.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import com.API_Finazas.app.rest.Model.Model_user;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Repository_user extends JpaRepository<Model_user, Integer> {
    Model_user findByEmail(String email);

    @Query(value = "SELECT * FROM montoIniTable m WHERE m.user_id = :userId", nativeQuery = true)
    List<Model> findDatosCuentaByUserId(int userId);

    }

