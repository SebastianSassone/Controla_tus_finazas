package com.API_Finazas.app.rest.Model;

import javax.persistence.*;

@Entity
@Table(schema = "montoalmacenadotable")
public class Model_mont_alm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private Integer monto;

    @Column
    private Integer meta;

    @Column
    private Integer gastos;

    @Column
    private Integer ahorro;

    
    @Column
    private String fecha;

    @Column
    private String meta_cumplida;

    @Column
    private Integer user_id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getMonto() {
        return monto;
    }

    public void setMonto(Integer monto) {
        this.monto = monto;
    }

    public Integer getMeta() {
        return meta;
    }

    public void setMeta(Integer meta) {
        this.meta = meta;
    }

    public Integer getGastos() {
        return gastos;
    }

    public void setGastos(Integer gastos) {
        this.gastos = gastos;
    }

    public Integer getAhorro() {
        return ahorro;
    }

    public void setAhorro(Integer ahorro) {
        this.ahorro = ahorro;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getMeta_cumplida() {
        return meta_cumplida;
    }

    public void setMeta_cumplida(String meta_cumplida) {
        this.meta_cumplida = meta_cumplida;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }
}
