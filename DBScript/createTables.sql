create table public.tenant(
tenantUserName varchar(255) primary key,
tenantName varchar(255) not null,
email varchar(255) not null,
phoneNumber varchar(255) not null,
AadharNumber varchar(255),
isVerified boolean default false
)

create table public.delivery_tickets(
ticketId SERIAL PRIMARY KEY,
tenantUserNameFk varchar(255),
sourceAddress varchar(255) not null,
destinationAddress  varchar(255) not null,
isInsured boolean default false,
sourcePhoneNumber  varchar(255) not null,
destinationPhoneNumber varchar(255) not null,
isAadharVerified boolean default false,
deliveryStatus varchar(255) default 'pending',
CONSTRAINT fk_delivery_tkt FOREIGN KEY(tenantUserNameFk) REFERENCES public.tenant(tenantUserName)
);

create table public.deliveryTracking(
deliveryId SERIAL PRIMARY KEY,
deliveryPersonName varchar(255),
ticketId INT,
StatusUpdate varchar(255),
CONSTRAINT fk_deliver_tracking FOREIGN KEY(ticketId) REFERENCES public.delivery_tickets(ticketId)
)


