package com.API_Finazas.app.rest.Controller;

import com.API_Finazas.app.rest.Model.Model;
import com.API_Finazas.app.rest.Model.Model_user;
import com.API_Finazas.app.rest.Model.Model_mont_in;
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

    private String email_user;

    private String user_name;

    @PostMapping(value = "/registrar_user")
    public ResponseEntity<Object> registrar_user(@RequestBody com.API_Finazas.app.rest.Model.Model_user modelUser) {
        String email = modelUser.getEmail();

        List<Model_user> users = repository_user.findByEmail(email);

        if (modelUser.getPassword().equals(modelUser.getConfirmPassword()) && id_user != 0)  {
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
        } else {
            return ResponseEntity.badRequest().body("Las contraseñas no coinciden");
        }
    }

    @PostMapping(value = "/login")
    public ResponseEntity<Object> login(@RequestBody Model_user modelUser) {
        String email = modelUser.getEmail();
        String password = modelUser.getPassword();
        System.out.println("Email recibido: " + email);
        System.out.println("Contraseña recibida: " + password);

        // Buscar usuarios por su dirección de correo electrónico en la base de datos
        List<Model_user> users = repository_user.findByEmail(email);

        System.out.println("Usuarios encontrados en la base de datos: " + users.size());

        if (users.isEmpty()) {
            // No se encontraron usuarios con el correo electrónico proporcionado
            System.out.println("No se encontraron usuarios con el correo electrónico proporcionado.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }

        // Itera a través de los usuarios y verifica las credenciales
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
            id_user = 0; // Cierra la sesión
            System.out.println("Ide: " + id_user);

            return ResponseEntity.ok("Sesión cerrada exitosamente");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No hay sesión activa para cerrar");
        }
    }

    @GetMapping(value = "/datos_cuenta")
    public ResponseEntity<List<List<Model_user>>> traerDatosCuenta() {

        if (id_user != 0) {
            List<Model_user> user = repository_user.findByEmail(email_user);
            if (user != null) {
                // Devuelve el usuario encontrado en una lista de un solo elemento
                return ResponseEntity.ok(Collections.singletonList(user));
            } else {
                // Devuelve una respuesta 404 (Not Found) si no se encuentra ningún usuario
                return ResponseEntity.notFound().build();
            }
        } else {
            // Devuelve una respuesta 404 (Not Found) si id_user es igual a 0
            return ResponseEntity.notFound().build();
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

    //Agregar al eleiminar cuenta uqese borre toda la informacion asoscida

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
    public List<Model_mont_in> traerValorMeta(){
        if (id_user != 0) {
            //return repository_mont_ini.findModelsMetaByUserId(id_user);
            return repository_mont_ini.findAll();

        } else {
            return Collections.emptyList();
        }   
    }

    //Suma total

    @GetMapping("/suma_total")
    public Double sumaTotal(){
        if(id_user != 0) {
            return repository.sumarTotalValoresPorCategoriaAndUserId(id_user);
        }else{
            return 0.0;
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
            //return repository.findAll();
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
