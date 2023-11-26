package com.API_Finazas.app.rest.Controller;

import com.API_Finazas.app.rest.Model.Model_ingre;
import com.API_Finazas.app.rest.Model.Model_mont_in;
import com.API_Finazas.app.rest.Model.Model_user;
import com.API_Finazas.app.rest.Model.Model_mont_alm;
import com.API_Finazas.app.rest.Repository.Repository_ingre;
import com.API_Finazas.app.rest.Repository.Repository_mont_alm;
import com.API_Finazas.app.rest.Repository.Repository_mont_ini;
import com.API_Finazas.app.rest.Repository.Repository_user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin
public class Controller {
    private Repository_ingre repositoryIngre;
    private Repository_user repository_user;
    private Repository_mont_ini repository_mont_ini;
    private Repository_mont_alm repository_mont_alm;

    @Autowired
    public Controller(Repository_ingre repositoryIngre, Repository_user repository_user, Repository_mont_ini repository_mont_ini, Repository_mont_alm repository_mont_alm) {
        this.repositoryIngre = repositoryIngre;
        this.repository_user = repository_user;
        this.repository_mont_ini = repository_mont_ini;
        this.repository_mont_alm = repository_mont_alm;
    }

    //Cuenta
    private Integer id_user = 0;

    private String email_user;

    private String user_name;

    @PostMapping(value = "/registrar_user")
    public ResponseEntity<Object> registrar_user(@RequestBody com.API_Finazas.app.rest.Model.Model_user modelUser) {
        String email = modelUser.getEmail();

        List<Model_user> users = repository_user.findByEmail(email);

        if (modelUser.getPassword().equals(modelUser.getConfirmPassword()) && id_user == 0) {
            try {
                repository_user.save(modelUser);
                id_user = modelUser.getId();
                email_user = modelUser.getEmail();
                user_name = modelUser.getName();
                System.out.println("Ide: " + id_user);
                System.out.println(modelUser.getName());
                System.out.println(modelUser.getLastname());
                System.out.println(email_user);
                System.out.println(modelUser.getPassword());
                System.out.println(modelUser.getConfirmPassword());
                return ResponseEntity.ok("Usuario registrado");
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().body("Error al registrar el usuario: " + e.getMessage());
            }
        } else {
            return ResponseEntity.badRequest().body("Las contraseñas no coinciden o id_user es igual a 0");
        }
    }


    @PostMapping(value = "/login")
    public ResponseEntity<Object> login(@RequestBody Model_user modelUser) {
        String email = modelUser.getEmail();
        String password = modelUser.getPassword();
        System.out.println("Email recibido: " + email);
        System.out.println("Contraseña recibida: " + password);

        List<Model_user> users = repository_user.findByEmail(email);

        System.out.println("Usuarios encontrados en la base de datos: " + users.size());

        if (users.isEmpty()) {
            System.out.println("No se encontraron usuarios con el correo electrónico proporcionado.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }

        for (Model_user user : users) {
            System.out.println("Contraseña en la base de datos para " + user.getEmail() + ": " + user.getPassword());
            if (user.getPassword().equals(password) && id_user == 0) {
                id_user = user.getId();
                email_user = user.getEmail();
                System.out.println("Inicio de sesión exitoso para el usuario: " + user.getEmail());
                return ResponseEntity.ok("Inicio de sesión exitoso");
            }
        }

        System.out.println("No se encontró una coincidencia de contraseña válida en la base de datos.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
    }
    
    @GetMapping("/cerrar_sesion")
    public ResponseEntity<String> cerrarSesion() {
        if (id_user != 0) {
            id_user = 0;
            System.out.println("Ide: " + id_user);

            return ResponseEntity.ok("Sesión cerrada exitosamente");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No hay sesión activa para cerrar");
        }
    }

    @GetMapping(value = "/datos_cuenta")
    public List<Model_user> traerDatosCuenta() {
        if (id_user != 0) {
            return repository_user.findByEmail(email_user);
        } else {
            return Collections.emptyList();
        }
    }

    @PutMapping(value = "/actualizar_user/{id}")
    public ResponseEntity<Object> actualizar_user(@PathVariable long id, @RequestBody com.API_Finazas.app.rest.Model.Model_user modelUser) {
        com.API_Finazas.app.rest.Model.Model_user updatedModelUser = repository_user.findById((int) id).orElse(null);
        if (updatedModelUser != null) {
            updatedModelUser.setName(modelUser.getName());
            updatedModelUser.setLastname(modelUser.getLastname());
            updatedModelUser.setEmail(modelUser.getEmail());
            updatedModelUser.setPassword(modelUser.getPassword());
            repository_user.save(updatedModelUser);
            return ResponseEntity.ok(updatedModelUser);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no actualizado");
        }
    }

    @DeleteMapping(value = "/eliminar_cuenta/{id}")
    public ResponseEntity<Object> eliminar_cuenta(@PathVariable Integer id) {
        com.API_Finazas.app.rest.Model.Model_user deletedModelUser = repository_user.findById((int) id).orElse(null);
        if (deletedModelUser != null) {
            repository_user.delete(deletedModelUser);
            return ResponseEntity.ok("Cuenta eliminada");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }
    }

    //Monto inicial y meta de ahorro

    @PostMapping(value = "/guardar_valor_meta")
    public ResponseEntity<String> guardarValorMeta(@RequestBody Model_mont_in model_mont_in) {
        if (id_user != 0) {
            model_mont_in.setUser_id(id_user);
            repository_mont_ini.save(model_mont_in);
            System.out.print(model_mont_in.getMonto_inicial());
            return ResponseEntity.ok("Guardado");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No se ha iniciado sesión");
        }
    }

    @PutMapping(value="/actualizar_valor_meta/{id}")
    public ResponseEntity<Object> actualizarValorMeta(@PathVariable long id, @RequestBody com.API_Finazas.app.rest.Model.Model_mont_in model_mont_in){
        com.API_Finazas.app.rest.Model.Model_mont_in updatedModel_mont_in = repository_mont_ini.findById((int) id).orElse(null);
        if (updatedModel_mont_in != null) {
            updatedModel_mont_in.setMonto_inicial(model_mont_in.getMonto_inicial());
            updatedModel_mont_in.setMeta_ahorro(model_mont_in.getMeta_ahorro());
            repository_mont_ini.save(updatedModel_mont_in);
            return ResponseEntity.ok(updatedModel_mont_in);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No actualizado");
        }
    }

    @DeleteMapping(value="/borrar_valor_meta/{id}")
    public ResponseEntity<Object> borrarValorMeta(@PathVariable long id){
        Model_mont_in deletedModel_mont_in = repository_mont_ini.findById((int) id).orElse(null);
        if (deletedModel_mont_in != null) {
            repository_mont_ini.delete(deletedModel_mont_in);
            return ResponseEntity.ok("Borrado");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No borrado");
        }
    }
    @GetMapping(value = "/traer_valor_meta") 
    public List<Model_mont_in> traerValorMeta(){
        if (id_user != 0) {
            return repository_mont_ini.findModelsMetaByUserId(id_user);
        } else {
            return Collections.emptyList();
        }   
    }

//Cierre
    @PostMapping(value="/guardar_cierre")
    public ResponseEntity<Object> guardarIngre(@RequestBody Model_mont_alm model_mont_alm) {

        if (id_user != 0) {
            
            model_mont_alm.setUser_id(id_user);
            repository_mont_alm.save(model_mont_alm);
            return ResponseEntity.ok("Guardado");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No se ha iniciado sesión");
        }
    }

       @GetMapping(value= "/traer_cierre")
       public List<Model_mont_alm> traerCierre(){
           if (id_user != 0) {         
             return repository_mont_alm.findAll();
           } else {     
              return Collections.emptyList();
         }
       }
       @DeleteMapping(value="/borrar_cierre/{id}")
        public ResponseEntity<Object> eliminarCierre(@PathVariable long id){
        Model_mont_alm deletedModel_mont_alm = repository_mont_alm.findById((int) id).orElse(null);
        if (deletedModel_mont_alm != null) {
            repository_mont_alm.delete(deletedModel_mont_alm);
            return ResponseEntity.ok("Borrado");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No borrado");
        }
    }

    //Cargar detalle

    @PostMapping(value="/guardar_ingreso")
    public ResponseEntity<Object> guardarIngre(@RequestBody Model_ingre modelIngre) {

        if (id_user != 0) {
            String categoria = modelIngre.getCategoria() != null ? String.valueOf(modelIngre.getCategoria()) : "N/A";
            String fecha = modelIngre.getFecha() != null ? modelIngre.getFecha().toString() : "N/A";
            String hora = modelIngre.getHora() != null ? modelIngre.getHora().toString() : "N/A";

            System.out.println("Categoría: " + categoria);
            System.out.println("Fecha: " + fecha);
            System.out.println("Hora: " + hora);
            modelIngre.setUser_id(id_user);
            repositoryIngre.save(modelIngre);
            return ResponseEntity.ok("Guardado");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No se ha iniciado sesión");
        }
    }

    @PutMapping(value="/actualizar_ingreso/{id}")
    public ResponseEntity<Object> actualizarIngre(@PathVariable long id, @RequestBody Model_ingre modelIngre){
        Model_ingre updatedModelIngre = repositoryIngre.findById((int) id).orElse(null);
        if (updatedModelIngre != null) {
            updatedModelIngre.setProducto(modelIngre.getProducto());
            updatedModelIngre.setCategoria(modelIngre.getCategoria());
            updatedModelIngre.setSubcategoria(modelIngre.getSubcategoria());
            updatedModelIngre.setValor(modelIngre.getValor());
            updatedModelIngre.setFecha(modelIngre.getFecha());
            updatedModelIngre.setHora(modelIngre.getHora());
            repositoryIngre.save(updatedModelIngre);
            return ResponseEntity.ok(updatedModelIngre);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No actualizado");
        }
    }

    @DeleteMapping(value="/borrar_ingreso/{id}")
    public ResponseEntity<Object> borrarIngre(@PathVariable long id){
        Model_ingre deletedModelIngre = repositoryIngre.findById((int) id).orElse(null);
        if (deletedModelIngre != null) {
            repositoryIngre.delete(deletedModelIngre);
            return ResponseEntity.ok("Borrado");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No borrado");
        }
    }

    @GetMapping(value= "/valances_ingreso")
    public List<Model_ingre> traerValan(){
    if (id_user != 0) {
        System.out.println("ID de usuario: " + id_user);
        return repositoryIngre.findModelsByUserId(id_user);
    } else {
        return Collections.emptyList();
    }
}

    @GetMapping("/total_alimentos")
    public ResponseEntity<List<Model_ingre>> obtenerTotalAlimen() {
        if (id_user != 0) {
            List<Model_ingre> totalValorAlimentos;
            totalValorAlimentos = repositoryIngre.obtenerElementosPorCategoriaAndUserId("Alimentacion", id_user);
            return ResponseEntity.ok(totalValorAlimentos);
        } else {       
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/total_servicios")
    public ResponseEntity<List<Model_ingre>> TotalServi() {
        if (id_user != 0) {
            List<Model_ingre> totalServicios;
            totalServicios = repositoryIngre.obtenerElementosPorCategoriaAndUserId("Servicios", id_user);
            return ResponseEntity.ok(totalServicios);
        } else {       
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/total_otros")
    public ResponseEntity<List<Model_ingre>> Totalotros() {
        if (id_user != 0) {
            List<Model_ingre> totalOtros;
            totalOtros = repositoryIngre.obtenerElementosPorCategoriaAndUserId("Otros", id_user);
            return ResponseEntity.ok(totalOtros);
        } else {       
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/total_transporte")
    public ResponseEntity<List<Model_ingre>> TotalTraspor() {
        if (id_user != 0) {
            List<Model_ingre> totalTransporte;
            totalTransporte = repositoryIngre.obtenerElementosPorCategoriaAndUserId("Transporte", id_user);
            return ResponseEntity.ok(totalTransporte);
        } else {       
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/total_salud")
    public ResponseEntity<List<Model_ingre>> TotalSalud() {
        if (id_user != 0) {
            List<Model_ingre> totalSalud;
            totalSalud = repositoryIngre.obtenerElementosPorCategoriaAndUserId("Salud", id_user);
            return ResponseEntity.ok(totalSalud);
        } else {       
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/total_higiene")
    public ResponseEntity<List<Model_ingre>> TotalHigie() {
        if (id_user != 0) {
            List<Model_ingre> totalHigiene;
            totalHigiene = repositoryIngre.obtenerElementosPorCategoriaAndUserId("Higiene", id_user);
            return ResponseEntity.ok(totalHigiene);
        } else {       
            return ResponseEntity.notFound().build();
        }
    }
 }
