package com.API_Finazas.app.rest.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.API_Finazas.app.rest.Model.Model_user;
public interface Repository_user extends JpaRepository<Model_user, Integer> {
    Model_user findByEmail(String email);

    }

