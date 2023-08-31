package com.API_Finazas.app.rest.Controller;

import com.API_Finazas.app.rest.Model.Model;
import com.API_Finazas.app.rest.Model.Model_user;
import com.API_Finazas.app.rest.Repository.Repository;
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
    private Repository repository;
    private Repository_user repository_user;

    @Autowired
    public Controller(Repository repository, Repository_user repository_user) {
        this.repository = repository;
        this.repository_user = repository_user;
    }
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
        com.API_Finazas.app.rest.Model.Model_user updatedModelUser = repository_user.findById(id).orElse(null);
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
        com.API_Finazas.app.rest.Model.Model_user deletedModelUser = repository_user.findById(id).orElse(null);
        if (deletedModelUser != null) {
            repository_user.delete(deletedModelUser);
            return ResponseEntity.ok("Cuenta eliminada");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }
    }

    //Cargar detalle

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

    @PostMapping(value="/guardar")
    public ResponseEntity<Object> guardarEntra(@RequestBody Model model) {
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
    public ResponseEntity<Object> actualizarNota(@PathVariable long id, @RequestBody Model model){
        Model updatedModel = repository.findById(id).orElse(null);
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
    public ResponseEntity<Object> borrarNota(@PathVariable long id){
        Model deletedModel = repository.findById(id).orElse(null);
        if (deletedModel != null) {
            repository.delete(deletedModel);
            return ResponseEntity.ok("Borrado");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No borrado");
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
