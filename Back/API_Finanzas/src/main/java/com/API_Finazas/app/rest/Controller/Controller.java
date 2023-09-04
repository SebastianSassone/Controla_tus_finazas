package com.API_Finazas.app.rest.Controller;

import com.API_Finazas.app.rest.Model.Model;
import com.API_Finazas.app.rest.Model.Model_user;
import com.API_Finazas.app.rest.Model.Model_mont_ini;
import com.API_Finazas.app.rest.Repository.Repository;
import com.API_Finazas.app.rest.Repository.Repository_user;
import com.API_Finazas.app.rest.Repository.Repository_mont_ini;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin
public class Controller {
    private Repository repository;
    private Repository_user repository_user;
    private Repository_mont_ini repository_mont_ini;

    @Autowired
    public Controller(Repository repository, Repository_user repository_user, Repository_mont_ini repository_mont_ini) {
        this.repository = repository;
        this.repository_user = repository_user;
        this.repository_mont_ini = repository_mont_ini;
    }

    //Cuenta

    private Integer id_user = 0;

    @PostMapping(value = "/registrar_user")
    public ResponseEntity<Object> registrar_user(@RequestBody com.API_Finazas.app.rest.Model.Model_user modelUser) {
        if (modelUser.getPassword().equals(modelUser.getConfirmPassword())) {
            repository_user.save(modelUser);
            id_user = modelUser.getId();
            System.out.println("Ide: " + id_user);
            return ResponseEntity.ok("Usuario registrado");
        } else {
            return ResponseEntity.badRequest().body("Las contraseñas no coinciden");
        }
    }

    @PostMapping(value = "/login")
    public ResponseEntity<Object> login(@RequestBody Model_user modelUser) {
        String email = modelUser.getEmail();
        String password = modelUser.getPassword();

        // Buscar el usuario por su dirección de correo electrónico en la base de datos
        Model_user user = repository_user.findByEmail(email);

        if (user != null && user.getPassword().equals(password) && id_user == 0) {
            id_user = user.getId(); // Establecer el id_user con el ID del usuario autenticado
            System.out.println("Ide: " + id_user);

            return ResponseEntity.ok("Inicio de sesión exitoso");
        } else {
            // Las credenciales no son válidas o el usuario ya ha iniciado sesión
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }

    @PostMapping("/cerrar_sesion")
    public ResponseEntity<String> unlogin() {
        if (id_user != 0) {
            id_user = 0; // Cierra la sesión
            System.out.println("Ide: " + id_user);

            return ResponseEntity.ok("Sesión cerrada exitosamente");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No hay sesión activa para cerrar");
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
    public ResponseEntity<Object> eliminar_cuenta(@PathVariable long id) {
        com.API_Finazas.app.rest.Model.Model_user deletedModelUser = repository_user.findById((int) id).orElse(null);
        if (deletedModelUser != null) {
            repository_user.delete(deletedModelUser);
            return ResponseEntity.ok("Cuenta eliminada");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }
    }

    //Agregar al eleiminar cuenta uqese borre toda la informacion asoscida

    //Monto inicial y meta de ahorro

    @PostMapping(value = "/guardar_valor_meta")
    public ResponseEntity<String> guardarValorMeta(@RequestBody Model_mont_ini model_mont_ini) {
        if (id_user != 0) {
            model_mont_ini.setUser_id(id_user);
            repository_mont_ini.save(model_mont_ini);
            return ResponseEntity.ok("Guardado");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No se ha iniciado sesión");
        }
    }

@PutMapping(value="/actualizar_valor_meta/{id}")
    public ResponseEntity<Object> actualizarValorMeta(@PathVariable long id, @RequestBody Model model){
        Model updatedModel = repository.findById((int) id).orElse(null);
        if (updatedModel != null) {
            updatedModel.setProducto(model.getProducto());
            updatedModel.setCategoria(model.getCategoria());
            updatedModel.setSubcategoria(model.getSubcategoria());
            repository.save(updatedModel);
            return ResponseEntity.ok(updatedModel);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No actualizado");
        }
    }

    @DeleteMapping(value="/borrar_valor_meta/{id}")
    public ResponseEntity<Object> borrarValorMeta(@PathVariable long id){
        Model deletedModel = repository.findById((int) id).orElse(null);
        if (deletedModel != null) {
            repository.delete(deletedModel);
            return ResponseEntity.ok("Borrado");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No borrado");
        }
    }
    
    @GetMapping(value = "/traer_valor_meta") 
    public List<Model> traerValorMeta(){
        if (id_user != 0) {
            return repository_mont_ini.findModelsMetaByUserId(id_user);
        } else {
            return Collections.emptyList();
        }   
    }
    
    //Cargar detalle

    @PostMapping(value="/guardar")
    public ResponseEntity<Object> guardarIngre(@RequestBody Model model) {
        // Realizar el casting y transformación a String

        if (id_user != 0) {
             // Asignar el ID del usuario al modelo de entrada
            String categoria = model.getCategoria() != null ? String.valueOf(model.getCategoria()) : "N/A";
            String fecha = model.getFecha() != null ? model.getFecha().toString() : "N/A";
            String hora = model.getHora() != null ? model.getHora().toString() : "N/A";

            // Imprimir los valores transformados
            System.out.println("Categoría: " + categoria);
            System.out.println("Fecha: " + fecha);
            System.out.println("Hora: " + hora);
            model.setUser_id(id_user);
            repository.save(model);
            return ResponseEntity.ok("Guardado");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No se ha iniciado sesión");
        }
    }

    @PutMapping(value="/actualizar/{id}")
    public ResponseEntity<Object> actualizarIngre(@PathVariable long id, @RequestBody Model model){
        Model updatedModel = repository.findById((int) id).orElse(null);
        if (updatedModel != null) {
            updatedModel.setProducto(model.getProducto());
            updatedModel.setCategoria(model.getCategoria());
            updatedModel.setSubcategoria(model.getSubcategoria());
            updatedModel.setValor(model.getValor());
            updatedModel.setFecha(model.getFecha());
            updatedModel.setHora(model.getHora());
            repository.save(updatedModel);
            return ResponseEntity.ok(updatedModel);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No actualizado");
        }
    }

    @DeleteMapping(value="/borrar/{id}")
    public ResponseEntity<Object> borrarIngre(@PathVariable long id){
        Model deletedModel = repository.findById((int) id).orElse(null);
        if (deletedModel != null) {
            repository.delete(deletedModel);
            return ResponseEntity.ok("Borrado");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No borrado");
        }
    }


    @GetMapping(value= "/valances")
    public List<Model> traerValan(){
        if (id_user != 0) {
            System.out.println("Ide: " + id_user);
          return repository.findModelsByUserId(id_user); // Reemplaza con el método adecuado de tu repositorio
        } else {
            // Manejo de usuario no autenticado
           // Puedes lanzar una excepción, devolver un mensaje de error o cualquier otra acción apropiada
           return Collections.emptyList();
      }
    }
    
    @GetMapping("/total-valor-alimentos")
    public Double obtenerTotalValorAlimen() {
        if (id_user != 0) {
            Double totalValorAlimentos = repository.sumarValoresPorCategoriaAndUserId("Alimentacion",  id_user);
            return totalValorAlimentos != null ? totalValorAlimentos : 0.0;
        } else {
            // Manejo de usuario no autenticado
            // Puedes lanzar una excepción, devolver un mensaje de error o cualquier otra acción apropiada
            return 0.0;
        }
    }


    @GetMapping("/total-valor-servicios")
    public Double obtenerTotalValorServi() {
        if (id_user != 0) {
        Double totalValorServicios = repository.sumarValoresPorCategoriaAndUserId("Servicios" , id_user);
        return totalValorServicios != null ? totalValorServicios : 0.0;
        } else { return 0.0;}
    }

    @GetMapping("/total-valor-otros")
    public Double obtenerTotalValorotros() {
            if (id_user != 0) {
                Double totalValorOtros = repository.sumarValoresPorCategoriaAndUserId("Otros" ,   id_user);
                return totalValorOtros != null ? totalValorOtros : 0.0;
            } else { return 0.0;
            }
        }

    @GetMapping("/total-valor-transporte")
    public Double obtenerTotalValorTraspor() {
        if (id_user != 0) {
            Double totalValorTransporte = repository.sumarValoresPorCategoriaAndUserId("Transporte" ,   id_user);
            return totalValorTransporte != null ? totalValorTransporte : 0.0;
        } else { return 0.0; }
    }

    @GetMapping("/total-valor-salud")
    public Double obtenerTotalValorSalud() {
        if (id_user != 0) {
         Double totalValorSalud = repository.sumarValoresPorCategoriaAndUserId("Salud" ,  id_user);
         return totalValorSalud != null ? totalValorSalud : 0.0;
        } else { return 0.0;}
    }

    @GetMapping("/total-valor-higiene")
    public Double obtenerTotalValorHigie() {
        if (id_user != 0) {
         Double totalValorHigiene = repository.sumarValoresPorCategoriaAndUserId("Higiene" ,   id_user);
         return totalValorHigiene != null ? totalValorHigiene : 0.0;
        } else { return 0.0; }
    }

}
