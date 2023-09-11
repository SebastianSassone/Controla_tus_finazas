package com.API_Finazas.app.rest.Repository;

import com.API_Finazas.app.rest.Model.Model_user;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Repository_user extends JpaRepository<Model_user, Integer> {
    Model_user findByEmail(String email);

    }

