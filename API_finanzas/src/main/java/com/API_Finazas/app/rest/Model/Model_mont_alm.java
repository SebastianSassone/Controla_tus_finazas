package com.API_Finazas.app.rest.Model;

import javax.persistence.*;

@Entity
@Table(schema = "montoalmacenadotable")
public class Model_mont_alm {
        

        @id
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
        private Integer fecha;

        @Column
        private Integer meta_cumplida;

        @Column
        private Integer user_id;
}