import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class MigrationV1 implements MigrationInterface{

    name: string = Date.now().toString()

    async up(queryRunner: QueryRunner): Promise<any> {
        const vehiculoTable = new Table({
            name: "vehiculo",
            columns:[
                {
                    name: "id",
                    type: "varchar",
                    length: '36',
                    isPrimary: true,
                    default: '(UUID())'
                },
                {
                    name:'placa',
                    type: 'varchar',
                    length: '6',
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: 'tipo',
                    type: 'enum',
                    enum:['carro','moto'],
                    isNullable: false
                }
            ]
        })

        const registroTable = new Table({
            name:'registro_parqueo',
            columns:[
                {
                    name:'id',
                    type: 'varchar',
                    length: '36',
                    isPrimary: true,
                    default: '(UUID())'
                },
                {
                    name:'fecha_entrada',
                    type: 'datetime',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'fecha_salida',
                    type: 'datetime',
                    isNullable: true
                },
                {
                    name: 'estado',
                    type: 'enum',
                    enum:['dentro','fuera'],
                    default: `'dentro'`,
                    isNullable: false
                }
            ]
        })

        await queryRunner.createTable(vehiculoTable,true)
        await queryRunner.createTable(registroTable,true)

        if(!await queryRunner.hasColumn('registro_parqueo','vehiculo_id')){

            await queryRunner.addColumn(
                'registro_parqueo',
                new TableColumn({
                    name: 'vehiculo_id',
                    type: 'varchar',
                    length: '36',
                    isNullable: false
                })
            )

            await queryRunner.createForeignKey(
                'registro_parqueo',
                new TableForeignKey({
                    columnNames: ['vehiculo_id'],
                    referencedColumnNames:['id'],
                    referencedTableName:'vehiculo'
                })
            )

        }

        await queryRunner.query('drop trigger if exists abortarInsercionVehiculoCarro')

        await queryRunner.query(`
        create trigger abortarInsercionVehiculoCarro before insert on registro_parqueo
for each row
begin

 declare counter int;
 select count(*) into counter from registro_parqueo inner join vehiculo on 
 vehiculo.id = registro_parqueo.vehiculo_id where estado = 'dentro' and vehiculo.tipo = 'carro';
 
 if counter = 5 and new.vehiculo_id in (select id from vehiculo where tipo='carro') then 
 signal sqlstate '45000'
 set message_text = 'No hay mas cupos';
 END IF;
end;
     `)

        await queryRunner.query('drop trigger if exists abortarInsercionVehiculoMoto')

        await queryRunner.query(`
        
        create trigger abortarInsercionVehiculoMoto before insert on registro_parqueo
for each row
begin

 declare counter int;
 select count(*) into counter from registro_parqueo inner join vehiculo on 
 vehiculo.id = registro_parqueo.vehiculo_id where estado = 'dentro' and vehiculo.tipo = 'moto';
 
 if counter = 10 and new.vehiculo_id in (select id from vehiculo where tipo='moto') then 
 signal sqlstate '45000'
 set message_text = 'No hay mas cupos';
 END IF;
end;
        
        `)

        await queryRunner.query('drop trigger if exists abortarInsercionVehiculo')

        await queryRunner.query(`
create TRIGGER abortarInsercionVehiculo BEFORE INSERT ON  registro_parqueo  FOR EACH ROW begin

if new.vehiculo_id in (select vehiculo.id from vehiculo inner join registro_parqueo on vehiculo.id = registro_parqueo.vehiculo_id where registro_parqueo.estado = 'dentro') then
signal sqlstate '45000'
set message_text = 'vehiculo ya se encuentra parqueado';
end if;
end;
        `)

        await queryRunner.query('drop trigger if exists salidaVehiculo')

        await queryRunner.query(`
        
     create TRIGGER salidaVehiculo  BEFORE UPDATE ON  registro_parqueo FOR EACH ROW begin

if new.estado = 'fuera' then
set new.fecha_salida = current_timestamp();
end if;

end
        
        `)

    }

    async down(queryRunner: QueryRunner): Promise<any> {

    }
}