export class User {
  username: String;
  password: String;
}
export class Info {
    id: String;
    gender: String;
    age: String;
    diagnosis: String;
    dateOfInjury: String;
    wheelchairUsageAge: String;
    zipcode: String;
    wheelchairUsage: String;
    negotiateSoft: String;
    negotiateCurb: String;
    negotiateSteep: String;
    heightFoot: String;
    heightInch: String;
    weight: String;
    weightSource: String;
    weekdayHours: String;
    weekdayHoursOutside: String;
    weekdayDistance: String;
    weekendHours: String;
    weekendHoursOutside: String;
    weekendDistance: String;
    createdAt: String;
    modifiedAt: String;
    avgDistancePerDay: String;
}
export class Wheelchair {
    id: String;
    userId: String;
    primaryWheelchair: String;
    type: String;
    manufacturer: String;
    model: String;
    name: String;
    manufacturerPicture: String;
    modelPicture: String;
    serialNumber: String;
    age: String;
    hoursPerDay: String;
    performance: String;
    repairs: String;
    funding: String;
    createdAt: String;
    modifiedAt: String;
}
export class Vendor {
    id: String;
    userId: String;
    name: String;
    dateOfSwitch: String;
    type: String;
    phone: String;
    email: String;
    street: String;
    city: String;
    state: String;
    zipcode: String;
    createdAt: String;
    modifiedAt: String;
}
export class Repair {
    id: String;
    wheelchairId: String;
    userId: String;
    wheelchair: String;
    date: String;
    category: String;
    subCategory: String;
    detail: String;
    resource: String;
    dateRepairNeeded: String;
    dateRepairCompleted: String;
    purpose: String;
    reasonNotComplete: String;
    consequences: String;
    isCompleted: String;
    isOngoing: String;
    whoComplete: String;
    repairCost: String;
    dateVendorContacted: String;
    dateVendorMonth: String;
    dateVendorDay: String;
    createdAt: String;
    modifiedAt: String;
}
export class Tracking {
    id: String;
    userId: String;
    repairId: String;
    date: String;
    updateTracking: String;
    consequences: String;
    createdAt: String;
    modifiedAt: String;
}