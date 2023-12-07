package com.API_Finazas.app.rest.Repository;

import com.API_Finazas.app.rest.Model.Model_user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface Repository_user extends JpaRepository<Model_user, Integer> {
    @Query("SELECT u FROM Model_user u WHERE u.email = :email")
    List<Model_user> findByEmail(@Param("email") String email);
}

