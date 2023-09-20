package com.API_Finazas.app.rest.Model;

import javax.persistence.*;

@Entity
@Table(schema = "montoinicialtable")
public class Model_mont_ini {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private Integer monto_inicial;

    @Column
    private Integer meta_ahorro;

    @Column
    private Integer user_id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getMonto_inicial() {
        return monto_inicial;
    }

    public void setMonto_inicial(Integer monto_inicial) {
        this.monto_inicial = monto_inicial;
    }

    public Integer getMeta_ahorro() {
        return meta_ahorro;
    }

    public void setMeta_ahorro(Integer meta_ahorro) {
        this.meta_ahorro = meta_ahorro;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }
}
