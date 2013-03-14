
    drop table sec_acc_auth cascade constraints;

    drop table sec_acc_role cascade constraints;

    drop table sec_account cascade constraints;

    drop table sec_authority cascade constraints;

    drop table sec_group cascade constraints;

    drop table sec_role cascade constraints;

    drop table sec_role_auth cascade constraints;

    drop table sec_user cascade constraints;

    drop sequence hibernate_sequence;

    create table sec_acc_auth (
        acc_id number(19,0) not null,
        auth_id number(19,0) not null,
        primary key (acc_id, auth_id)
    );

    create table sec_acc_role (
        acc_id number(19,0) not null,
        role_id number(19,0) not null,
        primary key (acc_id, role_id)
    );

    create table sec_account (
        id number(19,0) not null,
        name varchar2(255 char),
        version number(10,0) not null,
        group_id number(19,0) not null,
        user_id number(19,0) not null,
        primary key (id)
    );

    create table sec_authority (
        id number(19,0) not null,
        version number(10,0) not null,
        code varchar2(255 char),
        description varchar2(255 char),
        enabled number(1,0) not null,
        name varchar2(255 char),
        parent_id number(19,0),
        primary key (id)
    );

    create table sec_group (
        id number(19,0) not null,
        version number(10,0) not null,
        enabled number(1,0) not null,
        name varchar2(255 char),
        parent_id number(19,0),
        primary key (id)
    );

    create table sec_role (
        id number(19,0) not null,
        code varchar2(255 char),
        description varchar2(255 char),
        enabled number(1,0) not null,
        name varchar2(255 char),
        version number(10,0) not null,
        primary key (id)
    );

    create table sec_role_auth (
        role_id number(19,0) not null,
        auth_id number(19,0) not null,
        primary key (role_id, auth_id)
    );

    create table sec_user (
        id number(19,0) not null,
        address varchar2(255 char),
        age number(10,0) not null,
        birthday date,
        enabled number(1,0) not null,
        gender number(10,0) not null,
        login_name varchar2(255 char),
        password varchar2(255 char),
        telephone varchar2(255 char),
        user_type number(10,0) not null,
        username varchar2(255 char),
        version number(10,0) not null,
        primary key (id)
    );

    alter table sec_acc_auth 
        add constraint FK308706D4938EF755 
        foreign key (auth_id) 
        references sec_authority;

    alter table sec_acc_auth 
        add constraint FK308706D44B8284C6 
        foreign key (acc_id) 
        references sec_account;

    alter table sec_acc_role 
        add constraint FK308EA9A24744D8FA 
        foreign key (role_id) 
        references sec_role;

    alter table sec_acc_role 
        add constraint FK308EA9A24B8284C6 
        foreign key (acc_id) 
        references sec_account;

    alter table sec_account 
        add constraint FKE0900C3FCECA0A5A 
        foreign key (group_id) 
        references sec_group;

    alter table sec_account 
        add constraint FKE0900C3FEC6F9CDA 
        foreign key (user_id) 
        references sec_user;

    alter table sec_authority 
        add constraint FKC1984CD5357ED513 
        foreign key (parent_id) 
        references sec_authority;

    alter table sec_group 
        add constraint FKB39AD5112C02444F 
        foreign key (parent_id) 
        references sec_group;

    alter table sec_role 
        add constraint uc_sec_role_1 unique (code);

    alter table sec_role_auth 
        add constraint FK7DA33563938EF755 
        foreign key (auth_id) 
        references sec_authority;

    alter table sec_role_auth 
        add constraint FK7DA335634744D8FA 
        foreign key (role_id) 
        references sec_role;

    alter table sec_user 
        add constraint uc_sec_user_1 unique (login_name);

    create sequence hibernate_sequence;
