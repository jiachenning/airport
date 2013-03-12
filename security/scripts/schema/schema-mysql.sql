
    alter table sec_acc_auth 
        drop 
        foreign key FK308706D4938EF755

    alter table sec_acc_auth 
        drop 
        foreign key FK308706D44B8284C6

    alter table sec_acc_role 
        drop 
        foreign key FK308EA9A24744D8FA

    alter table sec_acc_role 
        drop 
        foreign key FK308EA9A24B8284C6

    alter table sec_account 
        drop 
        foreign key FKE0900C3FCECA0A5A

    alter table sec_account 
        drop 
        foreign key FKE0900C3FEC6F9CDA

    alter table sec_authority 
        drop 
        foreign key FKC1984CD5357ED513

    alter table sec_group 
        drop 
        foreign key FKB39AD5112C02444F

    alter table sec_role_auth 
        drop 
        foreign key FK7DA33563938EF755

    alter table sec_role_auth 
        drop 
        foreign key FK7DA335634744D8FA

    drop table if exists sec_acc_auth

    drop table if exists sec_acc_role

    drop table if exists sec_account

    drop table if exists sec_authority

    drop table if exists sec_group

    drop table if exists sec_role

    drop table if exists sec_role_auth

    drop table if exists sec_user

    create table sec_acc_auth (
        acc_id bigint not null,
        auth_id bigint not null,
        primary key (acc_id, auth_id)
    ) ENGINE=InnoDB

    create table sec_acc_role (
        acc_id bigint not null,
        role_id bigint not null,
        primary key (acc_id, role_id)
    ) ENGINE=InnoDB

    create table sec_account (
        id bigint not null auto_increment,
        name varchar(255),
        version integer not null,
        group_id bigint not null,
        user_id bigint not null,
        primary key (id)
    ) ENGINE=InnoDB

    create table sec_authority (
        id bigint not null auto_increment,
        version integer not null,
        code varchar(255),
        description varchar(255),
        enabled boolean not null,
        name varchar(255),
        parent_id bigint,
        primary key (id)
    ) ENGINE=InnoDB

    create table sec_group (
        id bigint not null auto_increment,
        version integer not null,
        enabled boolean not null,
        name varchar(255),
        parent_id bigint,
        primary key (id)
    ) ENGINE=InnoDB

    create table sec_role (
        id bigint not null auto_increment,
        code varchar(255),
        description varchar(255),
        enabled boolean not null,
        name varchar(255),
        version integer not null,
        primary key (id)
    ) ENGINE=InnoDB

    create table sec_role_auth (
        role_id bigint not null,
        auth_id bigint not null,
        primary key (role_id, auth_id)
    ) ENGINE=InnoDB

    create table sec_user (
        id bigint not null auto_increment,
        address varchar(255),
        age integer not null,
        birthday date,
        enabled boolean not null,
        gender integer not null,
        login_name varchar(255),
        password varchar(255),
        telephone varchar(255),
        user_type integer not null,
        username varchar(255),
        version integer not null,
        primary key (id)
    ) ENGINE=InnoDB

    alter table sec_acc_auth 
        add index FK308706D4938EF755 (auth_id), 
        add constraint FK308706D4938EF755 
        foreign key (auth_id) 
        references sec_authority (id)

    alter table sec_acc_auth 
        add index FK308706D44B8284C6 (acc_id), 
        add constraint FK308706D44B8284C6 
        foreign key (acc_id) 
        references sec_account (id)

    alter table sec_acc_role 
        add index FK308EA9A24744D8FA (role_id), 
        add constraint FK308EA9A24744D8FA 
        foreign key (role_id) 
        references sec_role (id)

    alter table sec_acc_role 
        add index FK308EA9A24B8284C6 (acc_id), 
        add constraint FK308EA9A24B8284C6 
        foreign key (acc_id) 
        references sec_account (id)

    alter table sec_account 
        add index FKE0900C3FCECA0A5A (group_id), 
        add constraint FKE0900C3FCECA0A5A 
        foreign key (group_id) 
        references sec_group (id)

    alter table sec_account 
        add index FKE0900C3FEC6F9CDA (user_id), 
        add constraint FKE0900C3FEC6F9CDA 
        foreign key (user_id) 
        references sec_user (id)

    alter table sec_authority 
        add index FKC1984CD5357ED513 (parent_id), 
        add constraint FKC1984CD5357ED513 
        foreign key (parent_id) 
        references sec_authority (id)

    alter table sec_group 
        add index FKB39AD5112C02444F (parent_id), 
        add constraint FKB39AD5112C02444F 
        foreign key (parent_id) 
        references sec_group (id)

    alter table sec_role 
        add constraint uc_sec_role_1 unique (code)

    alter table sec_role_auth 
        add index FK7DA33563938EF755 (auth_id), 
        add constraint FK7DA33563938EF755 
        foreign key (auth_id) 
        references sec_authority (id)

    alter table sec_role_auth 
        add index FK7DA335634744D8FA (role_id), 
        add constraint FK7DA335634744D8FA 
        foreign key (role_id) 
        references sec_role (id)

    alter table sec_user 
        add constraint uc_sec_user_1 unique (login_name)
