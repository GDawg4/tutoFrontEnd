Feature: Acceder al perfil
  Con el objetivo de ver mi información,
  como Miguel Chen
  Quiero una forma de manejar mi perfil

  Scenario: Miguel todavía no ha sido aprobado como tutor
    When intenta ingresar a su perfil,
    Then observa sus datos como su correo: che18420@uvg.edu.gt y su contraseña ''
    And Puede cerrar sesión si desea, pero no tiene ninguna opción para agregar horarios de disponibilidad.

  Scenario: Miguel Chen es aprobado como tutor
    Given he is logged in
    When he acceses his profile,
    Then he adds his hours

  Scenario: Miguel cierra sesión
    When ingresa a su perfil,
    Then Miguel presiona el botón de cerrar sesión y regresa a la pantalla de inicio para ingresar su correo '' y contraseña nuevamente ''

  Scenario: Miguel cambia su contraseña
    When ingresa a su perfil,
    Then Miguel presiona “cambiar contraseña e introduce su contraseña anterior, **********
