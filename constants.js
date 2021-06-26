const DELIVERY_STATUS = {
    PENDING : "pending",
    ASSIGNED: "assigned",
    DELIVERED: "delivered"
}

 const RESPONSE_STATUS = {
    NOT_FOUND: 404,
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PRECONDITION_FAILED: 412
}

module.exports = {
    DELIVERY_STATUS,
    RESPONSE_STATUS
}


