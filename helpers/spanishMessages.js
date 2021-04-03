const responseMessages = {
  msgAskAdmin: 'Consulte al administrador acerca de este error',
  msgUserPassIncorrect: 'Usuario o contraseña incorrecto',

  msgBusStationExists: 'Ya existe una terminal con ese nombre y Id de ciudad',
  msgBusStationNotFound: 'Terminal no encontrada',

  msgBusTicketExists:
    'Ya existe un boleto con ese Id de pasajero y Id de factura',
  msgBusTicketNotFound: 'Boleto no encontrado',

  msgCityExists: 'Ya existe una ciudad con ese nombre y Id de provincia',
  msgCityNotFound: 'Ciudad no encontrada',

  msgDocumentTypeExists:
    'Ya existe un tipo de documento con ese nombre o nombre corto',
  msgDocumentTypeNotFound: 'Tipo de documento no encontrado',

  msgInvoiceExists: 'Ya existe una factura con ese número',
  msgInvoiceNotFound: 'Factura no encontrada',

  msgPassengerExists:
    'Ya existe un pasajero con ese Id de tipo de documento y número de documento',
  msgPassengerNotFound: 'Pasajero no encontrado',

  msgPermissionExists: 'Ya existe un permiso con ese nombre',
  msgPermissionNotFound: 'Permiso no encontrado',

  msgProvinceExists: 'Ya existe una provincia con ese nombre',
  msgProvinceNotFound: 'Provincia no encontrada',

  msgRolePermissionExists: 'Ya existe un rol-permiso con ese rol y permiso',
  msgRolePermissionNotFound: 'Rol-Permiso no encontrado',

  msgRoleExists: 'Ya existe un rol con ese nombre',
  msgRoleNotFound: 'Rol no encontrado',

  msgSeatTypeExists: 'Ya existe un tipo de asiento con ese nombre',
  msgSeatTypeNotFound: 'Tipo de asiento no encontrado',

  msgSeatExists: 'Ya existe un asiento con ese número',
  msgSeatNotFound: 'Asiento no encontrado',

  msgSectionExists:
    'Ya existe una sección con ese Id de terminal y Id de terminal siguiente',
  msgSectionNotFound: 'Sección no encontrada',

  msgTransportCompanyExists:
    'Ya existe una empresa de transporte con ese nombre',
  msgTransportCompanyNotFound: 'Empresa de transporte no encontrada',

  msgTravelExists: 'Ya existe un viaje con ese nombre',
  msgTravelNotFound: 'Viaje no encontrado',

  msgUserExists: 'Ya existe un usuario con ese nombre de usuario',
  msgUserNotFound: 'Usuario no encontrado',

  msgVehicleTypeSeatExists:
    'Ya existe un vehículo-tipo de asiento con ese piso, ubicación en X ubicación en Y',
  msgVehicleTypeSeatNotFound: 'Vehiculo-Tipo de asiento no encontrado',

  msgVehicleTypeExists: 'Ya existe un tipo de vehículo con ese nombre',
  msgVehicleTypeNotFound: 'Tipo de vehículo no encontrado',

  msgVehicleExists:
    'Ya existe un vehículo con ese número de interno, Id de empresa de transporte y Id de tipo de vehículo',
  msgVehicleNotFound: 'Vehículo no encontrado',
};

module.exports = {
  responseMessages,
};
