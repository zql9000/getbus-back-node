const responseMessages = {
  msgAskAdmin: 'Ask the administrator for information about this error',
  msgUserPassIncorrect: 'User or Password is incorrect',

  msgBusStationExists: 'A busStation with this name and cityId already exists',
  msgBusStationNotFound: 'BusStation not found',

  msgBusTicketExists:
    'A busTicket with this passengerId and invoiceId already exists',
  msgBusTicketNotFound: 'BusTicket not found',

  msgCityExists: 'A city with this name and provinceId already exists',
  msgCityNotFound: 'City not found',

  msgDocumentTypeExists:
    'A documentType with this name or shortName already exists',
  msgDocumentTypeNotFound: 'DocumentType not found',

  msgInvoiceExists: 'A invoice with this number already exists',
  msgInvoiceNotFound: 'Invoice not found',

  msgPassengerExists:
    'A passenger with this documentTypeId and documentNumber already exists',
  msgPassengerNotFound: 'Passenger not found',

  msgPermissionExists: 'A permission with this name already exists',
  msgPermissionNotFound: 'Permission not found',

  msgProvinceExists: 'A province with this name already exists',
  msgProvinceNotFound: 'Province not found',

  msgRolePermissionExists:
    'A role-permission with this role and permission already exists',
  msgRolePermissionNotFound: 'RolePermission not found',

  msgRoleExists: 'A role with this name already exists',
  msgRoleNotFound: 'Role not found',

  msgSeatTypeExists: 'A seatType with this name already exists',
  msgSeatTypeNotFound: 'SeatType not found',

  msgSeatExists: 'A seat with this number already exists',
  msgSeatNotFound: 'Seat not found',

  msgSectionExists:
    'A section with this busStationId and busStationIdNext already exists',
  msgSectionNotFound: 'Section not found',

  msgTransportCompanyExists: 'A transportCompany with this name already exists',
  msgTransportCompanyNotFound: 'TransportCompany not found',

  msgTravelExists: 'A travel with this name already exists',
  msgTravelNotFound: 'Travel not found',

  msgUserExists: 'A user with this username already exists',
  msgUserNotFound: 'User not found',

  msgVehicleTypeSeatExists:
    'A vehicleTypeSeat with this floor, locationX and locationY already exists',
  msgVehicleTypeSeatNotFound: 'VehicleTypeSeat not found',

  msgVehicleTypeExists: 'A vehicleType with this name already exists',
  msgVehicleTypeNotFound: 'VehicleType not found',

  msgVehicleExists:
    'A vehicle with this internNumber, transportCompanyId and vechicleTypeId already exists',
  msgVehicleNotFound: 'Vehicle not found',
};

module.exports = {
  responseMessages,
};
